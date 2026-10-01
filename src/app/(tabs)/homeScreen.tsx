import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Styles + Theme
import { styles } from "../../styles/screens/homeScreen.styles";
import { COLORS } from "../../theme/colors";
import { GRADIENTS } from "../../theme/gradients";

// Auth
import { getCurrentProfile } from "../../lib/auth";

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // ---------------------------------------------------------
    // LOAD USER PROFILE
    // ---------------------------------------------------------
    useEffect(() => {
        async function load() {
            try {
                const data = await getCurrentProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // ---------------------------------------------------------
    // GREETING
    // ---------------------------------------------------------
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const firstName = profile?.full_name?.split(" ")[0] ?? "there";

    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.greetingLabel}>
                                {getGreeting()},
                            </Text>
                            {loading ? (
                                <ActivityIndicator
                                    color={COLORS.white}
                                    size="small"
                                />
                            ) : (
                                <Text style={styles.greetingName}>
                                    {firstName} 👋
                                </Text>
                            )}
                        </View>

                        <Pressable
                            style={styles.notificationButton}
                            hitSlop={8}
                        >
                            <Feather
                                name="bell"
                                size={20}
                                color={COLORS.white}
                            />
                            <View style={styles.notificationBadge} />
                        </Pressable>
                    </View>

                    <View style={styles.subheaderRow}>
                        <Text style={styles.subheaderTitle}>Your SafeDrop</Text>
                        <Pressable hitSlop={8}>
                            <Text style={styles.subheaderLink}>View all</Text>
                        </Pressable>
                    </View>
                </View>

                {/* =====================================================
                    CONTENT
                ===================================================== */}
                <View style={styles.content}>
                    {/* ---------------------------------------------
                        EMPTY LOCKER CARD
                    --------------------------------------------- */}
                    <View style={styles.emptyCard}>
                        <View style={styles.emptyIconWrap}>
                            <Feather
                                name="package"
                                size={24}
                                color={COLORS.success}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>No Active Locker</Text>

                        <Text style={styles.emptyDescription}>
                            Have a parcel to store? Choose a locker that fits
                            its size — small, medium, or large — and access it
                            anytime with your phone.
                        </Text>

                        {/* SIZE PREVIEW ROW */}
                        <View style={styles.sizePreviewRow}>
                            <View style={styles.sizeBadge}>
                                <Feather
                                    name="box"
                                    size={16}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.sizeBadgeText}>Small</Text>
                            </View>
                            <View style={styles.sizeBadge}>
                                <Feather
                                    name="package"
                                    size={16}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.sizeBadgeText}>Medium</Text>
                            </View>
                            <View style={styles.sizeBadge}>
                                <Feather
                                    name="archive"
                                    size={16}
                                    color={COLORS.primary}
                                />
                                <Text style={styles.sizeBadgeText}>Large</Text>
                            </View>
                        </View>

                        <Pressable
                            onPress={() => {
                                // Phase 2 → choose locker flow.
                                // Placeholder nav for now.
                                router.push("/totpSetup");
                            }}
                        >
                            <LinearGradient
                                colors={GRADIENTS.primary}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.rentButton}
                            >
                                <Text style={styles.rentButtonText}>
                                    Choose Parcel Locker
                                </Text>
                                <Feather
                                    name="arrow-right"
                                    size={18}
                                    color={COLORS.white}
                                    style={{ marginLeft: 8 }}
                                />
                            </LinearGradient>
                        </Pressable>
                    </View>

                    {/* ---------------------------------------------
                        RECENT ACTIVITY
                    --------------------------------------------- */}
                    <View style={[styles.sectionHeader, { marginTop: 28 }]}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <Pressable hitSlop={8}>
                            <Text style={styles.sectionLink}>See history</Text>
                        </Pressable>
                    </View>

                    <View style={styles.activityCard}>
                        <View style={styles.activityIconWrap}>
                            <Feather
                                name="inbox"
                                size={20}
                                color={COLORS.textDisabled}
                            />
                        </View>
                        <Text style={styles.activityText}>
                            No recent deliveries yet.{"\n"}
                            Your activity will appear here once you store your
                            first parcel.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
