import "../../global.css";
import { useAuth } from '@/auth/AuthProvider';

import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerContentComponentProps, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colorScheme } from "nativewind";
import { ThemedText } from "@/components/themecontex/themed-text";
import ThemedView from "@/components/themecontex/ThemedView";


function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  
    useEffect(() => {
      const scheme = colorScheme.get();
      setCurrentTheme(scheme === "dark" ? "dark" : "light");
    }, []);
  
  return (
    <>
      <ThemedView className="px-4 py-6 border-b border-neutral-500 items-center">
        <ThemedText className="mt-10 font-bold"> INVENTARIO ADMINISTRACION <MaterialIcons name="inventory" size={24}/></ThemedText>
      </ThemedView>

      <DrawerItemList {...props} />


      <DrawerItem
        label="CERRAR SESION"
        activeBackgroundColor='red'
        activeTintColor={Colors[currentTheme].tint}
        focused={true}
        style={{ marginTop: 'auto' }}
        icon={() => <MaterialIcons name="logout" size={24} color={Colors[currentTheme].tint} />}
        onPress={() => logout()}
      />
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={CustomDrawerContent}
          screenOptions={{
            drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            drawerStatusBarAnimation: 'slide',
          }}
          
        >
          <Drawer.Screen
            name="inventario" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Inventario',
              title: 'Inventario'
            }}
          />

          <Drawer.Screen
            name="explore" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: 'Cronograma',
              title: 'Cronograma'
            }}
          />

        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}