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
        width: 84,
        height: 84,
    },

    // =========================================================
    // HEADER
    // =========================================================

    header: {
        alignItems: "center",
        marginBottom: SPACING.xl,
    },

    headerTitle: {
        fontSize: 28,
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
        maxWidth: 320,
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
    // SECTION HEADERS
    // =========================================================

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.md,
    },

    sectionLabel: {
        fontSize: 12,
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        letterSpacing: 0.8,
        textTransform: "uppercase",
    },

    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: SPACING.sm,
    },

    sectionSpacer: {
        marginTop: SPACING.xl,
    },

    // =========================================================
    // FORM FIELDS
    // =========================================================

    fieldContainer: {
        width: "100%",
    },

    fieldSpacer: {
        marginTop: SPACING.md,
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

    inputWrapperError: {
        borderColor: COLORS.danger,
        backgroundColor: COLORS.surface,
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
    // PASSWORD REQUIREMENTS CHECKLIST
    // =========================================================

    requirementsContainer: {
        marginTop: SPACING.md,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    requirementRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 3,
    },

    requirementIconWrap: {
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.sm,
    },

    requirementIconWrapMet: {
        backgroundColor: COLORS.successLight,
    },

    requirementText: {
        fontSize: 12.5,
        fontFamily: FONTS.body,
        color: COLORS.textDisabled,
    },

    requirementTextMet: {
        color: COLORS.success,
        fontFamily: FONTS.bodyMedium,
    },

    // =========================================================
    // AGREEMENT ROW
    // =========================================================

    agreementRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: SPACING.xl,
    },

    agreementText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 20,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        marginLeft: SPACING.sm,
    },

    agreementLink: {
        color: COLORS.primary,
        fontFamily: FONTS.bodyBold,
    },

    inlineError: {
        fontSize: 12,
        fontFamily: FONTS.body,
        color: COLORS.danger,
        marginTop: SPACING.xs,
        marginLeft: 4,
    },

    // =========================================================
    // SIGN UP BUTTON
    // =========================================================

    buttonWrapper: {
        width: "100%",
        marginTop: SPACING.xl,
    },

    signUpButton: {
        height: 56,
        width: "100%",
        borderRadius: RADIUS.sm,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
    },

    signUpButtonText: {
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
