import React from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import ThemeInput from "../themecontex/ThemeInput";
import { Button } from "../nativewindui/Button";
import { Ionicons } from '@expo/vector-icons';


interface ModalInvenProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalInven = ({ isOpen, onClose }: ModalInvenProps) => {
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

                        {/* Image URL */}
                        <View className="mb-6">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="image" size={18} color="#9333ea" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    URL de Imagen
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="https://ejemplo.com/imagen.jpg"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                            />
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