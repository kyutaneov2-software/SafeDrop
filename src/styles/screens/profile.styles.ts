import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { SHADOWS } from "@/theme/shadow";
import { FONTS } from "@/theme/fonts";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { paddingHorizontal: SPACING.lg },

    headerBlock: {
        alignItems: "center",
        marginBottom: SPACING.xl,
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SPACING.md,
        ...SHADOWS.card,
    },
    avatarText: {
        fontSize: 30,
        fontFamily: FONTS.heading,
        color: COLORS.white,
    },
    name: {
        fontSize: 22,
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    role: {
        fontSize: 13,
        fontFamily: FONTS.bodyMedium,
        color: COLORS.primary,
        letterSpacing: 0.5,
    },

    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.card,
    },

    signOutButton: {
        marginTop: SPACING.xl,
        height: 52,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.danger,
        backgroundColor: COLORS.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    signOutText: {
        fontSize: 15,
        fontFamily: FONTS.bodyBold,
        color: COLORS.danger,
    },

    footnote: {
        textAlign: "center",
        marginTop: SPACING.xl,
        fontSize: 11.5,
        fontFamily: FONTS.body,
        color: COLORS.textDisabled,
    },
});