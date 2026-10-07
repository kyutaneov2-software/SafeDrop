import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";

// Styles
import { styles } from "../styles/screens/totpSetup.styles";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

export default function TOTPSetupScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // ---------------------------------------------------------
    // GET PARAMETERS FROM SIGN UP
    // ---------------------------------------------------------
    const params = useLocalSearchParams<{
        secret?: string;
        uri?: string;
        email?: string;
    }>();

    const secretKey = typeof params.secret === "string" ? params.secret : "";
    const otpAuthUri = typeof params.uri === "string" ? params.uri : "";
    const email = typeof params.email === "string" ? params.email : "";

    // ---------------------------------------------------------
    // LOCAL UI STATE
    // ---------------------------------------------------------
    const [showManual, setShowManual] = useState(false);
    const [copied, setCopied] = useState(false);

    // ---------------------------------------------------------
    // VALIDATE PARAMETERS
    // ---------------------------------------------------------
    useEffect(() => {
        if (!secretKey || !otpAuthUri || !email) {
            Alert.alert(
                "Setup Error",
                "The TOTP setup information is missing. Please start the registration process again.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/signUp"),
                    },
                ],
            );
        }
    }, [secretKey, otpAuthUri, email, router]);

    // ---------------------------------------------------------
    // COPY SECRET TO CLIPBOARD
    // ---------------------------------------------------------
    const handleCopy = async () => {
        if (!secretKey) return;
        await Clipboard.setStringAsync(secretKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ---------------------------------------------------------
    // CONTINUE TO TOTP VERIFICATION
    // ---------------------------------------------------------
    const handleContinue = () => {
        if (!secretKey) {
            Alert.alert("Setup Error", "TOTP secret is missing.");
            return;
        }

        router.push({
            pathname: "/totp",
            params: {
                secret: secretKey,
                isSetup: "true",
            },
        });
    };

    // ---------------------------------------------------------
    // BACK BUTTON HANDLER — guards against accidental exit
    // ---------------------------------------------------------
    const handleBack = () => {
        Alert.alert(
            "Cancel Setup?",
            "You'll be signed out. You can complete 2FA the next time you sign up.",
            [
                { text: "Stay", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        const { signOut } = await import("../lib/auth");
                        await signOut();
                        router.replace("/signIn");
                    },
                },
            ],
        );
    };

    // Format secret in groups of 4 for readability
    const formattedSecret = secretKey
        ? (secretKey.match(/.{1,4}/g)?.join(" ") ?? secretKey)
        : "";

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* HEADER / BACK BUTTON */}
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={handleBack}
                    hitSlop={10}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={COLORS.textPrimary}
                    />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* =====================================================
                    HEADER BLOCK
                ===================================================== */}
                <View style={styles.headerBlock}>
                    <View style={styles.iconContainer}>
                        <Feather
                            name="shield"
                            size={30}
                            color={COLORS.success}
                        />
                    </View>

                    <Text style={styles.title}>Secure Your Account</Text>
                    <Text style={styles.subtitle}>
                        Protect your SafeDrop account with two-factor
                        authentication. It only takes a minute.
                    </Text>
                </View>

                {/* =====================================================
                    STEP CARDS
                ===================================================== */}
                <View style={styles.stepsWrapper}>
                    {/* STEP 1 — SCAN THE QR */}
                    <View style={styles.stepCard}>
                        <View style={styles.stepHeader}>
                            <View style={styles.stepBadge}>
                                <Text style={styles.stepBadgeText}>1</Text>
                            </View>
                            <Text style={styles.stepTitle}>
                                Scan the QR code
                            </Text>
                        </View>

                        <View style={styles.qrWrapper}>
                            <View style={styles.qrContainer}>
                                {otpAuthUri ? (
                                    <QRCode
                                        value={otpAuthUri}
                                        size={190}
                                        color={COLORS.textPrimary}
                                        backgroundColor={COLORS.white}
                                    />
                                ) : null}
                            </View>

                            {email ? (
                                <Text style={styles.accountLabel}>{email}</Text>
                            ) : null}
                        </View>
                    </View>

                    {/* STEP 2 — OPEN AUTHENTICATOR */}
                    <View style={styles.stepCard}>
                        <View style={styles.stepHeader}>
                            <View style={styles.stepBadge}>
                                <Text style={styles.stepBadgeText}>2</Text>
                            </View>
                            <Text style={styles.stepTitle}>
                                Open your authenticator app
                            </Text>
                        </View>
                        <Text style={styles.stepDescription}>
                            Launch Google Authenticator, Authy, or any
                            TOTP-compatible app and tap "Add account" → "Scan QR
                            code".
                        </Text>
                    </View>

                    {/* STEP 3 — ENTER THE CODE */}
                    <View style={styles.stepCard}>
                        <View style={styles.stepHeader}>
                            <View style={styles.stepBadge}>
                                <Text style={styles.stepBadgeText}>3</Text>
                            </View>
                            <Text style={styles.stepTitle}>
                                Enter the 6-digit code
                            </Text>
                        </View>
                        <Text style={styles.stepDescription}>
                            Your authenticator will generate a new 6-digit code
                            every 30 seconds. Tap "I've Scanned It" below, then
                            enter the current code to finish setup.
                        </Text>
                    </View>
                </View>

                {/* =====================================================
                    COLLAPSIBLE MANUAL ENTRY
                ===================================================== */}
                <Pressable
                    style={styles.manualToggle}
                    onPress={() => setShowManual((s) => !s)}
                    hitSlop={8}
                >
                    <Feather
                        name={showManual ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={COLORS.primary}
                    />
                    <Text style={styles.manualToggleText}>
                        Can't scan the QR code?
                    </Text>
                </Pressable>

                {showManual && (
                    <View style={styles.manualContainer}>
                        <Text style={styles.manualLabel}>
                            Setup key (enter manually)
                        </Text>

                        <View style={styles.secretRow}>
                            <Text
                                style={styles.secretText}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                {formattedSecret || "Unavailable"}
                            </Text>

                            <Pressable
                                onPress={handleCopy}
                                style={[
                                    styles.copyButton,
                                    copied && styles.copyButtonCopied,
                                ]}
                                hitSlop={6}
                            >
                                <Feather
                                    name={copied ? "check" : "copy"}
                                    size={13}
                                    color={COLORS.white}
                                />
                                <Text style={styles.copyButtonText}>
                                    {copied ? "Copied" : "Copy"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* =====================================================
                    CONTINUE BUTTON
                ===================================================== */}
                <Pressable
                    style={{ width: "100%" }}
                    onPress={handleContinue}
                    disabled={!secretKey}
                >
                    <LinearGradient
                        colors={GRADIENTS.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                            styles.continueButton,
                            !secretKey && styles.buttonDisabled,
                        ]}
                    >
                        <Text style={styles.continueButtonText}>
                            I've Scanned It
                        </Text>
                        <Feather
                            name="arrow-right"
                            size={19}
                            color={COLORS.white}
                            style={{ marginLeft: 8 }}
                        />
                    </LinearGradient>
                </Pressable>

                <Text style={styles.footnote}>
                    SafeDrop • Your account stays locked until this step is
                    completed.
                </Text>
            </ScrollView>
        </View>
    );
}
