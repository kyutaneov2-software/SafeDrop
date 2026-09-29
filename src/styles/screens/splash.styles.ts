import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";

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
    // NEW LOGO STYLE
    logo: {
        width: 150, // Adjust this based on your logo's dimensions
        height: 150, // Keep width and height equal for a square logo
        marginBottom: 10, // Adds a little space between the logo and the "SafeDrop" text
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
