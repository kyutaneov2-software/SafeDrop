import { StyleSheet } from "react-native";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { SHADOWS } from "@/theme/shadow";
import { FONTS } from "@/theme/fonts";

export const styles = StyleSheet.create({
    // =========================================================
    // SCREEN
    // =========================================================

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
    },

    backButton: {
        padding: SPACING.sm,
        marginLeft: -SPACING.sm,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },

    // =========================================================
    // HEADER BLOCK
    // =========================================================

    content: {
        alignItems: "center",
        paddingTop: SPACING.md,
    },

    iconContainer: {
        width: 76,
        height: 76,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.successLight,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.lg,
        ...SHADOWS.card,
    },

    title: {
        fontSize: 26,
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 23,
        maxWidth: 320,
        marginBottom: SPACING.xl,
    },

    // =========================================================
    // OTP INPUTS
    // =========================================================

    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: SPACING.md,
    },

    otpInput: {
        width: 48,
        height: 58,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        textAlign: "center",
        fontSize: 22,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
        ...SHADOWS.card,
    },

    otpInputFocused: {
        borderColor: COLORS.primary,
        backgroundColor: "#F0F9FF",
    },

    otpInputError: {
        borderColor: COLORS.danger,
        backgroundColor: "#FEF2F2",
    },

    // =========================================================
    // INLINE ERROR
    // =========================================================

    inlineError: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },

    inlineErrorText: {
        marginLeft: 6,
        fontSize: 13,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.danger,
        textAlign: "center",
    },

    // =========================================================
    // COUNTDOWN
    // =========================================================

    countdownRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SPACING.lg,
        paddingVertical: 8,
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.sm,
        backgroundColor: "#F1F5F9",
    },

    countdownText: {
        fontSize: 13,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        marginLeft: 6,
    },

    countdownBold: {
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
    },

    // =========================================================
    // LOADING ROW
    // =========================================================

    verifyingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SPACING.lg,
    },

    verifyingText: {
        marginLeft: SPACING.sm,
        fontSize: 14,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.textSecondary,
    },

    // =========================================================
    // SECONDARY ACTION
    // =========================================================

    secondaryAction: {
        marginTop: SPACING.xl,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    secondaryActionText: {
        fontSize: 14,
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        marginLeft: 8,
    },

    // =========================================================
    // FOOTER
    // =========================================================

    footer: {
        marginTop: SPACING.xl,
        alignItems: "center",
    },

    footerText: {
        color: COLORS.textSecondary,
        fontSize: 13.5,
        fontFamily: FONTS.body,
        textAlign: "center",
        lineHeight: 20,
    },

    footerLink: {
        color: COLORS.primary,
        fontFamily: FONTS.bodyBold,
        fontSize: 13.5,
    },

    footnote: {
        textAlign: "center",
        marginTop: SPACING.lg,
        fontSize: 11.5,
        fontFamily: FONTS.body,
        color: COLORS.textDisabled,
    },
});
