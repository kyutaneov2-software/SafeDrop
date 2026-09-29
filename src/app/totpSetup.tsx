import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

// Styles
import { styles } from "../styles/screens/totpSetup.styles";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

export default function TOTPSetupScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // In a real app, this secret and URI would come from your backend when the user registers
    // This is a standard base32 encoded string used for TOTP
    const secretKey = "JBSWY3DPEHPK3PXP";
    const email = "user@safedrop.com";

    // This is the standard URI format that authenticator apps understand
    const otpAuthUri = `otpauth://totp/SafeDrop:${email}?secret=${secretKey}&issuer=SafeDrop`;

    const handleContinue = () => {
        // Navigate to the verification screen we just built, so they can test the code
        router.push("/totp");
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* HEADER / BACK BUTTON */}
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={COLORS.textPrimary}
                    />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* ICON */}
                <View style={styles.iconContainer}>
                    <Feather
                        name="smartphone"
                        size={32}
                        color={COLORS.success}
                    />
                </View>

                {/* TITLE & SUBTITLE */}
                <Text style={styles.title}>Secure Your Account</Text>
                <Text style={styles.subtitle}>
                    Scan the QR code below with your authenticator app (like
                    Google Authenticator or Authy) to enable 2FA.
                </Text>

                {/* QR CODE */}
                <View style={styles.qrContainer}>
                    <QRCode
                        value={otpAuthUri}
                        size={200}
                        color={COLORS.textPrimary}
                        backgroundColor={COLORS.surface}
                    />
                </View>

                {/* MANUAL ENTRY FALLBACK */}
                <View style={styles.manualContainer}>
                    <Text style={styles.manualLabel}>
                        Can't scan? Enter this code manually:
                    </Text>
                    {/* Format the key in chunks of 4 for readability */}
                    <Text style={styles.secretText}>
                        {secretKey.match(/.{1,4}/g)?.join(" ")}
                    </Text>
                </View>

                {/* CONTINUE BUTTON */}
                <Pressable style={{ width: "100%" }} onPress={handleContinue}>
                    <LinearGradient
                        colors={GRADIENTS.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.continueButton}
                    >
                        <Text style={styles.continueButtonText}>
                            I've Scanned It
                        </Text>
                    </LinearGradient>
                </Pressable>
            </ScrollView>
        </View>
    );
}
