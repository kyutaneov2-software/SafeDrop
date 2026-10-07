import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Styles
import { styles } from "../styles/screens/signIn.styles";

// Theme
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

// Auth
import { signInWithEmail } from "../lib/auth";
import { supabase } from "../lib/supabase";

export default function SignInScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // ---------------------------------------------------------
    // STATE
    // ---------------------------------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<
        "email" | "password" | null
    >(null);

    // ---------------------------------------------------------
    // SIGN IN
    // ---------------------------------------------------------
    const handleSignIn = async () => {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            Alert.alert(
                "Missing Information",
                "Please enter your email and password.",
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const authData = await signInWithEmail(normalizedEmail, password);

            // Check if this user has completed TOTP setup
            const { data: totp } = await supabase
                .from("user_totp")
                .select("is_enabled")
                .eq("id", authData.user.id)
                .maybeSingle();

            if (totp?.is_enabled) {
                // Normal flow → prompt for TOTP code
                router.replace("/totp");
            } else {
                // Abandoned setup → sign out and force fresh signup
                const { signOut } = await import("../lib/auth");
                await signOut();
                Alert.alert(
                    "Setup Incomplete",
                    "Your account wasn't fully set up. Please create a new account.",
                    [
                        {
                            text: "OK",
                            onPress: () => router.replace("/signUp"),
                        },
                    ],
                );
            }
        } catch (error: any) {
            console.error("Sign in error:", error);
            Alert.alert(
                "Sign In Failed",
                error?.message ||
                    "We couldn't sign you in. Please check your credentials and try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: insets.top + 20,
                        paddingBottom: insets.bottom + 32,
                    },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* =====================================================
                    BRAND
                ===================================================== */}
                <View style={styles.brandContainer}>
                    <Image
                        source={require("../../assets/images/SafeDrop_logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>
                        Sign in to access your SafeDrop lockers.
                    </Text>
                </View>

                {/* =====================================================
                    LOGIN CARD
                ===================================================== */}
                <View style={styles.card}>
                    {/* EMAIL */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email Address</Text>

                        <View
                            style={[
                                styles.inputWrapper,
                                focusedField === "email" &&
                                    styles.inputWrapperFocused,
                            ]}
                        >
                            <Feather
                                name="mail"
                                size={19}
                                color={
                                    focusedField === "email"
                                        ? COLORS.primary
                                        : COLORS.textDisabled
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="you@example.com"
                                placeholderTextColor={COLORS.textDisabled}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                textContentType="emailAddress"
                                returnKeyType="next"
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* PASSWORD */}
                    <View style={[styles.fieldContainer, styles.passwordField]}>
                        <View style={styles.passwordLabelRow}>
                            <Text style={styles.label}>Password</Text>
                        </View>

                        <View
                            style={[
                                styles.inputWrapper,
                                focusedField === "password" &&
                                    styles.inputWrapperFocused,
                            ]}
                        >
                            <Feather
                                name="lock"
                                size={19}
                                color={
                                    focusedField === "password"
                                        ? COLORS.primary
                                        : COLORS.textDisabled
                                }
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.textDisabled}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="password"
                                textContentType="password"
                                returnKeyType="go"
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                onSubmitEditing={handleSignIn}
                            />

                            <Pressable
                                onPress={() =>
                                    setPasswordVisible((previous) => !previous)
                                }
                                hitSlop={10}
                                style={styles.showButton}
                            >
                                <Feather
                                    name={passwordVisible ? "eye-off" : "eye"}
                                    size={19}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.showText}>
                                    {passwordVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* SECURITY MESSAGE */}
                    <View style={styles.securityRow}>
                        <View style={styles.securityIcon}>
                            <Feather
                                name="shield"
                                size={15}
                                color={COLORS.success}
                            />
                        </View>
                        <Text style={styles.securityText}>
                            Your account is protected with two-factor
                            authentication.
                        </Text>
                    </View>

                    {/* SIGN IN BUTTON */}
                    <Pressable
                        onPress={handleSignIn}
                        disabled={isLoading}
                        style={styles.buttonWrapper}
                    >
                        <LinearGradient
                            colors={GRADIENTS.success}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.signInButton,
                                isLoading && styles.buttonDisabled,
                            ]}
                        >
                            {isLoading ? (
                                <>
                                    <ActivityIndicator
                                        color={COLORS.white}
                                        size="small"
                                    />
                                    <Text style={styles.loadingText}>
                                        Signing in...
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.signInButtonText}>
                                        Sign In
                                    </Text>
                                    <Feather
                                        name="arrow-right"
                                        size={19}
                                        color={COLORS.white}
                                    />
                                </>
                            )}
                        </LinearGradient>
                    </Pressable>
                </View>

                {/* =====================================================
                    SIGN UP
                ===================================================== */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <Pressable
                        onPress={() => router.replace("/signUp")}
                        hitSlop={8}
                    >
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </Pressable>
                </View>

                {/* =====================================================
                    FOOTNOTE
                ===================================================== */}
                <Text style={styles.footerNote}>
                    SafeDrop • Secure delivery, simplified.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
