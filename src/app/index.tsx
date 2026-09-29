import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native"; // Note: Use react-native-safe-area-context if you fixed the deprecation
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../styles/splash.styles"; // Import separated styles

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/(tabs)/homeScreen");
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.mainContent}>
                <View style={styles.logoBox}>
                    <View style={styles.logoCircle}>
                        <Feather
                            name="x"
                            size={24}
                            color="rgba(255, 255, 255, 0.9)"
                        />
                    </View>
                </View>
                <Text style={styles.title}>SafeDrop</Text>
                <Text style={styles.subtitle}>Smart. Secure. Touchless.</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.versionText}>Version 2.4.0</Text>
            </View>
        </View>
    );
}
