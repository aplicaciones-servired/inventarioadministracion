import { Button } from "@/components/nativewindui/Button";
import { Text } from "@/components/nativewindui/Text";
import ThemedView from "@/components/themecontex/ThemedView";
import ThemeInput from "@/components/themecontex/ThemeInput";
import UseLogin from "@/services/UseLogin";
import { useState } from "react";
import { View,} from "react-native";
import "../global.css";


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { loading, handleLogin } = UseLogin({
        Usuario: username,
        Contraseña: password,
    });

    return (
        <ThemedView className="flex-1 items-center justify-center h-full w-full bg-white dark:bg-black">
            <Text className="text-3xl font-bold text-black dark:text-white ">
                Iniciar Sesión
            </Text>
            <View className=" mt-1 border border-gray-300 dark:border-gray-200 p-6 rounded-lg h-96 w-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800">

                <Text className="text-xl font-bold text-black dark:text-white ">
                    Usuario
                </Text>
                <ThemeInput
                    placeholder="CP12345678910"
                    value={username}
                    onChangeText={setUsername}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"

                >
                </ThemeInput>

                <Text className="text-xl font-bold text-black dark:text-white mt-4">
                    Contraseña
                </Text>
                <ThemeInput
                    placeholder="*****"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                >
                </ThemeInput>

                <Button
                    onPress={handleLogin}
                    className="mt-6 w-full"
                    disabled={loading}
                >
                    <Text className="text-white font-bold text-center">
                        Iniciar Sesión
                    </Text>
                </Button>

            </View>
        </ThemedView>
    );
}