import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../theme/colors";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Automatically navigate to the home screen after 2.5 seconds
        const timer = setTimeout(() => {
            router.replace("/(tabs)/homeScreen");
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.mainContent}>
                {/* Logo Box */}
                <View style={styles.logoBox}>
                    <View style={styles.logoCircle}>
                        <Feather
                            name="x"
                            size={24}
                            color="rgba(255, 255, 255, 0.9)"
                        />
                    </View>
                </View>

                {/* Text Content */}
                <Text style={styles.title}>SafeDrop</Text>
                <Text style={styles.subtitle}>Smart. Secure. Touchless.</Text>
            </View>

            {/* Footer Version Text */}
            <View style={styles.footer}>
                <Text style={styles.versionText}>Version 2.4.0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
