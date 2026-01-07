import React from "react";
import { View, Text, Modal, Pressable, ScrollView, Image } from "react-native";
import ThemeInput from "../themecontex/ThemeInput";
import { ThemedText } from "../themecontex/themed-text";
import { Button } from "../nativewindui/Button";
import { Ionicons } from '@expo/vector-icons';

interface ModalInvenProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    stock: number;
    price: string;
    image: any;
}

const ModalDetalle = ({ isOpen, onClose, title, stock, price, image }: ModalInvenProps) => {
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
                                <Ionicons name="information-circle" size={24} color="#0891b2" />
                                <ThemedText type="title" className="text-cyan-600 dark:text-cyan-400">
                                    Detalle del Producto
                                </ThemedText>
                            </View>
                            <Pressable
                                onPress={onClose}
                                className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full items-center justify-center active:opacity-70"
                            >
                                <Ionicons name="close" size={24} color="#6b7280" />
                            </Pressable>
                        </View>

                        {/* Imagen del Producto */}
                        <View className="mb-4 items-center">
                            <View className="w-40 h-40 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl items-center justify-center border-4 border-cyan-200 dark:border-cyan-800 shadow-lg">
                                <Image
                                    source={image}
                                    className="w-32 h-32"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        {/* Product Name */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="pricetag" size={18} color="#0891b2" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Nombre del Producto
                                </ThemedText>
                            </View>
                            <View className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                <ThemedText className="text-gray-900 dark:text-gray-100">
                                    {title}
                                </ThemedText>
                            </View>
                        </View>

                        {/* Stock y Price en Grid */}
                        <View className="flex-row gap-3 mb-6">
                            {/* Stock */}
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Ionicons name="cube" size={18} color="#16a34a" />
                                    <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                        Stock Disponible
                                    </ThemedText>
                                </View>
                                <View className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 items-center">
                                    <ThemedText className="text-green-700 dark:text-green-300 text-2xl font-bold">
                                        {stock}
                                    </ThemedText>
                                    <ThemedText className="text-green-600 dark:text-green-400 text-xs mt-1">
                                        unidades
                                    </ThemedText>
                                </View>
                            </View>

                            {/* Price */}
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Ionicons name="cash" size={18} color="#d97706" />
                                    <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                        Precio de Venta
                                    </ThemedText>
                                </View>
                                <View className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 items-center">
                                    <ThemedText className="text-amber-700 dark:text-amber-300 text-2xl font-bold">
                                        {price}
                                    </ThemedText>
                                </View>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <Pressable
                                onPress={onClose}
                                className="flex-1 bg-gray-200 dark:bg-gray-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                <Ionicons name="close-circle" size={20} color="#6b7280" />
                                <ThemedText className="text-gray-700 dark:text-gray-300 font-semibold text-base">
                                    Cerrar
                                </ThemedText>
                            </Pressable>
                            <Pressable
                                onPress={() => {}}
                                className="flex-1 bg-blue-600 dark:bg-blue-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                <Ionicons name="create" size={20} color="white" />
                                <ThemedText className="text-white font-semibold text-base">
                                    Editar
                                </ThemedText>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ModalDetalle;