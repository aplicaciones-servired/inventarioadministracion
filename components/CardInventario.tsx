import React from "react";
import { View, Pressable } from "react-native";
import { ThemedText } from "./themecontex/themed-text";
import { Ionicons } from '@expo/vector-icons';

type Props = {
  idProducto: number;
  nombreProducto: string;
  codigoProducto: string;
  cantidadTotal: number;
  tipoProducto: 'ALIMENTO' | 'TANGIBLE';
  onPress?: () => void;
};

export default function InventarioResumenCard({
  idProducto,
  nombreProducto,
  codigoProducto,
  cantidadTotal,
  tipoProducto,
  onPress
}: Props) {

  const getIconoTipo = () => {
    return tipoProducto === 'ALIMENTO' ? 'restaurant-outline' : 'cube-outline';
  };

  const getColorTipo = () => {
    return tipoProducto === 'ALIMENTO' ? '#f59e0b' : '#3b82f6';
  };

  const getEstadoStock = () => {
    if (cantidadTotal === 0) return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', label: 'SIN STOCK' };
    if (cantidadTotal < 10) return { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', label: 'STOCK BAJO' };
    return { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', label: 'STOCK OK' };
  };

  const estadoStock = getEstadoStock();

  return (
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-lg border border-gray-100 dark:border-gray-700 active:opacity-90"
      style={{ elevation: 4 }}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        {/* Icono Tipo */}
        <View className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 items-center justify-center border-2 border-blue-200 dark:border-blue-800">
          <Ionicons name={getIconoTipo()} size={32} color={getColorTipo()} />
        </View>

        {/* Info */}
        <View className="flex-1 ml-4">
          <ThemedText className="text-sm font-bold text-blue-700 dark:text-blue-300">
            {nombreProducto}
          </ThemedText>

          <View className="flex-row items-center gap-1 mb-1">
            <Ionicons name="barcode-outline" size={12} color="#6366f1" />
            <ThemedText className="text-xs text-indigo-600 dark:text-indigo-400">
              {codigoProducto}
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-2">
            {/* Cantidad */}
            <View className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
              <ThemedText className="text-sm font-bold text-blue-700 dark:text-blue-300">
                {cantidadTotal} unidades
              </ThemedText>
            </View>

            {/* Estado */}
            <View className={`${estadoStock.bg} px-2 py-1 rounded-lg`}>
              <ThemedText className={`text-xs font-bold ${estadoStock.color}`}>
                {estadoStock.label}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Icono */}
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      </View>
    </Pressable>
  );
}
