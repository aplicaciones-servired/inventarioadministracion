import "../../global.css";
import { useAuth } from '@/auth/AuthProvider';

import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerContentComponentProps, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colorScheme } from "nativewind";
import { ThemedText } from "@/components/themecontex/themed-text";
import ThemedView from "@/components/themecontex/ThemedView";
import { DrawerContentScrollView } from '@react-navigation/drawer';


function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    const scheme = colorScheme.get();
    setCurrentTheme(scheme === "dark" ? "dark" : "light");
  }, []);
  
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header del Drawer */}
      <ThemedView className="px-6 py-8 border-b border-neutral-200 dark:border-neutral-700">
        <View className="items-center justify-center mb-3">
          <View className="w-20 h-20 rounded-full bg-blue-600 items-center justify-center shadow-lg">
            <MaterialIcons name="inventory" size={40} color="white" />
          </View>
        </View>
        <ThemedText className="text-center text-lg font-bold tracking-wide">
          INVENTARIO
        </ThemedText>
        <ThemedText className="text-center text-sm opacity-70 mt-1">
          Administración
        </ThemedText>
      </ThemedView>

      {/* Items del menú */}
      <View className="flex-1 py-4">
        <DrawerItemList {...props} />
      </View>
      
      {/* Botón de cerrar sesión */}
      <View className="border-t border-neutral-200 dark:border-neutral-700 p-4">
        <DrawerItem
          label="Cerrar Sesión"
          labelStyle={{ 
            fontSize: 15,
            fontWeight: '600',
          }}
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#ef4444' : '#fee2e2',
            borderRadius: 8,
            marginHorizontal: 0,
          }}
          activeBackgroundColor={currentTheme === 'dark' ? '#dc2626' : '#fecaca'}
          activeTintColor={currentTheme === 'dark' ? '#ffffff' : '#991b1b'}
          inactiveTintColor={currentTheme === 'dark' ? '#fca5a5' : '#dc2626'}
          icon={({ color }) => <MaterialIcons name="logout" size={22} color={color} />}
          onPress={() => logout()}
        />
      </View>
    </DrawerContentScrollView>
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
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: '500',
            },
            drawerItemStyle: {
              borderRadius: 8,
              marginHorizontal: 12,
              marginVertical: 4,
              paddingHorizontal: 8,
            },
          }}
        >
          <Drawer.Screen
            name="inventario"
            options={{
              drawerLabel: 'Inventario',
              title: 'Inventario',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="inventory-2" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="explore"
            options={{
              drawerLabel: 'Cronograma',
              title: 'Cronograma',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="calendar-today" size={size} color={color} />
              ),
            }}
          />

        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}