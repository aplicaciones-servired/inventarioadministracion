
import React, { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import ThemedView from "@/components/themecontex/ThemedView";
import ModalInven from "@/components/Modalproducto/ModalInven";
import CardMaquina from "@/components/CardMaquina";

export default function Maquina() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <SafeAreaProvider className="flex-1 bg-white dark:bg-black ">
      <ScrollView>
        <SafeAreaView className="flex-1 mx-1 mt-1">

          <ThemedView className="flex-row mt-5 items-center bg-gray-100 rounded-full px-4 py-3 border">
            <Feather name="search" size={24} color="black" />
            <TextInput
              placeholder="Search the galaxy..."
              className="flex-1 ml-2 text-base outline-none"
              placeholderTextColor="gray"
            />
          </ThemedView>
          <ThemedView className="mt-4 mb-2">
            <CardMaquina fecha={new Date()} v_productos={147000} v_raspas={317000} total={317000} ultimo_contados={8329000} calor_contador_fecha={8629000} raspas_vendidos={85} raspa_maquina={100} raspas_stock={217} compras={0} observaciones="Queda un sobrante por valor de $17.000=" />
            </ThemedView>
        </SafeAreaView>
      </ScrollView>
      <Pressable
        className="absolute bottom-14 active:bg-blue-700 disabled:bg-blue-300 right-5 w-24 h-24 rounded-full bg-blue-600 justify-center items-center hover:bg-blue-700 shadow-lg"
        onPress={() => setIsModalOpen(true)}
      >
        <AntDesign name="plus" size={40} color="white" />
      </Pressable>
      <ModalInven
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SafeAreaProvider>
  );
}
