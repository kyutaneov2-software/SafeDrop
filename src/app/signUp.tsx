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
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";

// Styles
import { styles } from "../styles/screens/signUp.styles";

// Theme
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

// Auth + TOTP
import { signUpWithEmail } from "../lib/auth";
import { generateTOTPSecret } from "../lib/totp";

export default function SignUpScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // ---------------------------------------------------------
    // FORM STATES
    // ---------------------------------------------------------
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    // ---------------------------------------------------------
    // PASSWORD RULES
    // ---------------------------------------------------------
    const rules = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };
    const metCount = Object.values(rules).filter(Boolean).length;
    const passwordsMatch = password.length > 0 && password === confirmPassword;

    // ---------------------------------------------------------
    // CONNECTED SIGN UP FUNCTION
    // ---------------------------------------------------------
    const handleSignUp = async () => {
        // 1. VALIDATION
        if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Your passwords do not match.");
            return;
        }

        if (metCount < 2) {
            Alert.alert(
                "Weak Password",
                "Please use a stronger password (8+ chars, with numbers & uppercase).",
            );
            return;
        }

        if (!agreedToTerms) {
            Alert.alert(
                "Terms Required",
                "Please agree to the Terms of Service and Privacy Policy.",
            );
            return;
        }

        setIsLoading(true);

        try {
            const normalizedEmail = email.trim().toLowerCase();

            // 2. CREATE SUPABASE ACCOUNT
            const authData = await signUpWithEmail({
                email: normalizedEmail,
                password,
                fullName: fullName.trim(),
                phone: phone.trim(),
                role: "customer",
            });

            // 3. VERIFY SESSION
            if (!authData.user) {
                throw new Error(
                    "Supabase did not return a user after registration.",
                );
            }

            if (!authData.session) {
                throw new Error(
                    "No active session was created. Please disable email confirmation in Supabase Auth before testing TOTP setup.",
                );
            }

            // 4. GENERATE TOTP SECRET
            const { secret, uri } = generateTOTPSecret(normalizedEmail);

            // 5. MOVE TO TOTP SETUP
            Alert.alert(
                "Account Created!",
                "Next, let's secure your account with Two-Factor Authentication.",
                [
                    {
                        text: "Continue",
                        onPress: () =>
                            router.replace({
                                pathname: "/totpSetup",
                                params: {
                                    secret,
                                    uri,
                                    email: normalizedEmail,
                                },
                            }),
                    },
                ],
            );
        } catch (error: any) {
            Alert.alert(
                "Sign Up Failed",
                error?.message || "Something went wrong.",
            );
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

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
                    <Text style={styles.headerTitle}>Create Account</Text>
                    <Text style={styles.headerSubtitle}>
                        Join SafeDrop and secure your belongings in seconds.
                    </Text>
                </View>

                {/* =====================================================
                    FORM CARD
                ===================================================== */}
                <View style={styles.card}>
                    {/* ---------------------------------------------
                        SECTION 1 — PERSONAL INFORMATION
                    --------------------------------------------- */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionLabel}>
                            Personal Information
                        </Text>
                        <View style={styles.sectionLine} />
                    </View>

                    {/* FULL NAME */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <View
                            style={[
                                styles.inputWrapper,
                                focusedField === "fullName" &&
                                    styles.inputWrapperFocused,
                            ]}
                        >
                            <Feather
                                name="user"
                                size={19}
                                color={
                                    focusedField === "fullName"
                                        ? COLORS.primary
                                        : COLORS.textDisabled
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Maria Fe Velasco"
                                placeholderTextColor={COLORS.textDisabled}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                autoComplete="name"
                                returnKeyType="next"
                                onFocus={() => setFocusedField("fullName")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* EMAIL */}
                    <View style={[styles.fieldContainer, styles.fieldSpacer]}>
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
                                returnKeyType="next"
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* PHONE */}
                    <View style={[styles.fieldContainer, styles.fieldSpacer]}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View
                            style={[
                                styles.inputWrapper,
                                focusedField === "phone" &&
                                    styles.inputWrapperFocused,
                            ]}
                        >
                            <Feather
                                name="phone"
                                size={19}
                                color={
                                    focusedField === "phone"
                                        ? COLORS.primary
                                        : COLORS.textDisabled
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="+63 912 345 6789"
                                placeholderTextColor={COLORS.textDisabled}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                autoComplete="tel"
                                returnKeyType="next"
                                onFocus={() => setFocusedField("phone")}
                                onBlur={() => setFocusedField(null)}
                            />
                        </View>
                    </View>

                    {/* ---------------------------------------------
                        SECTION 2 — SECURITY
                    --------------------------------------------- */}
                    <View style={[styles.sectionHeader, styles.sectionSpacer]}>
                        <Text style={styles.sectionLabel}>Security</Text>
                        <View style={styles.sectionLine} />
                    </View>

                    {/* PASSWORD */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Password</Text>
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
                                placeholder="Create a strong password"
                                placeholderTextColor={COLORS.textDisabled}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                            />
                            <Pressable
                                onPress={() => setPasswordVisible((p) => !p)}
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

                        {/* LIVE REQUIREMENTS CHECKLIST */}
                        {password.length > 0 && (
                            <View style={styles.requirementsContainer}>
                                <RequirementRow
                                    met={rules.length}
                                    text="At least 8 characters"
                                />
                                <RequirementRow
                                    met={rules.uppercase}
                                    text="Contains an uppercase letter"
                                />
                                <RequirementRow
                                    met={rules.number}
                                    text="Contains a number"
                                />
                                <RequirementRow
                                    met={rules.special}
                                    text="Contains a special character"
                                />
                            </View>
                        )}
                    </View>

                    {/* CONFIRM PASSWORD */}
                    <View style={[styles.fieldContainer, styles.fieldSpacer]}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View
                            style={[
                                styles.inputWrapper,
                                focusedField === "confirm" &&
                                    styles.inputWrapperFocused,
                                confirmPassword.length > 0 &&
                                    !passwordsMatch &&
                                    styles.inputWrapperError,
                            ]}
                        >
                            <Feather
                                name="lock"
                                size={19}
                                color={
                                    focusedField === "confirm"
                                        ? COLORS.primary
                                        : COLORS.textDisabled
                                }
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Re-enter your password"
                                placeholderTextColor={COLORS.textDisabled}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!confirmVisible}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onFocus={() => setFocusedField("confirm")}
                                onBlur={() => setFocusedField(null)}
                            />
                            <Pressable
                                onPress={() => setConfirmVisible((p) => !p)}
                                hitSlop={10}
                                style={styles.showButton}
                            >
                                <Feather
                                    name={confirmVisible ? "eye-off" : "eye"}
                                    size={19}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.showText}>
                                    {confirmVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>

                        {confirmPassword.length > 0 && !passwordsMatch && (
                            <Text style={styles.inlineError}>
                                Passwords do not match.
                            </Text>
                        )}
                    </View>

                    {/* ---------------------------------------------
                        SECTION 3 — AGREEMENT
                    --------------------------------------------- */}
                    <View style={styles.agreementRow}>
                        <Checkbox
                            value={agreedToTerms}
                            onValueChange={setAgreedToTerms}
                            color={agreedToTerms ? COLORS.primary : undefined}
                            style={{ marginTop: 2 }}
                        />
                        <Text style={styles.agreementText}>
                            I agree to the{" "}
                            <Text style={styles.agreementLink}>
                                Terms of Service
                            </Text>{" "}
                            and{" "}
                            <Text style={styles.agreementLink}>
                                Privacy Policy
                            </Text>
                            .
                        </Text>
                    </View>

                    {/* ---------------------------------------------
                        SUBMIT
                    --------------------------------------------- */}
                    <Pressable
                        onPress={handleSignUp}
                        disabled={isLoading}
                        style={styles.buttonWrapper}
                    >
                        <LinearGradient
                            colors={GRADIENTS.primary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.signUpButton,
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
                                        Creating your account...
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.signUpButtonText}>
                                        Create Account
                                    </Text>
                                    <Feather
                                        name="arrow-right"
                                        size={19}
                                        color={COLORS.white}
                                        style={{ marginLeft: 8 }}
                                    />
                                </>
                            )}
                        </LinearGradient>
                    </Pressable>
                </View>

                {/* =====================================================
                    FOOTER
                ===================================================== */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>
                    <Pressable
                        onPress={() => router.replace("/signIn")}
                        hitSlop={8}
                    >
                        <Text style={styles.footerLink}>Sign In</Text>
                    </Pressable>
                </View>

                <Text style={styles.footerNote}>
                    SafeDrop • Secure delivery, simplified.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// =========================================================
// SMALL SUB-COMPONENT — REQUIREMENT ROW
// =========================================================
function RequirementRow({ met, text }: { met: boolean; text: string }) {
    return (
        <View style={styles.requirementRow}>
            <View
                style={[
                    styles.requirementIconWrap,
                    met && styles.requirementIconWrapMet,
                ]}
            >
                <Feather
                    name={met ? "check" : "circle"}
                    size={met ? 12 : 8}
                    color={met ? COLORS.success : COLORS.textDisabled}
                />
            </View>
            <Text
                style={[
                    styles.requirementText,
                    met && styles.requirementTextMet,
                ]}
            >
                {text}
            </Text>
        </View>
    );
}
