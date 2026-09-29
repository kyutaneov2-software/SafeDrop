import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/colors";
import { SHADOWS } from "../../theme/shadow";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Ice White #F8FAFC
        
    },
    header: {
        backgroundColor: COLORS.primary, // Light Blue #0EA5E9
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",


    },
    headerTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        padding: 20,
    },
    card: {
        backgroundColor: COLORS.background, // Pure White #FFFFFF
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...SHADOWS.card,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        color: COLORS.textPrimary, // Slate #1E293B
        fontSize: 18,
        fontWeight: "700",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(16, 185, 129, 0.1)", // Green with 10% opacity
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.success, // Green #10B981
        marginRight: 6,
    },
    statusText: {
        color: COLORS.success, // Green #10B981
        fontSize: 12,
        fontWeight: "600",
    },
    cardSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    ctaButton: {
        backgroundColor: COLORS.success, // Green #10B981
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
    },
    ctaIcon: {
        marginRight: 8,
    },
    ctaText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
});
