import React from "react";
import { View, Modal, Pressable, ScrollView } from "react-native";
import { ThemedText } from "../themecontex/themed-text";

type Props = {
  visible: boolean;
  onClose: () => void;
  fecha: Date;
  v_productos: number;
  v_raspas: number;
  total: number;
  ultimo_contados: number;
  calor_contador_fecha: number;
  raspas_vendidos: number;
  raspa_maquina: number;
  raspas_stock: number;
  compras: number;
  observaciones: string;
};

export default function ModalMaquina({
  visible,
  onClose,
  fecha,
  v_productos,
  v_raspas,
  total,
  ultimo_contados,
  calor_contador_fecha,
  raspas_vendidos,
  raspa_maquina,
  raspas_stock,
  compras,
  observaciones,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[90%]">
          <ScrollView className="p-5">
            {/* Header */}
            <View className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <ThemedText className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Máquina Dispensadora - Detalle Completo
              </ThemedText>
              <View className="flex-row items-center justify-between">
                <ThemedText type="title" className="text-cyan-600 dark:text-cyan-400">
                  {fecha.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </ThemedText>
                <Pressable
                  onPress={onClose}
                  className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full items-center justify-center"
                >
                  <ThemedText className="text-gray-600 dark:text-gray-300 text-lg font-bold">
                    ✕
                  </ThemedText>
                </Pressable>
              </View>
              <View className="bg-cyan-100 dark:bg-cyan-900/30 px-4 py-2 rounded-full mt-3 self-start">
                <ThemedText className="text-cyan-700 dark:text-cyan-300 font-bold text-2xl">
                  Total: ${total.toLocaleString()}
                </ThemedText>
              </View>
            </View>

            {/* Ventas Section */}
            <View className="mb-4">
              <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                💰 Ventas
              </ThemedText>
              <View className="flex-row flex-wrap gap-3">
                <View className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
                  <ThemedText className="text-xs text-green-600 dark:text-green-400 mb-1">
                    Productos Vendidos
                  </ThemedText>
                  <ThemedText className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {v_productos}
                  </ThemedText>
                </View>
                <View className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
                  <ThemedText className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                    Raspas Vendidas
                  </ThemedText>
                  <ThemedText className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {v_raspas}
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Inventario de Raspas */}
            <View className="mb-4">
              <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                🎫 Inventario Raspas
              </ThemedText>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
                  <ThemedText className="text-xs text-purple-600 dark:text-purple-400 mb-1">
                    Raspas Vendidas
                  </ThemedText>
                  <ThemedText className="text-xl font-bold text-purple-700 dark:text-purple-300">
                    {raspas_vendidos}
                  </ThemedText>
                </View>
                <View className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-lg">
                  <ThemedText className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                    En Máquina
                  </ThemedText>
                  <ThemedText className="text-xl font-bold text-orange-700 dark:text-orange-300">
                    {raspa_maquina}
                  </ThemedText>
                </View>
                <View className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
                  <ThemedText className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">
                    En Stock
                  </ThemedText>
                  <ThemedText className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                    {raspas_stock}
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Información del Contador */}
            <View className="mb-4">
              <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                📊 Información del Contador
              </ThemedText>
              <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <View className="flex-row justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
                    Último Contado
                  </ThemedText>
                  <ThemedText className="text-lg font-bold">
                    {ultimo_contados}
                  </ThemedText>
                </View>
                <View className="flex-row justify-between">
                  <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
                    Contador Fecha
                  </ThemedText>
                  <ThemedText className="text-lg font-bold">
                    {calor_contador_fecha}
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Compras */}
            <View className="mb-4">
              <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                🛒 Compras
              </ThemedText>
              <View className="bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
                <ThemedText className="text-xs text-red-600 dark:text-red-400 mb-1">
                  Total Compras
                </ThemedText>
                <ThemedText className="text-2xl font-bold text-red-700 dark:text-red-300">
                  ${compras.toLocaleString()}
                </ThemedText>
              </View>
            </View>

            {/* Observaciones */}
            {observaciones && (
              <View className="mb-4">
                <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                  📝 Observaciones
                </ThemedText>
                <View className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400">
                  <ThemedText className="text-base text-amber-900 dark:text-amber-200">
                    {observaciones}
                  </ThemedText>
                </View>
              </View>
            )}

            {/* Botón Cerrar */}
            <Pressable
              onPress={onClose}
              className="bg-cyan-600 dark:bg-cyan-700 py-4 rounded-xl items-center active:opacity-80 mt-2"
            >
              <ThemedText className="text-white font-bold text-base">
                Cerrar
              </ThemedText>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
