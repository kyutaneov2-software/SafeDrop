import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    View,
    Text,
    Pressable,
    TextInput,
    Keyboard,
    ScrollView,
    Alert,
    ActivityIndicator,
    Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

// Services
import { verifyTOTPCode } from "../lib/totp";

// Styles
import { styles } from "../styles/screens/totp.styles";
import { COLORS } from "../theme/colors";

export default function TOTPScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // ---------------------------------------------------------
    // ROUTE PARAMETERS
    // ---------------------------------------------------------
    const params = useLocalSearchParams<{
        secret?: string;
        isSetup?: string;
    }>();

    const setupSecret = typeof params.secret === "string" ? params.secret : "";
    const isSetupMode = params.isSetup === "true";

    // ---------------------------------------------------------
    // OTP STATE
    // ---------------------------------------------------------
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(30);

    // ---------------------------------------------------------
    // INPUT REFS + AUTO-VERIFY GUARD
    // ---------------------------------------------------------
    const inputs = useRef<Array<TextInput | null>>([]);
    const hasAutoVerified = useRef(false);

    // ---------------------------------------------------------
    // COUNTDOWN — TOTP codes refresh every 30 seconds
    // ---------------------------------------------------------
    useEffect(() => {
        const tick = () => {
            const now = Math.floor(Date.now() / 1000);
            const remaining = 30 - (now % 30);
            setSecondsLeft(remaining);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // ---------------------------------------------------------
    // AUTO-FOCUS FIRST INPUT ON MOUNT
    // ---------------------------------------------------------
    useEffect(() => {
        const timer = setTimeout(() => {
            inputs.current[0]?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // ---------------------------------------------------------
    // CLEAR ERROR WHEN USER STARTS TYPING AGAIN
    // ---------------------------------------------------------
    const clearError = () => {
        if (hasError) {
            setHasError(false);
            setErrorMessage("");
        }
    };

    // ---------------------------------------------------------
    // HANDLE DIGIT INPUT
    // ---------------------------------------------------------
    const handleChange = (text: string, index: number) => {
        clearError();

        // Support paste: if user pastes "123456" into one field
        const digitsOnly = text.replace(/\D/g, "");

        if (digitsOnly.length > 1) {
            const pasted = digitsOnly.slice(0, 6).split("");
            const newCode = [...code];

            for (let i = 0; i < 6; i++) {
                newCode[i] = pasted[i] ?? "";
            }

            setCode(newCode);
            Keyboard.dismiss();

            const lastFilledIndex = Math.min(pasted.length, 6) - 1;
            if (lastFilledIndex >= 0) {
                inputs.current[lastFilledIndex]?.focus();
            }
            return;
        }

        // Normal single-digit input
        const cleaned = digitsOnly.slice(-1);
        const newCode = [...code];
        newCode[index] = cleaned;
        setCode(newCode);

        if (cleaned && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        if (newCode.every((digit) => digit !== "")) {
            Keyboard.dismiss();
        }
    };

    // ---------------------------------------------------------
    // HANDLE BACKSPACE
    // ---------------------------------------------------------
    const handleKeyPress = (event: any, index: number) => {
        clearError();

        if (
            event.nativeEvent.key === "Backspace" &&
            !code[index] &&
            index > 0
        ) {
            const newCode = [...code];
            newCode[index - 1] = "";
            setCode(newCode);
            inputs.current[index - 1]?.focus();
        }
    };

    // ---------------------------------------------------------
    // VERIFY TOTP
    // ---------------------------------------------------------
    const handleVerify = useCallback(
        async (fullCode: string) => {
            if (!/^\d{6}$/.test(fullCode)) return;

            if (isSetupMode && !setupSecret) {
                Alert.alert(
                    "Setup Error",
                    "The TOTP secret is missing. Please restart account setup.",
                );
                return;
            }

            setIsVerifying(true);
            setHasError(false);
            setErrorMessage("");

            try {
                // -------------------------------------------------
                // SETUP MODE — send secret + code to Edge Function
                // -------------------------------------------------
                if (isSetupMode) {
                    const isValid = await verifyTOTPCode(fullCode, {
                        secret: setupSecret,
                        isSetup: true,
                    });

                    if (!isValid) {
                        setHasError(true);
                        setErrorMessage(
                            "Invalid or expired code. Please try again.",
                        );
                        setCode(["", "", "", "", "", ""]);
                        inputs.current[0]?.focus();
                        return;
                    }

                    Alert.alert(
                        "2FA Enabled!",
                        "Your account is now secured with two-factor authentication.",
                        [
                            {
                                text: "Continue",
                                onPress: () =>
                                    router.replace("/(tabs)/homeScreen"),
                            },
                        ],
                    );
                    return;
                }

                // -------------------------------------------------
                // LOGIN MODE — send only the code
                // -------------------------------------------------
                const isValid = await verifyTOTPCode(fullCode);

                if (!isValid) {
                    setHasError(true);
                    setErrorMessage(
                        "Invalid or expired code. Please try again.",
                    );
                    setCode(["", "", "", "", "", ""]);
                    inputs.current[0]?.focus();
                    return;
                }

                router.replace("/(tabs)/homeScreen");
            } catch (error: any) {
                console.error("TOTP verification error:", error);
                setHasError(true);
                setErrorMessage(
                    error?.message ||
                        "Something went wrong while verifying your code.",
                );
                setCode(["", "", "", "", "", ""]);
                inputs.current[0]?.focus();
            } finally {
                setIsVerifying(false);
            }
        },
        [isSetupMode, setupSecret, router],
    );

    // ---------------------------------------------------------
    // AUTO-VERIFY WHEN ALL 6 DIGITS ARE ENTERED
    // ---------------------------------------------------------
    useEffect(() => {
        const isComplete = code.every((digit) => digit !== "");

        if (isComplete && !isVerifying && !hasAutoVerified.current) {
            hasAutoVerified.current = true;
            const fullCode = code.join("");
            // Small delay so the last digit visibly renders
            setTimeout(() => handleVerify(fullCode), 180);
        }

        // Reset the guard when the code is cleared (e.g., after an error)
        if (!isComplete) {
            hasAutoVerified.current = false;
        }
    }, [code, isVerifying, handleVerify]);

    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                        disabled={isVerifying}
                        hitSlop={10}
                    >
                        <Feather
                            name="arrow-left"
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </Pressable>
                </View>

                {/* =====================================================
                    CONTENT
                ===================================================== */}
                <View style={styles.content}>
                    {/* SHIELD ICON */}
                    <View style={styles.iconContainer}>
                        <Feather
                            name="shield"
                            size={36}
                            color={COLORS.success}
                        />
                    </View>

                    {/* TITLE */}
                    <Text style={styles.title}>
                        {isSetupMode
                            ? "Verify Your Setup"
                            : "Verify Your Identity"}
                    </Text>

                    {/* SUBTITLE */}
                    <Text style={styles.subtitle}>
                        {isSetupMode
                            ? "Enter the 6-digit code from your authenticator app to confirm setup."
                            : "Enter the 6-digit code from your authenticator app to sign in."}
                    </Text>

                    {/* OTP INPUTS */}
                    <View style={styles.otpContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => {
                                    inputs.current[index] = el;
                                }}
                                style={[
                                    styles.otpInput,
                                    digit !== "" && styles.otpInputFocused,
                                    hasError && styles.otpInputError,
                                ]}
                                value={digit}
                                onChangeText={(text) =>
                                    handleChange(text, index)
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(event, index)
                                }
                                keyboardType={
                                    Platform.OS === "ios"
                                        ? "number-pad"
                                        : "numeric"
                                }
                                maxLength={6}
                                selectTextOnFocus
                                editable={!isVerifying}
                                autoComplete="one-time-code"
                                textContentType="oneTimeCode"
                            />
                        ))}
                    </View>

                    {/* INLINE ERROR */}
                    {hasError && (
                        <View style={styles.inlineError}>
                            <Feather
                                name="alert-circle"
                                size={15}
                                color={COLORS.danger}
                            />
                            <Text style={styles.inlineErrorText}>
                                {errorMessage}
                            </Text>
                        </View>
                    )}

                    {/* VERIFYING STATE */}
                    {isVerifying && (
                        <View style={styles.verifyingRow}>
                            <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                            />
                            <Text style={styles.verifyingText}>
                                Verifying code...
                            </Text>
                        </View>
                    )}

                    {/* COUNTDOWN */}
                    {!isVerifying && !hasError && (
                        <View style={styles.countdownRow}>
                            <Feather
                                name="clock"
                                size={14}
                                color={COLORS.textSecondary}
                            />
                            <Text style={styles.countdownText}>
                                Code refreshes in{" "}
                                <Text style={styles.countdownBold}>
                                    {secondsLeft}s
                                </Text>
                            </Text>
                        </View>
                    )}

                    {/* SECONDARY ACTION — start over */}
                    {!isVerifying && (
                        <Pressable
                            style={styles.secondaryAction}
                            onPress={() => {
                                setCode(["", "", "", "", "", ""]);
                                setHasError(false);
                                setErrorMessage("");
                                inputs.current[0]?.focus();
                            }}
                            hitSlop={6}
                        >
                            <Feather
                                name="refresh-cw"
                                size={16}
                                color={COLORS.primary}
                            />
                            <Text style={styles.secondaryActionText}>
                                Start over
                            </Text>
                        </Pressable>
                    )}

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Your authenticator code changes every 30 seconds.
                        </Text>
                    </View>

                    <Text style={styles.footnote}>
                        SafeDrop • Secure access, always.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
