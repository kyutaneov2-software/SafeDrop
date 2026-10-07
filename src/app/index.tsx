import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Asset } from "expo-asset";
import { supabase } from "../lib/supabase";
import { styles } from "../styles/screens/splash.styles";

const logo = require("../../assets/images/SafeDrop_logo.png");

export default function SplashScreenComponent() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            let destination: any = "/signIn";

            try {
                // Preload the logo
                const imageAsset = Asset.fromModule(logo);
                await imageAsset.downloadAsync();

                // Check if user has a valid session
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (session?.user) {
                    // Check if TOTP setup is complete
                    const { data: totp } = await supabase
                        .from("user_totp")
                        .select("is_enabled")
                        .eq("id", session.user.id)
                        .maybeSingle();

                    if (totp?.is_enabled) {
                        destination = "/(tabs)/homeScreen";
                    } else {
                        destination = "/signIn"; // Force re-login
                    }
                }
            } catch (e) {
                console.warn("Splash prep error:", e);
            } finally {
                setIsReady(true);
            }

            setTimeout(() => {
                router.replace(destination);
            }, 1500);
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
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
        </View>
    );
}
