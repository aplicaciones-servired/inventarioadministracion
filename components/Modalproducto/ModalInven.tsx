import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, ScrollView, Image, Alert } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import ThemeInput from "../themecontex/ThemeInput";
import { Button } from "../nativewindui/Button";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


interface ModalInvenProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalInven = ({ isOpen, onClose }: ModalInvenProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Limpiar imagen cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
        }
    }, [isOpen]);

    const pickImage = async () => {
        // Solicitar permisos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'Necesitamos permisos para acceder a tus fotos');
            return;
        }

        // Abrir selector de imágenes
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
                <View className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[90%]">
                    <ScrollView className="p-5">
                        {/* Header */}
                        <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <View className="flex-row items-center gap-2 flex-1">
                                <Ionicons name="add-circle" size={24} color="#0891b2" />
                                <ThemedText type="title" className="text-cyan-600 dark:text-cyan-400">
                                    Nuevo Producto
                                </ThemedText>
                            </View>
                            <Pressable
                                onPress={onClose}
                                className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full items-center justify-center active:opacity-70"
                            >
                                <Ionicons name="close" size={24} color="#6b7280" />
                            </Pressable>
                        </View>

                        {/* Product Name */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="pricetag" size={18} color="#0891b2" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Nombre del Producto
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: Coca Cola 500ml"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                            />
                        </View>

                        {/* Stock */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="cube" size={18} color="#16a34a" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Stock Disponible
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="0"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Price */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="cash" size={18} color="#d97706" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Precio de Venta
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="$0.00"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Selector de Imagen */}
                        <View className="mb-6">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="image" size={18} color="#9333ea" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Imagen del Producto
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
                                            className="w-32 h-32 rounded-lg mb-2"
                                            resizeMode="cover"
                                        />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                                            Toca para cambiar imagen
                                        </ThemedText>
                                    </View>
                                ) : (
                                    <View className="items-center py-4">
                                        <Ionicons name="camera-outline" size={48} color="#9333ea" />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 font-semibold mt-2">
                                            Agregar imagen
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

export default ModalInven;