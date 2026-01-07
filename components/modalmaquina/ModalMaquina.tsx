import React from "react";
import { View, Modal, Pressable, ScrollView } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    visible: boolean;
    onClose: () => void;
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
};

export default function ModalMaquina({
    visible,
    onClose,
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
}: Props) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[94%]">
                    <ScrollView className="p-5">
                        {/* Header */}
                        <View className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <View className="flex-row items-center justify-between mb-1">
                                <View className="flex-row items-center gap-2">
                                    <ThemedText className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        Máquina Dispensadora - Detalle Completo
                                    </ThemedText>
                                </View>
                                <Pressable
                                    onPress={onClose}
                                    className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full items-center justify-center active:opacity-70"
                                >
                                    <Ionicons name="close" size={20} color="#6b7280" />
                                </Pressable>
                            </View>
                            <View className="flex-row items-center gap-2 mt-2">
                                <Ionicons name="calendar" size={18} color="#0891b2" />
                                <ThemedText type="title" className="text-cyan-600 dark:text-cyan-400 flex-1">
                                    {fecha.toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </ThemedText>
                            </View>
                        </View>

                        {/* Ventas Section */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-3">
                                <Ionicons name="cart" size={16} color="#16a34a" />
                                <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                    Ventas
                                </ThemedText>
                            </View>
                            <View className="flex-row flex-wrap gap-3">
                                <View className="bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
                                    <ThemedText className="text-xs text-green-600 dark:text-green-400 mb-1">
                                        Productos Vendidos
                                    </ThemedText>
                                    <ThemedText className="text-2xl font-bold text-green-700 dark:text-green-300">
                                        {v_productos.toLocaleString()}
                                    </ThemedText>
                                </View>
                                <View className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
                                    <ThemedText className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                                        Raspas Vendidas
                                    </ThemedText>
                                    <ThemedText className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                        {v_raspas.toLocaleString()}
                                    </ThemedText>
                                </View>
                                <View className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg flex-1 min-w-[45%]">
                                    <ThemedText className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                                        Total
                                    </ThemedText>
                                    <ThemedText className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                        <Ionicons name="cash" size={20} color="#0e7490" />
                                        ${total.toLocaleString()}
                                    </ThemedText>
                                </View>
                            </View>
                        </View>

                        {/* Inventario de Raspas */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-3">
                                <Ionicons name="ticket" size={16} color="#9333ea" />
                                <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                    Inventario Raspas
                                </ThemedText>
                            </View>
                            <View className="flex-row flex-wrap gap-2">
                                <View className="bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
                                    <ThemedText className="text-xs text-purple-600 dark:text-purple-400 mb-1">
                                        Raspas Vendidas
                                    </ThemedText>
                                    <ThemedText className="text-xl font-bold text-purple-700 dark:text-purple-300">
                                        {raspas_vendidos}
                                    </ThemedText>
                                </View>
                                <View className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-lg">
                                    <ThemedText className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                                        En Máquina
                                    </ThemedText>
                                    <ThemedText className="text-xl font-bold text-orange-700 dark:text-orange-300">
                                        {raspa_maquina}
                                    </ThemedText>
                                </View>
                                <View className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
                                    <ThemedText className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">
                                        En Stock
                                    </ThemedText>
                                    <ThemedText className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                                        {raspas_stock}
                                    </ThemedText>
                                </View>
                            </View>
                        </View>

                        {/* Información del Contador */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-3">
                                <Ionicons name="bar-chart" size={16} color="#0891b2" />
                                <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                    Información del Contador
                                </ThemedText>
                            </View>
                            <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <View className="flex-row justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                                    <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
                                        Último Contado
                                    </ThemedText>
                                    <ThemedText className="text-lg font-bold">
                                        {ultimo_contados.toLocaleString()}
                                    </ThemedText>
                                </View>
                                <View className="flex-row justify-between">
                                    <ThemedText className="text-sm text-gray-600 dark:text-gray-400">
                                        Contador Fecha
                                    </ThemedText>
                                    <ThemedText className="text-lg font-bold">
                                        {calor_contador_fecha.toLocaleString()}
                                    </ThemedText>
                                </View>
                            </View>
                        </View>

                        {/* Compras */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-3">
                                <Ionicons name="basket" size={16} color="#dc2626" />
                                <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                    Compras
                                </ThemedText>
                            </View>
                            <View className="bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
                                <ThemedText className="text-xs text-red-600 dark:text-red-400 mb-1">
                                    Total Compras
                                </ThemedText>
                                <ThemedText className="text-2xl font-bold text-red-700 dark:text-red-300">
                                    ${compras.toLocaleString()}
                                </ThemedText>
                            </View>
                        </View>

                        {/* Observaciones */}
                        {observaciones && (
                            <View className="mb-4">
                                <View className="flex-row items-center gap-2 mb-3">
                                    <Ionicons name="document-text" size={16} color="#d97706" />
                                    <ThemedText className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                        Observaciones
                                    </ThemedText>
                                </View>
                                <View className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400">
                                    <ThemedText className="text-base text-amber-900 dark:text-amber-200">
                                        {observaciones}
                                    </ThemedText>
                                </View>
                            </View>
                        )}

                        {/* Botón Cerrar */}
                        <Pressable
                            onPress={onClose}
                            className="bg-cyan-600 dark:bg-cyan-700 py-4 rounded-xl items-center active:opacity-80 mt-2 flex-row justify-center gap-2"
                        >
                            <Ionicons name="checkmark-circle" size={20} color="white" />
                            <ThemedText className="text-white font-bold text-base">
                                Cerrar
                            </ThemedText>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
