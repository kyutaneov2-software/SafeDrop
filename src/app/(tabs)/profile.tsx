import React from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { styles } from "../../styles/screens/homeScreen.styles";
import { COLORS } from "../../theme/colors";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.placeholderContainer, { paddingTop: insets.top }]}>
            <View style={styles.placeholderIcon}>
                <Feather name="user" size={30} color={COLORS.textDisabled} />
            </View>
            <Text style={styles.placeholderTitle}>Profile</Text>
            <Text style={styles.placeholderSubtitle}>
                Manage your account, security settings, and personal information
                here.
            </Text>
        </View>
    );
}
