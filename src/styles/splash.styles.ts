import { StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary, // Light Blue #0EA5E9
        alignItems: "center",
        justifyContent: "center",
    },
    mainContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -40,
    },
    logoBox: {
        width: 90,
        height: 90,
        borderRadius: 28,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    logoCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: "rgba(255, 255, 255, 0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 24,
        fontSize: 34,
        fontWeight: "700",
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "400",
        color: "rgba(255, 255, 255, 0.9)",
        letterSpacing: 0.5,
    },
    footer: {
        position: "absolute",
        bottom: 40,
    },
    versionText: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.4)",
        fontWeight: "500",
    },
});
