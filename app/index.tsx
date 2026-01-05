import { Button } from "@/components/nativewindui/Button";
import { Text } from "@/components/nativewindui/Text";
import { Toast } from "@/components/nativewindui/Toast";
import ThemedView from "@/components/themecontex/ThemedView";
import ThemeInput from "@/components/themecontex/ThemeInput";
import UseLogin from "@/services/UseLogin";
import { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import "../global.css";


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

    const { loading, handleLogin, error } = UseLogin({
        Usuario: username,
        Contraseña: password,
    });

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ visible: true, message, type });
    };

    const hideToast = () => {
        setToast({ ...toast, visible: false });
    };

    const onLoginPress = async () => {
        if (!username || !password) {
            showToast("Por favor complete todos los campos", "error");
            return;
        }

        showToast("Iniciando sesión...", "info");

        try {
            await handleLogin();
            if (error) {
                showToast(error, "error");
            } else {
                showToast("Inicio de sesión exitoso", "success");
            }
        } catch (err) {
            showToast("Ocurrió un error inesperado", "error");
        }
    };

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
                >
                </ThemeInput>

                <Text className="text-xl font-bold text-black dark:text-white mt-4">
                    Contraseña
                </Text>
                <ThemeInput
                    placeholder="*****"
                    className="mt-1"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={!loading}
                >
                </ThemeInput>

                <Button
                    onPress={onLoginPress}
                    className="mt-6 w-full"
                    disabled={loading}
                >
                    <Text className="text-white font-bold text-center">
                        Iniciar Sesión
                    </Text>
                </Button>

            </View>
            <Toast
                message={toast.message}
                type={toast.type}
                visible={toast.visible}
                onHide={hideToast}
            />
        </ThemedView>
    );
}