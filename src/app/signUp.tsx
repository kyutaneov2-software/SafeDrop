import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";

// Styles
import { styles } from "../styles/screens/signUp.styles";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";
import { SPACING } from "../theme/spacing";

export default function SignUpScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Form States
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Simple password strength logic (0-4)
    const getStrength = () => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };
    const strength = getStrength();

    const handleSignUp = () => {
        router.replace('/totpSetup')
        // TODO: Add your validation and API call here
        console.log("Signing up:", { fullName, email, phone, password });
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* HEADER */}
                <Text style={styles.headerTitle}>Create Account</Text>
                <Text style={styles.headerSubtitle}>
                    Join SafeDrop and secure your belongings in seconds.
                </Text>

                {/* SIGN UP FORM */}
                <View style={styles.card}>
                    {/* FULL NAME */}
                    <View>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputWrapper}>
                            <Feather
                                name="user"
                                size={20}
                                color={COLORS.textDisabled}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Maria Fe Velasco"
                                placeholderTextColor={COLORS.textDisabled}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    {/* EMAIL */}
                    <View>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Feather
                                name="mail"
                                size={20}
                                color={COLORS.textDisabled}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="MariaFe@gmail.com"
                                placeholderTextColor={COLORS.textDisabled}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* PHONE NUMBER */}
                    <View>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputWrapper}>
                            <Feather
                                name="phone"
                                size={20}
                                color={COLORS.textDisabled}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="+63 912 345 6789"
                                placeholderTextColor={COLORS.textDisabled}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* PASSWORD */}
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordWrapper}>
                            <Feather
                                name="lock"
                                size={20}
                                color={COLORS.textDisabled}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Create a strong password"
                                placeholderTextColor={COLORS.textDisabled}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                            />
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

                        {/* PASSWORD STRENGTH METER */}
                        {password.length > 0 && (
                            <View style={styles.strengthContainer}>
                                {[1, 2, 3, 4].map((i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.strengthBar,
                                            i <= strength &&
                                                styles.strengthBarActive,
                                        ]}
                                    />
                                ))}
                            </View>
                        )}
                    </View>

                    {/* CONFIRM PASSWORD */}
                    <View>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.passwordWrapper}>
                            <Feather
                                name="lock"
                                size={20}
                                color={COLORS.textDisabled}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Re-enter your password"
                                placeholderTextColor={COLORS.textDisabled}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!confirmVisible}
                            />
                            <Pressable
                                style={styles.showButton}
                                onPress={() =>
                                    setConfirmVisible(!confirmVisible)
                                }
                            >
                                <Text style={styles.showText}>
                                    {confirmVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* TERMS & CONDITIONS */}
                    <View style={styles.helperRow}>
                        <Checkbox
                            value={agreedToTerms}
                            onValueChange={setAgreedToTerms}
                            color={agreedToTerms ? COLORS.primary : undefined}
                        />
                        <Text style={styles.rememberText}>
                            I agree to the{" "}
                            <Text style={styles.linkText}>
                                Terms of Service
                            </Text>{" "}
                            and{" "}
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </Text>
                    </View>

                    {/* SIGN UP BUTTON WITH GRADIENT */}
                    <Pressable
                        style={{ marginTop: SPACING.xl }}
                        onPress={handleSignUp}
                        disabled={!agreedToTerms}
                    >
                        <LinearGradient
                            colors={GRADIENTS.primary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.signUpButton,
                                !agreedToTerms && { opacity: 0.5 }, // Dim the button if terms aren't agreed
                            ]}
                        >
                            <Text style={styles.signUpButtonText}>
                                Create Account
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>

                {/* FOOTER - Navigate to Sign In */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                    </Text>
                    <Pressable onPress={() => router.replace("/signIn")}>
                        <Text style={styles.footerLink}>Sign In</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
