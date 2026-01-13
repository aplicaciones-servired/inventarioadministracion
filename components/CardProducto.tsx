import React, { useState, useEffect } from "react";
import { View, Image, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "./themecontex/themed-text";
import { Ionicons } from '@expo/vector-icons';
import { ImagenesService } from "../services/ImagenesService";

type Props = {
  id: number;
  codigo: string;
  nombre: string;
  tipoProducto: 'ALIMENTO' | 'TANGIBLE';
  estado: boolean;
  imageUrl?: string;
  onPress?: () => void;
};

export default function CardProducto({
  id,
  codigo,
  nombre,
  tipoProducto,
  estado,
  imageUrl,
  onPress
}: Props) {

  const [imagenUrl, setImagenUrl] = useState<string | null>(imageUrl || null);
  const [loadingImage, setLoadingImage] = useState(!imageUrl);

  // Cargar imagen desde MinIO
  useEffect(() => {
    if (!imageUrl) {
      const fetchImage = async () => {
        try {
          const imagenes = await ImagenesService.getImagenes(
            'INVENTARIO',
            id,
            ''
          );
          if (imagenes.length > 0) {
            setImagenUrl(imagenes[0].url);
          }
        } catch (error) {
          console.error('Error al cargar imagen:', error);
        } finally {
          setLoadingImage(false);
        }
      };
      fetchImage();
    } else {
      setLoadingImage(false);
    }
  }, [id, imageUrl]);

  const getIconoTipo = () => {
    return tipoProducto === 'ALIMENTO' ? 'restaurant-outline' : 'cube-outline';
  };

  const getColorTipo = () => {
    return tipoProducto === 'ALIMENTO' ? '#f59e0b' : '#3b82f6';
  };

  return (
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-lg border border-gray-100 dark:border-gray-700 active:opacity-90"
      style={{ elevation: 4 }}
      onPress={onPress}
      disabled={!estado}
    >
      <View className="flex-row items-center">
        {/* Imagen */}
        <View className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 items-center justify-center overflow-hidden border-2 border-cyan-200 dark:border-cyan-800">
          {loadingImage ? (
            <ActivityIndicator size="small" color="#0891b2" />
          ) : imagenUrl ? (
            <Image
              source={{ uri: imagenUrl }}
              className="w-full h-full"
              resizeMode="cover"
              onError={() => setImagenUrl(null)}
            />
          ) : (
            <Ionicons name={getIconoTipo()} size={40} color={getColorTipo()} />
          )}
        </View>

        {/* Info */}
        <View className="flex-1 ml-4">
          <ThemedText className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
            {nombre}
          </ThemedText>

          <View className="flex-row items-center gap-1 mb-2">
            <Ionicons name="barcode-outline" size={14} color="#6366f1" />
            <ThemedText className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
              {codigo}
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-2">
            {/* Tipo Badge */}
            <View className={`${tipoProducto === 'ALIMENTO' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-blue-100 dark:bg-blue-900/30'} px-2 py-1 rounded-lg flex-row items-center gap-1`}>
              <Ionicons name={getIconoTipo()} size={14} color={getColorTipo()} />
              <ThemedText className={`text-xs font-bold ${tipoProducto === 'ALIMENTO' ? 'text-amber-700 dark:text-amber-300' : 'text-blue-700 dark:text-blue-300'}`}>
                {tipoProducto}
              </ThemedText>
            </View>

            {/* Estado Badge */}
            {!estado && (
              <View className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-lg">
                <ThemedText className="text-xs font-bold text-red-700 dark:text-red-300">
                  INACTIVO
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        {/* Icono */}
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      </View>
    </Pressable>
  );
}
