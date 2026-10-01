import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../theme/colors";
import { styles } from "../../styles/screens/homeScreen.styles";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textDisabled,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginTop: -2,
                },
            }}
        >
            <Tabs.Screen
                name="homeScreen"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: "Alerts",
                    tabBarIcon: ({ color }) => (
                        <Feather name="bell" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
