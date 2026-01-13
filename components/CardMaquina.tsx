import React, { useState, useEffect } from "react";
import { View, Image, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "./themecontex/themed-text";
import { Ionicons } from '@expo/vector-icons';
import { ImagenesService } from "../services/ImagenesService";

type Props = {
  id: number;
  codigo: string;
  nombre: string;
  estado: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';
  fechaCompra?: string;
  fechaInicioOperacion?: string;
  ubicacion?: string;
  observaciones?: string;
  imageUrl?: string;
  onPress?: () => void;
};

export default function CardMaquina({
  id,
  codigo,
  nombre,
  estado,
  fechaCompra,
  fechaInicioOperacion,
  ubicacion,
  observaciones,
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
            'ARQUEO',
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

  // Color del badge según estado
  const getEstadoColor = () => {
    switch (estado) {
      case 'ACTIVA':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'INACTIVA':
        return 'bg-red-100 dark:bg-red-900/30';
      case 'MANTENIMIENTO':
        return 'bg-amber-100 dark:bg-amber-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getEstadoTextColor = () => {
    switch (estado) {
      case 'ACTIVA':
        return 'text-green-700 dark:text-green-300';
      case 'INACTIVA':
        return 'text-red-700 dark:text-red-300';
      case 'MANTENIMIENTO':
        return 'text-amber-700 dark:text-amber-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  const getEstadoIcon = () => {
    switch (estado) {
      case 'ACTIVA':
        return 'checkmark-circle';
      case 'INACTIVA':
        return 'close-circle';
      case 'MANTENIMIENTO':
        return 'construct';
      default:
        return 'ellipse';
    }
  };

  return (
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-lg border border-gray-100 dark:border-gray-700 active:opacity-90"
      style={{ elevation: 4 }}
      onPress={onPress}
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
            <Ionicons name="hardware-chip-outline" size={40} color="#0891b2" />
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

          {ubicacion && (
            <View className="flex-row items-center gap-1 mb-2">
              <Ionicons name="location-outline" size={14} color="#8b5cf6" />
              <ThemedText className="text-xs text-purple-600 dark:text-purple-400">
                {ubicacion}
              </ThemedText>
            </View>
          )}

          {/* Estado Badge */}
          <View className="flex-row items-center gap-2">
            <View className={`${getEstadoColor()} px-2 py-1 rounded-lg flex-row items-center gap-1`}>
              <Ionicons 
                name={getEstadoIcon()} 
                size={14} 
                color={estado === 'ACTIVA' ? '#16a34a' : estado === 'INACTIVA' ? '#dc2626' : '#f59e0b'} 
              />
              <ThemedText className={`text-xs font-bold ${getEstadoTextColor()}`}>
                {estado}
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
