import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import ThemeInput from "../themecontex/ThemeInput";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaquinasService } from "@/services/MaquinasService";
import { ImagenesService } from "@/services/ImagenesService";

interface ModalNuevoRegistroProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalNuevoRegistro = ({ isOpen, onClose }: ModalNuevoRegistroProps) => {
    // Campos del modelo MD_MAQUINA
    const [codigo, setCodigo] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [estado, setEstado] = useState<'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO'>('ACTIVA');
    const [fechaCompra, setFechaCompra] = useState<string>('');
    const [fechaInicioOperacion, setFechaInicioOperacion] = useState<string>('');
    const [ubicacion, setUbicacion] = useState<string>('');
    const [observaciones, setObservaciones] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Limpiar campos cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setCodigo('');
            setNombre('');
            setEstado('ACTIVA');
            setFechaCompra('');
            setFechaInicioOperacion('');
            setUbicacion('');
            setObservaciones('');
            setSelectedImage(null);
        }
    }, [isOpen]);


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'Necesitamos permisos para acceder a tus fotos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
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

    const handleGuardar = async () => {
        // Validaciones
        if (!codigo || !nombre) {
            Alert.alert('Error', 'El código y nombre son obligatorios');
            return;
        }

        setLoading(true);
        try {
            // Crear máquina
            const result = await MaquinasService.crearMaquina(
                {
                    codigo,
                    nombre,
                    estado,
                    fechaCompra: fechaCompra || undefined,
                    fechaInicioOperacion: fechaInicioOperacion || undefined,
                    ubicacion: ubicacion || undefined,
                    observaciones: observaciones || undefined
                },
                ''
            );

            if (result.success && result.idMaquina) {
                // Si hay imagen, subirla
                if (selectedImage) {
                    try {
                        await ImagenesService.subirImagenDesdeUri(
                            selectedImage,
                            'ARQUEO',
                            result.idMaquina,
                            ''
                        );
                    } catch (error) {
                        console.error('Error al subir imagen:', error);
                        Alert.alert('Advertencia', 'Máquina creada pero hubo un error al subir la imagen');
                    }
                }

                Alert.alert('Éxito', 'Máquina registrada correctamente');
                onClose();
            } else {
                Alert.alert('Error', result.error || 'Error al crear máquina');
            }
        } catch (error: any) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Error al guardar máquina');
        } finally {
            setLoading(false);
        }
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
                                    Nueva Máquina
                                </ThemedText>
                            </View>
                            <Pressable
                                onPress={onClose}
                                className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full items-center justify-center active:opacity-70"
                            >
                                <Ionicons name="close" size={24} color="#6b7280" />
                            </Pressable>
                        </View>

                        {/* Código */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="barcode" size={18} color="#0891b2" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Código *
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: MAQ001"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={codigo}
                                onChangeText={setCodigo}
                            />
                        </View>

                        {/* Nombre */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="hardware-chip" size={18} color="#6366f1" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Nombre *
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: Máquina Dispensadora A"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>

                        {/* Estado */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Estado *
                                </ThemedText>
                            </View>
                            <View className="flex-row gap-2">
                                {(['ACTIVA', 'INACTIVA', 'MANTENIMIENTO'] as const).map((est) => (
                                    <Pressable
                                        key={est}
                                        onPress={() => setEstado(est)}
                                        className={`flex-1 py-3 rounded-lg border-2 ${estado === est ? 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                                    >
                                        <ThemedText className={`text-center font-semibold ${estado === est ? 'text-cyan-700 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {est}
                                        </ThemedText>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Ubicación */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="location" size={18} color="#8b5cf6" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Ubicación
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: Bodega Principal"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={ubicacion}
                                onChangeText={setUbicacion}
                            />
                        </View>

                        {/* Fecha Compra */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="calendar" size={18} color="#f59e0b" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Fecha de Compra (YYYY-MM-DD)
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="2026-01-13"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={fechaCompra}
                                onChangeText={setFechaCompra}
                            />
                        </View>

                        {/* Fecha Inicio Operación */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="calendar-outline" size={18} color="#06b6d4" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Fecha Inicio Operación (YYYY-MM-DD)
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="2026-01-13"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={fechaInicioOperacion}
                                onChangeText={setFechaInicioOperacion}
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
                                disabled={loading}
                                className="flex-1 bg-gray-200 dark:bg-gray-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                <Ionicons name="close-circle" size={20} color="#6b7280" />
                                <ThemedText className="text-gray-700 dark:text-gray-300 font-semibold text-base">
                                    Cancelar
                                </ThemedText>
                            </Pressable>
                            <Pressable
                                onPress={handleGuardar}
                                disabled={loading}
                                className="flex-1 bg-cyan-600 dark:bg-cyan-700 py-3.5 rounded-xl items-center active:opacity-80 flex-row justify-center gap-2"
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <>
                                        <Ionicons name="checkmark-circle" size={20} color="white" />
                                        <ThemedText className="text-white font-semibold text-base">
                                            Guardar
                                        </ThemedText>
                                    </>
                                )}
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNuevoRegistro;
