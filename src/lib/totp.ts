import { polyfillWebCrypto } from "expo-standard-web-crypto";

polyfillWebCrypto();

import * as OTPAuth from "otpauth";

import { supabase } from "./supabase";

/**
 * Generates a new TOTP secret and the corresponding otpauth:// URI.
 *
 * This runs on the CLIENT because the QR code must be rendered here.
 */
export function generateTOTPSecret(userEmail: string) {
    const secret = new OTPAuth.Secret({
        size: 20,
    });

    const totp = new OTPAuth.TOTP({
        issuer: "SafeDrop",
        label: userEmail,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret,
    });

    return {
        secret: secret.base32,
        uri: totp.toString(),
    };
}

/**
 * Sends the 6-digit code to the Supabase Edge Function
 * for server-side verification.
 */
export async function verifyTOTPCode(
    code: string,
    options?: {
        secret?: string;
        isSetup?: boolean;
    },
): Promise<boolean> {
    const { data, error } = await supabase.functions.invoke("verify-totp", {
        body: {
            code,
            secret: options?.secret,
            isSetup: options?.isSetup ?? false,
        },
    });

    if (error) {
        console.error("Edge Function error:", error);

        throw new Error(error.message || "Verification failed");
    }

    return data?.success === true;
}
