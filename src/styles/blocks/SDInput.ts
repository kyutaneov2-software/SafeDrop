import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";
import { RADIUS } from "@/theme/radius";
import { SPACING } from "@/theme/spacing";

export const inputField = StyleSheet.create({
    TextField: {
        flex: 1,
        height: "100%",
        color: COLORS.textPrimary,
        fontSize: 16,
        paddingHorizontal: SPACING.md,
    },
    InputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        marginTop: SPACING.sm,
    },
    InputWrapperFocused: {
        borderColor: COLORS.primary,
    },
});
