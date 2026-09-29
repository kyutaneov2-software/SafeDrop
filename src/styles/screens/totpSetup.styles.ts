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
        marginLeft: -SPACING.sm,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        alignItems: "center",
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.successLight,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SPACING.lg,
        ...SHADOWS.card,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 22,
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.md,
    },
    qrContainer: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.xl,
        ...SHADOWS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    manualContainer: {
        width: "100%",
        backgroundColor: "#F1F5F9", // Light slate tint
        borderRadius: RADIUS.sm,
        padding: SPACING.md,
        alignItems: "center",
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    manualLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
        textTransform: "uppercase",
        letterSpacing: 1,
        fontWeight: "600",
    },
    secretText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        letterSpacing: 2,
        fontFamily: "monospace", // Makes the key easier to read
    },
    continueButton: {
        width: "100%",
        borderRadius: RADIUS.sm,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.md,
    },
    continueButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },
});
