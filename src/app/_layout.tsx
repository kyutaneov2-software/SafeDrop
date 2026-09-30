import { Stack } from "expo-router";
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";


// Import the specific font weights we want
import { 
    useFonts, 
    Poppins_700Bold, 
    Poppins_600SemiBold 
} from '@expo-google-fonts/poppins';
import { 
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_600SemiBold 
} from '@expo-google-fonts/inter';

// Prevent the native splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // Load the fonts
    const [fontsLoaded, fontError] = useFonts({
        "Poppins-Bold": Poppins_700Bold,
        "Poppins-SemiBold": Poppins_600SemiBold,
        "Inter-Regular": Inter_400Regular,
        "Inter-Medium": Inter_500Medium,
        "Inter-SemiBold": Inter_600SemiBold,
    });
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="signIn" />
                <Stack.Screen name="signUp" />
                <Stack.Screen name="totp" />
                <Stack.Screen name="totpSetup" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </SafeAreaProvider>
    );
}
