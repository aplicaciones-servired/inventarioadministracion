import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, ScrollView, Image, Alert } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import ThemeInput from "../themecontex/ThemeInput";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { formatearNumero } from "../ui/Format";

interface ModalNuevoRegistroProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNuevoRegistro = ({ isOpen, onClose }: ModalNuevoRegistroProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [ventaProductos, setVentaProductos] = useState<string>('');
    const [ventaRaspas, setVentaRaspas] = useState<string>('');
    const [totalVentas, setTotalVentas] = useState<number>(0);
    const [ultimoContado, setUltimoContado] = useState<string>('');
    const [contadorFecha, setContadorFecha] = useState<string>('');
    const [raspasVendidos, setRaspasVendidos] = useState<string>('');
    const [raspasMaquina, setRaspasMaquina] = useState<string>('');
    const [raspasStock, setRaspasStock] = useState<string>('');
    const [compras, setCompras] = useState<string>('');
    const [observaciones, setObservaciones] = useState<string>('');


    // Limpiar imagen y campos cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
            setVentaProductos('');
            setVentaRaspas('');
        }
    }, [isOpen]);


    useEffect(() => {
        const productos = parseInt(ventaProductos.replace(/[^0-9]/g, '')) || 0;
        const raspas = parseInt(ventaRaspas.replace(/[^0-9]/g, '')) || 0;
        setTotalVentas(productos + raspas);
    }, [ventaProductos, ventaRaspas]);


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'Necesitamos permisos para acceder a tus fotos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'Necesitamos permisos para usar la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert(
            'Seleccionar imagen',
            '¿Cómo deseas agregar la imagen?',
            [
                {
                    text: 'Tomar foto',
                    onPress: takePhoto,
                },
                {
                    text: 'Elegir de galería',
                    onPress: pickImage,
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[94%]">
                    <ScrollView className="p-5">
                        {/* Header */}
                        <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <View className="flex-row items-center gap-2 flex-1">
                                <Ionicons name="add-circle" size={24} color="#0891b2" />
                                <ThemedText type="title" className="text-cyan-600 dark:text-cyan-400">
                                    Nuevo Registro Máquina
                                </ThemedText>
                            </View>
                            <Pressable
                                onPress={onClose}
                                className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full items-center justify-center active:opacity-70"
                            >
                                <Ionicons name="close" size={24} color="#6b7280" />
                            </Pressable>
                        </View>

                        {/* Ventas de Productos */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="cart" size={18} color="#16a34a" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Ventas de Productos
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="$0"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                keyboardType="numeric"
                                value={formatearNumero(ventaProductos)}
                                onChangeText={setVentaProductos}
                            />
                        </View>

                        {/* Ventas de Raspas */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="ticket" size={18} color="#3b82f6" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Ventas de Raspas
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="$0"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                keyboardType="numeric"
                                value={formatearNumero(ventaRaspas)}
                                onChangeText={setVentaRaspas}
                            />
                        </View>

                        {/* Total Calculado */}
                        <View className="mb-4 bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border-2 border-cyan-300 dark:border-cyan-700">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="cash" size={24} color="#0891b2" />
                                    <ThemedText type="defaultSemiBold" className="text-cyan-700 dark:text-cyan-300">
                                        Total Ventas
                                    </ThemedText>
                                </View>
                                <ThemedText className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
                                    ${totalVentas.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </ThemedText>
                            </View>
                        </View>

                        {/* Grid de campos */}
                        <View className="flex-row gap-3 mb-4">
                            {/* Último Contado */}
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Ionicons name="calculator" size={16} color="#0891b2" />
                                    <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300 text-sm">
                                        Último Contado
                                    </ThemedText>
                                </View>
                                <ThemeInput
                                    placeholder="0"
                                    className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                    keyboardType="numeric"
                                    value={formatearNumero(ultimoContado)}
                                    onChangeText={setUltimoContado}
                                />
                            </View>

                            {/* Contador Fecha */}
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Ionicons name="bar-chart" size={16} color="#0891b2" />
                                    <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300 text-sm">
                                        Contador Fecha
                                    </ThemedText>
                                </View>
                                <ThemeInput
                                    placeholder="0"
                                    className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                    keyboardType="numeric"
                                    value={formatearNumero(contadorFecha)}
                                    onChangeText={setContadorFecha}
                                />
                            </View>
                        </View>

                        {/* Inventario de Raspas */}
                        <View className="mb-4">
                            <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                                📊 Inventario de Raspas
                            </ThemedText>
                            <View className="flex-row gap-3 mb-3">
                                <View className="flex-1">
                                    <View className="flex-row items-center gap-1 mb-2">
                                        <Ionicons name="ticket" size={14} color="#9333ea" />
                                        <ThemedText className="text-xs text-gray-600 dark:text-gray-400">
                                            Vendidos
                                        </ThemedText>
                                    </View>
                                    <ThemeInput
                                        placeholder="0"
                                        className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                        keyboardType="numeric"
                                        value={formatearNumero(raspasVendidos)}
                                        onChangeText={setRaspasVendidos}
                                    />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row items-center gap-1 mb-2">
                                        <Ionicons name="hardware-chip" size={14} color="#f97316" />
                                        <ThemedText className="text-xs text-gray-600 dark:text-gray-400">
                                            En Máquina
                                        </ThemedText>
                                    </View>
                                    <ThemeInput
                                        placeholder="0"
                                        className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                        keyboardType="numeric"
                                        value={raspasMaquina}
                                        onChangeText={setRaspasMaquina}
                                    />
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row items-center gap-1 mb-2">
                                        <Ionicons name="albums" size={14} color="#6366f1" />
                                        <ThemedText className="text-xs text-gray-600 dark:text-gray-400">
                                            Stock
                                        </ThemedText>
                                    </View>
                                    <ThemeInput
                                        placeholder="0"
                                        className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                        keyboardType="numeric"
                                        value={raspasStock}
                                        onChangeText={setRaspasStock}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Compras */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="basket" size={18} color="#dc2626" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Compras
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="$0"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                keyboardType="numeric"
                                value={formatearNumero(compras)}
                                onChangeText={setCompras}
                            />
                        </View>

                        {/* Observaciones */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="document-text" size={18} color="#d97706" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Observaciones
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Notas adicionales..."
                                className="w-full h-24 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 bg-gray-50 dark:bg-gray-800"
                                multiline
                                textAlignVertical="top"
                                value={observaciones}
                                onChangeText={setObservaciones}
                            />
                        </View>

                        {/* Foto de Evidencia */}
                        <View className="mb-6">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="camera" size={18} color="#9333ea" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Foto de Evidencia (Opcional)
                                </ThemedText>
                            </View>

                            <Pressable
                                onPress={showImageOptions}
                                className="bg-purple-50 dark:bg-purple-900/20 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-4 items-center justify-center active:opacity-70"
                            >
                                {selectedImage ? (
                                    <View className="items-center">
                                        <Image
                                            source={{ uri: selectedImage }}
                                            className="w-full h-48 rounded-lg mb-2"
                                            resizeMode="cover"
                                        />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                                            Toca para cambiar foto
                                        </ThemedText>
                                    </View>
                                ) : (
                                    <View className="items-center py-4">
                                        <Ionicons name="camera-outline" size={48} color="#9333ea" />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 font-semibold mt-2">
                                            Agregar foto
                                        </ThemedText>
                                        <ThemedText className="text-purple-500 dark:text-purple-500 text-xs mt-1">
                                            Toca para tomar foto o elegir de galería
                                        </ThemedText>
                                    </View>
                                )}
                            </Pressable>
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <Pressable
                                onPress={onClose}
                                className="flex-1 bg-gray-200 dark:bg-gray-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                <Ionicons name="close-circle" size={20} color="#6b7280" />
                                <ThemedText className="text-gray-700 dark:text-gray-300 font-semibold text-base">
                                    Cancelar
                                </ThemedText>
                            </Pressable>
                            <Pressable
                                onPress={onClose}
                                className="flex-1 bg-cyan-600 dark:bg-cyan-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                <Ionicons name="checkmark-circle" size={20} color="white" />
                                <ThemedText className="text-white font-semibold text-base">
                                    Guardar
                                </ThemedText>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNuevoRegistro;
