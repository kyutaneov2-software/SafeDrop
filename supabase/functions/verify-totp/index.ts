import { withSupabase } from "npm:@supabase/server@^1";
import * as OTPAuth from "https://esm.sh/otpauth@9.5.2";

type TOTPRequest = {
    code?: string;
    secret?: string;
    isSetup?: boolean;
};

export default {
    fetch: withSupabase(
        { auth: "user" },

        async (req, ctx) => {
            // Only accept POST requests
            if (req.method !== "POST") {
                return Response.json(
                    {
                        success: false,
                        error: "Method not allowed",
                    },
                    { status: 405 },
                );
            }

            try {
                // --------------------------------------------------
                // 1. Get authenticated user
                // --------------------------------------------------
                const userId = ctx.userClaims?.id;
                const userEmail = ctx.userClaims?.email ?? "";

                if (!userId) {
                    return Response.json(
                        {
                            success: false,
                            error: "Authenticated user not found",
                        },
                        { status: 401 },
                    );
                }

                // --------------------------------------------------
                // 2. Read request body
                // --------------------------------------------------
                const body = (await req.json()) as TOTPRequest;

                const code = String(body.code ?? "").replace(/\s/g, "");
                const isSetup = body.isSetup === true;

                // Secret is ONLY expected during setup.
                const providedSecret =
                    typeof body.secret === "string"
                        ? body.secret.trim().toUpperCase()
                        : "";

                // --------------------------------------------------
                // 3. Validate OTP code format
                // --------------------------------------------------
                if (!/^\d{6}$/.test(code)) {
                    return Response.json(
                        {
                            success: false,
                            error: "Code must contain exactly 6 digits",
                        },
                        { status: 400 },
                    );
                }

                // --------------------------------------------------
                // 4. Determine which secret to use
                // --------------------------------------------------
                let secretToVerify = "";

                if (isSetup) {
                    // SETUP MODE
                    // The mobile app sends the newly generated secret.
                    if (!providedSecret) {
                        return Response.json(
                            {
                                success: false,
                                error: "TOTP secret is required during setup",
                            },
                            { status: 400 },
                        );
                    }

                    secretToVerify = providedSecret;
                } else {
                    // LOGIN MODE
                    // NEVER accept a secret from the mobile app.
                    // Fetch it from the database instead.

                    const { data, error } = await ctx.supabaseAdmin
                        .from("user_totp")
                        .select("secret, is_enabled")
                        .eq("id", userId)
                        .maybeSingle();

                    if (error) {
                        console.error(
                            "Failed to fetch TOTP record:",
                            error.message,
                        );

                        return Response.json(
                            {
                                success: false,
                                error: "Unable to load TOTP configuration",
                            },
                            { status: 500 },
                        );
                    }

                    if (!data || !data.is_enabled || !data.secret) {
                        return Response.json(
                            {
                                success: false,
                                error: "Two-factor authentication is not set up",
                            },
                            { status: 400 },
                        );
                    }

                    secretToVerify = data.secret;
                }

                // --------------------------------------------------
                // 5. Build TOTP validator
                // --------------------------------------------------
                const totp = new OTPAuth.TOTP({
                    issuer: "SafeDrop",
                    label: userEmail || userId,
                    algorithm: "SHA1",
                    digits: 6,
                    period: 30,
                    secret: secretToVerify,
                });

                // --------------------------------------------------
                // 6. Verify the code
                // --------------------------------------------------
                // window: 1 allows the current 30-second interval plus
                // one adjacent interval to tolerate small clock differences.
                const delta = totp.validate({
                    token: code,
                    window: 1,
                });

                if (delta === null) {
                    return Response.json(
                        {
                            success: false,
                            error: "Invalid or expired authentication code",
                        },
                        { status: 400 },
                    );
                }

                // --------------------------------------------------
                // 7. SETUP MODE: save verified secret
                // --------------------------------------------------
                if (isSetup) {
                    const { error: upsertError } = await ctx.supabaseAdmin
                        .from("user_totp")
                        .upsert(
                            {
                                id: userId,
                                secret: secretToVerify,
                                is_enabled: true,
                            },
                            {
                                onConflict: "id",
                            },
                        );

                    if (upsertError) {
                        console.error(
                            "Failed to save TOTP secret:",
                            upsertError.message,
                        );

                        return Response.json(
                            {
                                success: false,
                                error: "Code verified, but TOTP setup could not be saved",
                            },
                            { status: 500 },
                        );
                    }

                    console.log(`TOTP setup completed for user ${userId}`);

                    return Response.json({
                        success: true,
                        mode: "setup",
                    });
                }

                // --------------------------------------------------
                // 8. LOGIN MODE
                // --------------------------------------------------
                console.log(
                    `TOTP login verification succeeded for user ${userId}`,
                );

                return Response.json({
                    success: true,
                    mode: "login",
                });
            } catch (error) {
                console.error("verify-totp error:", error);

                return Response.json(
                    {
                        success: false,
                        error: "Internal server error",
                    },
                    { status: 500 },
                );
            }
        },
    ),
};
