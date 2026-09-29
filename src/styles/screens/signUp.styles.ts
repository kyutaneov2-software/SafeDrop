import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { SHADOWS } from "@/theme/shadow";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    headerSubtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        ...SHADOWS.card,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
        marginTop: SPACING.md,
    },
    // Reusable wrapper for inputs with icons
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        marginTop: SPACING.sm,
        paddingLeft: SPACING.md,
    },
    inputWrapperFocused: {
        borderColor: COLORS.primary,
    },
    inputIcon: {
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        height: "100%",
        color: COLORS.textPrimary,
        fontSize: 16,
    },
    // Password toggle button
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        marginTop: SPACING.sm,
        paddingLeft: SPACING.md,
        paddingRight: SPACING.md,
    },
    showButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
    showText: {
        color: COLORS.primary,
        fontWeight: "600",
        fontSize: 14,
    },
    // Password strength indicator
    strengthContainer: {
        flexDirection: "row",
        marginTop: SPACING.sm,
        gap: 4,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
    },
    strengthBarActive: {
        backgroundColor: COLORS.success,
    },
    // Terms & Conditions row
    helperRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SPACING.lg,
    },
    rememberText: {
        marginLeft: SPACING.sm,
        color: COLORS.textSecondary,
        fontSize: 14,
        flex: 1,
    },
    linkText: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    // Primary Sign Up button
    signUpButton: {
        borderRadius: RADIUS.sm,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.xl,
    },
    signUpButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },
    // Footer
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SPACING.xl,
        marginBottom: SPACING.xxl,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    footerLink: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 14,
    },
});
