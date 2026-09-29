import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { styles } from "../../styles/tabs.styles"; // Import separated styles

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#94A3B8",
                tabBarStyle: styles.tabBar, // Apply separated style
            }}
        >
            <Tabs.Screen
                name="homeScreen"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
