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
    // HEADER / TITLE
    // =========================================================

    headerBlock: {
        alignItems: "center",
        marginBottom: SPACING.xl,
    },

    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.successLight,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.md,
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
        lineHeight: 22,
        maxWidth: 320,
    },

    // =========================================================
    // STEP CARDS
    // =========================================================

    stepsWrapper: {
        width: "100%",
        gap: SPACING.md,
    },

    stepCard: {
        width: "100%",
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },

    stepHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SPACING.sm,
    },

    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SPACING.sm,
    },

    stepBadgeText: {
        fontSize: 13,
        fontFamily: FONTS.bodyBold,
        color: COLORS.white,
    },

    stepTitle: {
        flex: 1,
        fontSize: 15,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
    },

    stepDescription: {
        fontSize: 13.5,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },

    // =========================================================
    // QR CODE
    // =========================================================

    qrWrapper: {
        alignItems: "center",
        marginTop: SPACING.sm,
    },

    qrContainer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    accountLabel: {
        marginTop: SPACING.sm,
        fontSize: 12.5,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.textSecondary,
        textAlign: "center",
    },

    // =========================================================
    // MANUAL ENTRY (COLLAPSIBLE)
    // =========================================================

    manualToggle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SPACING.md,
    },

    manualToggleText: {
        fontSize: 13.5,
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
        marginHorizontal: 6,
    },

    manualContainer: {
        width: "100%",
        backgroundColor: "#F1F5F9",
        borderRadius: RADIUS.sm,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: SPACING.md,
    },

    manualLabel: {
        fontSize: 11,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
        textTransform: "uppercase",
        letterSpacing: 1,
        textAlign: "center",
    },

    secretRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xs,
        borderWidth: 1,
        borderColor: COLORS.border,

        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },

    secretText: {
        flex: 1,
        fontSize: 16,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
        letterSpacing: 2,
    },

    copyButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 6,
        paddingHorizontal: SPACING.sm,
        borderRadius: RADIUS.xs,
        backgroundColor: COLORS.primary,
    },

    copyButtonCopied: {
        backgroundColor: COLORS.success,
    },

    copyButtonText: {
        fontSize: 12,
        fontFamily: FONTS.bodyBold,
        color: COLORS.white,
    },

    // =========================================================
    // CONTINUE BUTTON
    // =========================================================

    continueButton: {
        width: "100%",
        borderRadius: RADIUS.sm,
        height: 56,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.lg,
    },

    continueButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.bodyBold,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    // =========================================================
    // FOOTNOTE
    // =========================================================

    footnote: {
        textAlign: "center",
        marginTop: SPACING.lg,
        fontSize: 11.5,
        fontFamily: FONTS.body,
        color: COLORS.textDisabled,
    },
});
