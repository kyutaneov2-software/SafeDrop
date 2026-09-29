import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";

export default function TabLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary, // Active icon is Light Blue
            tabBarInactiveTintColor: "#94A3B8",
            tabBarStyle: {
            backgroundColor: COLORS.card,
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            },
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
