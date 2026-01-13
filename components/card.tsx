import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import ModalDetalle from "./Modalproducto/ModalDetalle";
import { ThemedText } from "./themecontex/themed-text";
import { Ionicons } from '@expo/vector-icons';
import { Toast } from "./nativewindui/Toast";

type Props = {
  id: string;
  title: string;
  stock: number;
  price: string;
  image: any;
  FechaDeVencimiento: string;
};

export default function InventoryCard({
  id,
  title,
  stock,
  price,
  image,
  FechaDeVencimiento,
}: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const fecha_actual = new Date();


  const partesFecha = FechaDeVencimiento.split('/');
  const dia = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10) - 1;
  const anio = parseInt(partesFecha[2], 10);
  const fecha_vencimiento = new Date(anio, mes, dia);
  const diferenciaTiempo = fecha_vencimiento.getTime() - fecha_actual.getTime();
  const diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

  React.useEffect(() => {
    if (diasRestantes <= 15) {
      setToast({
        visible: true,
        message: `La fecha de vencimiento está cerca, quedan ${diasRestantes} días`,
        type: 'info'
      });
    }
  }, [diasRestantes]);

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <>
      <Pressable
        className="}
          bg-white dark:bg-gray-800
          rounded-2xl
          p-4
          mb-3
          shadow-lg
          border border-gray-100 dark:border-gray-700
          active:opacity-90
        "
        style={{ elevation: 4 }}
        onPress={() => setIsModalOpen(true)}
      >
        <View className="flex-row items-center">
          {/* Imagen */}
          <View className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 items-center justify-center overflow-hidden border-2 border-cyan-200 dark:border-cyan-800">
            <Image
              source={image}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>

          {/* Info */}
          <View className="flex-1 ml-4">
            <ThemedText className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
              {title}
            </ThemedText>

            <View className="flex-row items-center gap-1 mb-2">
              <Ionicons name="cube-outline" size={14} color="#16a34a" />
              <ThemedText className="text-sm text-green-600 dark:text-green-400 font-semibold">
                {stock} disponibles
              </ThemedText>
            </View>

            <View className="flex-row items-center gap-1 mb-2">
              <Ionicons name="calendar-outline" size={14} color="#d97706" />
              <ThemedText className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                {FechaDeVencimiento} fecha de vencimiento
              </ThemedText>
            </View>

            <View className="bg-cyan-100 dark:bg-cyan-900/30 px-2 py-1 rounded-lg self-start">
              <ThemedText className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
                {price}
              </ThemedText>
            </View>
          </View>

          {/* Icono */}
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </View>
        <ThemedText className="text-xs text-center text-cyan-600 dark:text-cyan-400 mt-2">
          Toca para ver más detalles →
        </ThemedText>
      </Pressable>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      <ModalDetalle
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        stock={stock}
        price={price}
        image={image}
        FechaDeVencimiento={FechaDeVencimiento}
      />
    </>
  );
}
