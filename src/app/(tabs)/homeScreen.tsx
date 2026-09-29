
import {
View,
Text,
StyleSheet,
TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors"; // Note: Path goes up two levels

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Primary (Light Blue) Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Lockers</Text>
                <Feather name="user" size={24} color={COLORS.white} />
            </View>

            <View style={styles.content}>
                {/* Pure White Card on Ice White Background */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Locker #A-12</Text>

                        {/* Action/Success (Green) Status Indicator */}
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Available</Text>
                        </View>
                    </View>

                    <Text style={styles.cardSubtitle}>
                        Location: Downtown Hub
                    </Text>
                    <Text style={styles.cardSubtitle}>
                        Size: Medium (12" x 15")
                    </Text>

                    {/* Action/Success (Green) Call-to-Action Button */}
                    <TouchableOpacity
                        style={styles.ctaButton}
                        activeOpacity={0.8}
                    >
                        <Feather
                            name="lock"
                            size={18}
                            color={COLORS.white}
                            style={styles.ctaIcon}
                        />
                        <Text style={styles.ctaText}>Rent a Locker</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: COLORS.card, // Pure White #FFFFFF
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        color: COLORS.text, // Slate #1E293B
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
        color: COLORS.textMuted,
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
