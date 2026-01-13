
import React, { useState, useEffect, useCallback } from "react";
import { Pressable, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import InventoryCard from "@/components/card";
import Feather from '@expo/vector-icons/Feather';
import ThemedView from "@/components/themecontex/ThemedView";
import ModalInven from "@/components/Modalproducto/ModalInven";
import { InventarioService, InventarioDetallado } from "@/services/InventarioService";
import { ThemedText } from "@/components/themecontex/themed-text";

export default function Inventario() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventario, setInventario] = useState<InventarioDetallado[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventario, setFilteredInventario] = useState<InventarioDetallado[]>([]);

  const cargarInventario = useCallback(async () => {
    try {
      setLoading(true);
      const data = await InventarioService.getInventarioDetallado('');
      setInventario(data);
      setFilteredInventario(data);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar inventario al montar
  useEffect(() => {
    cargarInventario();
  }, [cargarInventario]);

  // Filtrar inventario al buscar
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredInventario(inventario);
    } else {
      const filtered = inventario.filter(i => 
        i.NOMBRE_PRODUCTO.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.CODIGO_PRODUCTO.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInventario(filtered);
    }
  }, [searchQuery, inventario]);

  return (
    <SafeAreaProvider className="flex-1 bg-white dark:bg-black ">
      <ScrollView>
        <SafeAreaView className="flex-1 mx-1 mt-1">

          <ThemedView className="flex-row mt-5 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3 border border-gray-300 dark:border-gray-700">
            <Feather name="search" size={24} color="#6b7280" />
            <TextInput
              placeholder="Buscar en inventario..."
              className="flex-1 ml-2 text-base outline-none text-gray-900 dark:text-white"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ThemedView>

          <ThemedView className="mt-4 mb-2">
            {loading ? (
              <ThemedView className="items-center justify-center py-10">
                <ActivityIndicator size="large" color="#0891b2" />
                <ThemedText className="mt-4 text-gray-500">Cargando inventario...</ThemedText>
              </ThemedView>
            ) : filteredInventario.length === 0 ? (
              <ThemedView className="items-center justify-center py-10">
                <ThemedText className="text-gray-500">
                  {searchQuery ? 'No se encontraron productos' : 'El inventario está vacío'}
                </ThemedText>
              </ThemedView>
            ) : (
              filteredInventario.map((item) => (
                <InventoryCard
                  key={item.ID_INVENTARIO}
                  id={item.ID_INVENTARIO}
                  idProducto={item.ID_PRODUCTO}
                  nombreProducto={item.NOMBRE_PRODUCTO}
                  codigoProducto={item.CODIGO_PRODUCTO}
                  tipoProducto={item.TIPO_PRODUCTO}
                  cantidadActual={item.CANTIDAD_ACTUAL}
                  idLote={item.ID_LOTE}
                  idUbicacion={item.ID_UBICACION}
                />
              ))
            )}
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
        onClose={() => {
          setIsModalOpen(false);
          cargarInventario();
        }}
      />
    </SafeAreaProvider>
  );
}
