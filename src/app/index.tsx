import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset"; // Import Asset
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import { styles } from "../styles/screens/splash.styles";

const logo = require("../../assets/images/SafeDrop_logo.png");

export default function SplashScreenComponent() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // 1. Preload the image into memory
                const imageAsset = Asset.fromModule(logo);
                await imageAsset.downloadAsync();
            } catch (e) {
                console.warn(e);
            } finally {
                // 2. Mark as ready
                setIsReady(true);

                // 3. Hide the native splash screen now that our image is ready
                await SplashScreen.hideAsync();

                // 4. Start the 2.5-second timer to navigate to home
                setTimeout(() => {
                    router.replace("/signIn");
                }, 2500);
            }
        }

        prepare();
    }, []);

    // Don't render anything until the image is ready (Native splash covers this)
    if (!isReady) {
        return null;
    }

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
