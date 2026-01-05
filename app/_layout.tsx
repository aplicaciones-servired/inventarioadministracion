import 'react-native-gesture-handler';
import 'react-native-reanimated';
import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/auth/AuthProvider';
import { useColorScheme } from "nativewind";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { colorScheme: currentTheme = "light" } = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="modal" />
          <Stack.Screen
            name="index"
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="inventario"
            options={{
              title: 'Inventario',
              headerShown: true,
            }}
          />
        </Stack>
        

        <StatusBar
          style={currentTheme === 'dark' ? 'light' : 'dark'}
          backgroundColor={currentTheme === 'dark' ? '#000000' : '#ffffff'}
          translucent={false}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
