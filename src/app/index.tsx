import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import { styles } from "../styles/screens/splash.styles";

const logo = require("@/assets/images/SafeDrop_logo.png");

export default function SplashScreenComponent() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                const imageAsset = Asset.fromModule(logo);
                await imageAsset.downloadAsync();
            } catch (e) {
                console.warn(e);
            } finally {
                setIsReady(true);
                // Navigate after 2.5 seconds
                setTimeout(() => {
                    router.replace("/signIn");
                }, 2500);
            }
        }
        prepare();
    }, []);

    if (!isReady) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.mainContent}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.title}>SafeDrop</Text>
                <Text style={styles.subtitle}>Smart. Secure. Touchless.</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.versionText}>Version 2.4.0</Text>
            </View>
        </View>
    );
}
