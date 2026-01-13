
import React, { useState, useEffect, useCallback } from "react";
import { Pressable, TextInput, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from '@expo/vector-icons/Feather';
import ThemedView from "@/components/themecontex/ThemedView";
import CardProducto from "@/components/CardProducto";
import { ProductosService, ProductoConImagen } from "@/services/ProductosService";
import { ThemedText } from "@/components/themecontex/themed-text";
import ModalProducto from "@/components/Modalproducto/ModalProducto";

export default function Productos() {
  const [productos, setProductos] = useState<ProductoConImagen[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProductos, setFilteredProductos] = useState<ProductoConImagen[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarProductos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProductosService.getProductos('', true);
      setProductos(data);
      setFilteredProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos al montar
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Filtrar productos al buscar
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter(p => 
        p.NOMBRE.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.CODIGO.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
  }, [searchQuery, productos]);

  return (
    <SafeAreaProvider className="flex-1 bg-white dark:bg-black ">
      <ScrollView>
        <SafeAreaView className="flex-1 mx-1 mt-1">

          <ThemedView className="flex-row mt-5 items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3 border border-gray-300 dark:border-gray-700">
            <Feather name="search" size={24} color="#6b7280" />
            <TextInput
              placeholder="Buscar productos..."
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
                <ThemedText className="mt-4 text-gray-500">Cargando productos...</ThemedText>
              </ThemedView>
            ) : filteredProductos.length === 0 ? (
              <ThemedView className="items-center justify-center py-10">
                <ThemedText className="text-gray-500">
                  {searchQuery ? 'No se encontraron productos' : 'No hay productos registrados'}
                </ThemedText>
              </ThemedView>
            ) : (
              filteredProductos.map((producto) => (
                <CardProducto
                  key={producto.ID_PRODUCTO}
                  id={producto.ID_PRODUCTO}
                  codigo={producto.CODIGO}
                  nombre={producto.NOMBRE}
                  tipoProducto={producto.TIPO_PRODUCTO}
                  estado={producto.ESTADO}
                  imageUrl={producto.imagenUrl}
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

      <ModalProducto
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          cargarProductos(); // Recargar lista después de crear
        }}
      />
    </SafeAreaProvider>
  );
}
