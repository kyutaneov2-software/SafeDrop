

import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function SignInScreen() {

    const rounter = useRouter();

    return (
        <View style={{ margin: 50}}>
            <Text> Login Screen</Text>

            <Pressable
                style={{ marginTop: 20}}
                onPress={() => rounter.replace('/(tabs)/homeScreen')}
            >
                <Text>Home Screen</Text>
            </Pressable>
        </View>
    );
}