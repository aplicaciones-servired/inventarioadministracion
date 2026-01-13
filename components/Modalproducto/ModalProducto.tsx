import React, { useState, useEffect } from "react";
import { View, Modal, Pressable, ScrollView, Image, Alert, ActivityIndicator, Switch } from "react-native";
import { ThemedText } from "../themecontex/themed-text";
import ThemeInput from "../themecontex/ThemeInput";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ProductosService } from "@/services/ProductosService";
import { ImagenesService } from "@/services/ImagenesService";

interface ModalProductoProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalProducto = ({ isOpen, onClose }: ModalProductoProps) => {
    // Campos del modelo MD_PRODUCTOS
    const [codigo, setCodigo] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [tipoProducto, setTipoProducto] = useState<'ALIMENTO' | 'TANGIBLE'>('ALIMENTO');
    const [manejaVencimiento, setManejaVencimiento] = useState<boolean>(false);
    const [estado, setEstado] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Limpiar campos cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setCodigo('');
            setNombre('');
            setTipoProducto('ALIMENTO');
            setManejaVencimiento(false);
            setEstado(true);
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
            // Crear producto
            const result = await ProductosService.crearProducto(
                {
                    codigo,
                    nombre,
                    tipoProducto,
                    manejaVencimiento,
                    estado
                },
                ''
            );

            if (result.success && result.idProducto) {
                // Si hay imagen, subirla
                if (selectedImage) {
                    try {
                        await ImagenesService.subirImagenDesdeUri(
                            selectedImage,
                            'INVENTARIO',
                            result.idProducto,
                            ''
                        );
                    } catch (error) {
                        console.error('Error al subir imagen:', error);
                        Alert.alert('Advertencia', 'Producto creado pero hubo un error al subir la imagen');
                    }
                }

                Alert.alert('Éxito', 'Producto registrado correctamente');
                onClose();
            } else {
                Alert.alert('Error', result.error || 'Error al crear producto');
            }
        } catch (error: any) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Error al guardar producto');
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

                        {/* Código */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="barcode" size={18} color="#0891b2" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Código *
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: PROD001"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={codigo}
                                onChangeText={setCodigo}
                            />
                        </View>

                        {/* Nombre */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="pricetag" size={18} color="#6366f1" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Nombre *
                                </ThemedText>
                            </View>
                            <ThemeInput
                                placeholder="Ej: Coca-Cola 500ml"
                                className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-gray-800"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>

                        {/* Tipo de Producto */}
                        <View className="mb-4">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="albums" size={18} color="#16a34a" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Tipo de Producto *
                                </ThemedText>
                            </View>
                            <View className="flex-row gap-2">
                                {(['ALIMENTO', 'TANGIBLE'] as const).map((tipo) => (
                                    <Pressable
                                        key={tipo}
                                        onPress={() => setTipoProducto(tipo)}
                                        className={`flex-1 py-3 rounded-lg border-2 ${tipoProducto === tipo ? 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-600' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}
                                    >
                                        <ThemedText className={`text-center font-semibold ${tipoProducto === tipo ? 'text-cyan-700 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {tipo}
                                        </ThemedText>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Maneja Vencimiento */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
                                <View className="flex-row items-center gap-2 flex-1">
                                    <Ionicons name="calendar-sharp" size={18} color="#f59e0b" />
                                    <View>
                                        <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                            Maneja Vencimiento
                                        </ThemedText>
                                        <ThemedText className="text-xs text-gray-500 dark:text-gray-400">
                                            ¿El producto tiene fecha de vencimiento?
                                        </ThemedText>
                                    </View>
                                </View>
                                <Switch
                                    value={manejaVencimiento}
                                    onValueChange={setManejaVencimiento}
                                    trackColor={{ false: '#d1d5db', true: '#0891b2' }}
                                    thumbColor={manejaVencimiento ? '#ffffff' : '#f3f4f6'}
                                />
                            </View>
                        </View>

                        {/* Estado */}
                        <View className="mb-4">
                            <View className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
                                <View className="flex-row items-center gap-2 flex-1">
                                    <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
                                    <View>
                                        <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                            Producto Activo
                                        </ThemedText>
                                        <ThemedText className="text-xs text-gray-500 dark:text-gray-400">
                                            {estado ? 'Disponible para uso' : 'Desactivado'}
                                        </ThemedText>
                                    </View>
                                </View>
                                <Switch
                                    value={estado}
                                    onValueChange={setEstado}
                                    trackColor={{ false: '#d1d5db', true: '#16a34a' }}
                                    thumbColor={estado ? '#ffffff' : '#f3f4f6'}
                                />
                            </View>
                        </View>

                        {/* Foto del Producto */}
                        <View className="mb-6">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Ionicons name="camera" size={18} color="#9333ea" />
                                <ThemedText type="defaultSemiBold" className="text-gray-700 dark:text-gray-300">
                                    Foto del Producto (Opcional)
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
                                        />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 font-medium">
                                            Toca para cambiar imagen
                                        </ThemedText>
                                    </View>
                                ) : (
                                    <View className="items-center">
                                        <Ionicons name="camera" size={48} color="#9333ea" />
                                        <ThemedText className="text-purple-600 dark:text-purple-400 font-medium mt-2">
                                            Toca para agregar imagen
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

export default ModalProducto;
