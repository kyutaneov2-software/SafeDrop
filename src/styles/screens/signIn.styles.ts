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

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
    },

    // =========================================================
    // BRAND
    // =========================================================

    brandContainer: {
        alignItems: "center",
        marginBottom: SPACING.lg,
    },

    logo: {
        width: 92,
        height: 92,
    },

    // =========================================================
    // HEADER
    // =========================================================

    header: {
        alignItems: "center",
        marginBottom: SPACING.xl,
    },

    headerTitle: {
        fontSize: 30,
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
        textAlign: "center",
        marginBottom: SPACING.sm,
    },

    headerSubtitle: {
        fontSize: 15,
        lineHeight: 23,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        textAlign: "center",
        maxWidth: 310,
    },

    // =========================================================
    // CARD
    // =========================================================

    card: {
        width: "100%",
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },

    // =========================================================
    // FORM FIELDS
    // =========================================================

    fieldContainer: {
        width: "100%",
    },

    passwordField: {
        marginTop: SPACING.lg,
    },

    passwordLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    label: {
        fontSize: 14,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },

    inputWrapper: {
        height: 56,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.background,

        borderWidth: 1.5,
        borderColor: COLORS.border,

        borderRadius: RADIUS.sm,

        paddingHorizontal: SPACING.md,
    },

    inputWrapperFocused: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,

        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },

    input: {
        flex: 1,

        height: "100%",

        marginLeft: SPACING.sm,

        paddingVertical: 0,

        fontSize: 15,

        fontFamily: FONTS.body,

        color: COLORS.textPrimary,
    },

    showButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingLeft: SPACING.sm,
    },

    showText: {
        fontSize: 13,
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
    },

    // =========================================================
    // SECURITY MESSAGE
    // =========================================================

    securityRow: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: SPACING.lg,

        paddingVertical: 10,
        paddingHorizontal: SPACING.md,

        borderRadius: RADIUS.sm,

        backgroundColor: "#ECFDF5",
    },

    securityIcon: {
        width: 28,
        height: 28,

        borderRadius: 14,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#D1FAE5",

        marginRight: SPACING.sm,
    },

    securityText: {
        flex: 1,

        fontSize: 12.5,
        lineHeight: 18,

        fontFamily: FONTS.body,

        color: "#047857",
    },

    // =========================================================
    // SIGN IN BUTTON
    // =========================================================

    buttonWrapper: {
        width: "100%",
        marginTop: SPACING.xl,
    },

    signInButton: {
        height: 56,

        width: "100%",

        borderRadius: RADIUS.sm,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: SPACING.lg,
    },

    signInButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.bodyBold,
    },

    buttonDisabled: {
        opacity: 0.7,
    },

    loadingText: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: FONTS.bodyBold,
        marginLeft: SPACING.sm,
    },

    // =========================================================
    // FOOTER
    // =========================================================

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        marginTop: SPACING.xl,
    },

    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontFamily: FONTS.body,
    },

    footerLink: {
        color: COLORS.primary,
        fontSize: 14,
        fontFamily: FONTS.bodyBold,
        marginLeft: 5,
    },

    footerNote: {
        textAlign: "center",

        marginTop: SPACING.lg,

        fontSize: 11.5,

        fontFamily: FONTS.body,

        color: COLORS.textDisabled,
    },
});
