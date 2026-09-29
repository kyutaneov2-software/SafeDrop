import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient"; // Import Gradient

// Import your styles
import { styles } from "../styles/screens/signIn.styles";
import { inputField } from "../styles/blocks/SDInput";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";

export default function SignInScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State management
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <Text style={styles.headerTitle}>Welcome Back</Text>
                <Text style={styles.headerSubtitle}>
                    Sign in to access your SafeDrop lockers.
                </Text>

                {/* LOGIN FORM */}
                <View style={styles.card}>
                    {/* USERNAME / EMAIL */}
                    <View>
                        <Text style={styles.label}>Username / Email</Text>
                        <View style={inputField.InputWrapper}>
                            <Feather
                                name="mail"
                                size={20}
                                color={COLORS.textDisabled}
                                style={{ marginLeft: SPACING.md }}
                            />
                            <TextInput
                                style={inputField.TextField}
                                placeholder="sample@gmail.com"
                                placeholderTextColor={COLORS.textDisabled}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* PASSWORD */}
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={inputField.TextField}
                                placeholder="**********"
                                placeholderTextColor={COLORS.textDisabled}
                                secureTextEntry={!passwordVisible}
                            />
                            {/* FIXED: Text is now wrapped in <Text> */}
                            <Pressable
                                style={styles.showButton}
                                onPress={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                            >
                                <Text style={styles.showText}>
                                    {passwordVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* 6-DIGIT AUTHENTICATOR CODE */}
                    <View>
                        <Text style={styles.label}>Authenticator Code</Text>
                        <View style={styles.otpContainer}>
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpInput}
                                    placeholder="0"
                                    placeholderTextColor={COLORS.textDisabled}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                />
                            ))}
                        </View>
                    </View>

                    {/* HELPER UI (Remember Me) */}
                    <View style={styles.helperRow}>
                        <Checkbox
                            value={rememberMe}
                            onValueChange={setRememberMe}
                            color={rememberMe ? COLORS.primary : undefined}
                        />
                        <Text style={styles.rememberText}>
                            Remember me for 30 days
                        </Text>
                    </View>

                    {/* SIGN IN BUTTON WITH GRADIENT */}
                    <Pressable 
                        onPress={() => router.replace('/totp')}
                        style={{ marginTop: SPACING.xl }}>
                        <LinearGradient
                            colors={GRADIENTS.success}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                borderRadius: RADIUS.sm,
                                height: 56,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                {/* FOOTER (Navigate to Sign Up) */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?{" "}
                    </Text>
                    <Pressable onPress={() => router.replace("/signUp")}>
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
