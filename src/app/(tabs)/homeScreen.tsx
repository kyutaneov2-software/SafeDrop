
import { View, Text, TouchableOpacity } from "react-native"; // Note: Use react-native-safe-area-context if you fixed the deprecation

import { Feather } from "@expo/vector-icons";
import { styles } from "../../styles/screens/homeScreen.styles"; // Import separated styles
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Lockers</Text>
                <Feather name="user" size={24} color="white" />
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Locker #A-12</Text>
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

                    <TouchableOpacity
                        style={styles.ctaButton}
                        activeOpacity={0.8}
                    >
                        <Feather
                            name="lock"
                            size={18}
                            color="white"
                            style={styles.ctaIcon}
                        />
                        <Text style={styles.ctaText}>Rent a Locker</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
