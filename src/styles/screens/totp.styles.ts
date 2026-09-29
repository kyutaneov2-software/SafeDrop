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
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    backButton: {
        padding: SPACING.sm,
        marginLeft: -SPACING.sm, // Optically align the icon with the edge
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        alignItems: "center",
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.successLight, // Soft green background
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.xl,
        ...SHADOWS.card,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: SPACING.xl,
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: SPACING.xl,
    },
    otpInput: {
        width: 48,
        height: 56,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        ...SHADOWS.card,
    },
    otpInputFocused: {
        borderColor: COLORS.primary, // Light Blue border when focused
        backgroundColor: "#F0F9FF", // Very light blue tint
    },
    verifyButton: {
        width: "100%",
        borderRadius: RADIUS.sm,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.md,
    },
    verifyButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },
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
