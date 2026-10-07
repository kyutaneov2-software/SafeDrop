import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { styles } from "../../styles/screens/profile.styles";
import { COLORS } from "../../theme/colors";
import { getCurrentProfile, signOut } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [profile, setProfile] = useState<any>(null);
    const [totpEnabled, setTotpEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await getCurrentProfile();
                setProfile(data);

                if (data?.id) {
                    console.log("=== PROFILE TOTP DEBUG ===");
                    console.log("Profile loaded, user id:", data.id);

                    const {
                        data: totp,
                        error: totpError,
                        status,
                    } = await supabase
                        .from("user_totp")
                        .select("is_enabled, secret")
                        .eq("id", data.id)
                        .maybeSingle();

                    console.log("TOTP query result:", totp);
                    console.log("TOTP query error :", totpError);
                    console.log("TOTP HTTP status :", status);

                    setTotpEnabled(!!totp?.is_enabled);
                } else {
                    console.log("No profile data — skipping TOTP query");
                }
            } catch (e) {
                console.error("Profile load error:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out of SafeDrop?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        setSigningOut(true);
                        try {
                            await signOut();
                            router.replace("/signIn");
                        } catch (e: any) {
                            Alert.alert(
                                "Error",
                                e?.message || "Sign out failed.",
                            );
                        } finally {
                            setSigningOut(false);
                        }
                    },
                },
            ],
        );
    };

    const initials = profile?.full_name
        ? profile.full_name
              .split(" ")
              .map((w: string) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "SD";

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: insets.top + 24,
                        paddingBottom: insets.bottom + 32,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={styles.headerBlock}>
                    <View style={styles.avatar}>
                        {loading ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <Text style={styles.avatarText}>{initials}</Text>
                        )}
                    </View>
                    <Text style={styles.name}>
                        {profile?.full_name ?? "SafeDrop User"}
                    </Text>
                    <Text style={styles.role}>
                        {profile?.role
                            ? profile.role.charAt(0).toUpperCase() +
                              profile.role.slice(1)
                            : "Customer"}
                    </Text>
                </View>

                {/* INFO CARD */}
                <View style={styles.card}>
                    <InfoRow
                        icon="mail"
                        label="Email"
                        value={profile?.email ?? "—"}
                    />
                    <Divider />
                    <InfoRow
                        icon="phone"
                        label="Phone"
                        value={profile?.phone ?? "—"}
                    />
                    <Divider />
                    <InfoRow
                        icon="shield"
                        label="Two-Factor Auth"
                        value={totpEnabled ? "Enabled" : "Not enabled"}
                        valueColor={
                            totpEnabled ? COLORS.success : COLORS.danger
                        }
                    />
                </View>

                {/* SIGN OUT */}
                <Pressable
                    onPress={handleSignOut}
                    disabled={signingOut}
                    style={styles.signOutButton}
                >
                    {signingOut ? (
                        <ActivityIndicator color={COLORS.danger} />
                    ) : (
                        <>
                            <Feather
                                name="log-out"
                                size={18}
                                color={COLORS.danger}
                            />
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </>
                    )}
                </Pressable>

                <Text style={styles.footnote}>
                    SafeDrop • Secure delivery, simplified.
                </Text>
            </ScrollView>
        </View>
    );
}

function InfoRow({
    icon,
    label,
    value,
    valueColor,
}: {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: COLORS.background,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Feather name={icon} size={16} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        color: valueColor ?? COLORS.textPrimary,
                        fontWeight: "600",
                        marginTop: 2,
                    }}
                    numberOfLines={1}
                >
                    {value}
                </Text>
            </View>
        </View>
    );
}

function Divider() {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: COLORS.border,
                marginVertical: 14,
                marginLeft: 48,
            }}
        />
    );
}
