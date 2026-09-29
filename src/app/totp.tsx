import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    Pressable,
    TextInput,
    Keyboard,
    ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Styles
import { styles } from "../styles/screens/totp.styles";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

export default function TOTPScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Array to hold the 6 digits
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    // Array of refs to control focus
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, index: number) => {
        // Only allow numbers
        if (!/^\d*$/.test(text)) return;

        // Update the code array
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto-advance to the next input if a digit was entered
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        // If all 6 digits are filled, dismiss the keyboard and maybe auto-submit
        if (newCode.every((digit) => digit !== "")) {
            Keyboard.dismiss();
            // Optional: Auto-submit here
            // handleVerify();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace: if the current input is empty, go back to the previous one
        if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();

            // Clear the previous digit when moving back
            const newCode = [...code];
            newCode[index - 1] = "";
            setCode(newCode);
        }
    };

    const handleVerify = () => {
        const fullCode = code.join("");
        if (fullCode.length === 6) {
            console.log("Verifying code:", fullCode);
            // TODO: Add your API call here, then navigate to home
            router.replace("/(tabs)/homeScreen");
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
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

                <View style={styles.content}>
                    {/* SHIELD ICON */}
                    <View style={styles.iconContainer}>
                        <Feather
                            name="shield"
                            size={40}
                            color={COLORS.success}
                        />
                    </View>

                    {/* TITLE & SUBTITLE */}
                    <Text style={styles.title}>Verification Code</Text>
                    <Text style={styles.subtitle}>
                        Please enter the 6-digit code from your authenticator
                        app to securely sign in.
                    </Text>

                    {/* 6-DIGIT OTP INPUTS */}
                    <View style={styles.otpContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => {
                                    inputs.current[index] = el;
                                }} // Assign ref to each input
                                style={[
                                    styles.otpInput,
                                    digit !== "" && styles.otpInputFocused, // Highlight filled boxes (optional)
                                ]}
                                value={digit}
                                onChangeText={(text) =>
                                    handleChange(text, index)
                                }
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                selectTextOnFocus // Highlights the text so typing over it is easy
                            />
                        ))}
                    </View>

                    {/* VERIFY BUTTON */}
                    <Pressable
                        style={{ width: "100%" }}
                        onPress={handleVerify}
                        disabled={code.some((digit) => digit === "")} // Disable if not fully filled
                    >
                        <LinearGradient
                            colors={GRADIENTS.primary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.verifyButton,
                                code.some((digit) => digit === "") && {
                                    opacity: 0.5,
                                }, // Dim when disabled
                            ]}
                        >
                            <Text style={styles.verifyButtonText}>
                                Verify & Continue
                            </Text>
                        </LinearGradient>
                    </Pressable>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Didn't receive a code?{" "}
                        </Text>
                        <Pressable
                            onPress={() =>
                                console.log("Resend code logic here")
                            }
                        >
                            <Text style={styles.footerLink}>Resend Code</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
