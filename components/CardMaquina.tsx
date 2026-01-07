import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";
import { ThemedText } from "./themecontex/themed-text";
import ModalMaquina from "./modalmaquina/ModalMaquina";

type Props = {
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
  foto?: string;
};

export default function CardMaquina({
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
  foto,
}: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <View className="mb-4">
        <Pressable
          className="
            bg-white dark:bg-gray-800
            rounded-2xl
            p-4
            shadow-lg shadow-cyan-500/50
            border border-gray-100 dark:border-gray-700
            active:opacity-90
          "
          style={{ elevation: 4 }}
          onPress={() => setIsModalOpen(true)}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <ThemedText className="font-bold text-xl uppercase tracking-wide text-gray-500 dark:text-white mb-1">
                Máquina Dispensadora
              </ThemedText>
              <ThemedText type="defaultSemiBold" className="text-cyan-600 dark:text-cyan-400">
                {fecha.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </ThemedText>
            </View>
          </View>

          {/* Ventas Compactas */}
          <View className="flex-row gap-2 mb-2">
            <View className="bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg flex-1">
              <ThemedText className="text-xs text-green-600 dark:text-green-400">
                Productos
              </ThemedText>
              <ThemedText className="text-lg font-bold text-green-700 dark:text-green-300">
                {v_productos.toLocaleString()}
              </ThemedText>
            </View>
            <View className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg flex-1">
              <ThemedText className="text-xs text-blue-600 dark:text-blue-400">
                Raspas
              </ThemedText>
              <ThemedText className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {v_raspas.toLocaleString()}
              </ThemedText>
            </View>

          </View>
          <View className="bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg min-w-[45%]">
            <ThemedText className="text-xs text-red-600 dark:text-red-400 mb-1">
              Total
            </ThemedText>
            <ThemedText className="text-2xl font-bold text-red-700 dark:text-red-300">
              ${total.toLocaleString()}
            </ThemedText>
          </View>

          {/* Contador */}
          <View className="bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg ">
            <View className="flex-row justify-between items-center">
              <ThemedText className="text-xs text-gray-600 dark:text-white">
                Contador Fecha
              </ThemedText>
              <ThemedText className="text-sm font-bold dark:text-white">
                {calor_contador_fecha.toLocaleString()}
              </ThemedText>
            </View>
          </View>

          {/* Indicador Ver Más */}
          <ThemedText className="text-xs text-center text-cyan-600 dark:text-cyan-400 mt-2">
            Toca para ver más detalles →
          </ThemedText>
        </Pressable>
      </View>

      <ModalMaquina
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fecha={fecha}
        v_productos={v_productos}
        v_raspas={v_raspas}
        total={total}
        ultimo_contados={ultimo_contados}
        calor_contador_fecha={calor_contador_fecha}
        raspas_vendidos={raspas_vendidos}
        raspa_maquina={raspa_maquina}
        raspas_stock={raspas_stock}
        compras={compras}
        observaciones={observaciones}
        foto={foto}
      />
    </>
  );
}
