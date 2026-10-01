import { StyleSheet } from "react-native";

import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import { RADIUS } from "../../theme/radius";
import { SHADOWS } from "../../theme/shadow";
import { FONTS } from "../../theme/fonts";

export const styles = StyleSheet.create({
    // =========================================================
    // SCREEN
    // =========================================================

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        paddingBottom: SPACING.xxl,
    },

    // =========================================================
    // HEADER
    // =========================================================

    header: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
        borderBottomLeftRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        ...SHADOWS.card,
    },

    headerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greetingLabel: {
        fontSize: 13,
        fontFamily: FONTS.body,
        color: "rgba(255,255,255,0.85)",
        marginBottom: 2,
    },

    greetingName: {
        fontSize: 22,
        fontFamily: FONTS.heading,
        color: COLORS.white,
    },

    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    notificationBadge: {
        position: "absolute",
        top: 9,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.danger,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },

    // =========================================================
    // SUBHEADER
    // =========================================================

    subheaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SPACING.lg,
    },

    subheaderTitle: {
        fontSize: 15,
        fontFamily: FONTS.bodyMedium,
        color: "rgba(255,255,255,0.85)",
    },

    subheaderLink: {
        fontSize: 13,
        fontFamily: FONTS.bodyBold,
        color: COLORS.white,
    },

    // =========================================================
    // CONTENT
    // =========================================================

    content: {
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.lg,
    },

    // =========================================================
    // SECTION TITLES
    // =========================================================

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING.md,
    },

    sectionTitle: {
        fontSize: 17,
        fontFamily: FONTS.bodyBold,
        color: COLORS.textPrimary,
    },

    sectionLink: {
        fontSize: 13,
        fontFamily: FONTS.bodyBold,
        color: COLORS.primary,
    },

    // =========================================================
    // EMPTY LOCKER CARD
    // =========================================================

    emptyCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },

    emptyIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: COLORS.successLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
    },

    emptyTitle: {
        fontSize: 18,
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },

    emptyDescription: {
        fontSize: 14,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        lineHeight: 21,
        marginBottom: SPACING.lg,
    },

    // =========================================================
    // SIZE PREVIEW ROW
    // =========================================================

    sizePreviewRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: SPACING.lg,
    },

    sizeBadge: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#F0F9FF",
        borderWidth: 1,
        borderColor: "#BAE6FD",
    },

    sizeBadgeText: {
        fontSize: 12.5,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.textPrimary,
    },

    // =========================================================
    // RENT / CHOOSE LOCKER BUTTON
    // =========================================================

    rentButton: {
        height: 52,
        borderRadius: RADIUS.sm,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
    },

    rentButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: FONTS.bodyBold,
    },

    // =========================================================
    // RECENT ACTIVITY
    // =========================================================

    activityCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        ...SHADOWS.card,
    },

    activityIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.sm,
    },

    activityText: {
        fontSize: 13.5,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 20,
    },

    // =========================================================
    // TAB BAR
    // =========================================================

    tabBar: {
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        height: 64,
        paddingBottom: 6,
        paddingTop: 6,
    },

    // =========================================================
    // PLACEHOLDER SCREENS (Alerts / Profile)
    // =========================================================

    placeholderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    placeholderIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    placeholderTitle: {
        fontSize: 20,
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },

    placeholderSubtitle: {
        fontSize: 14,
        fontFamily: FONTS.body,
        color: COLORS.textSecondary,
        textAlign: "center",
        maxWidth: 300,
        lineHeight: 21,
    },
});
