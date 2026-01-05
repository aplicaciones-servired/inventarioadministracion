import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import ThemeInput from "./themecontex/ThemeInput";
import { ThemedText } from "./themecontex/themed-text";
import { Button } from "./nativewindui/Button";
import Entypo from '@expo/vector-icons/Entypo';

interface ModalInvenProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalDetalle = ({ isOpen, onClose }: ModalInvenProps) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-black/50">
                <View className="w-11/12 bg-white rounded-md shadow-md p-6">
                    <View className="flex-row items-center justify-between border-b pb-4">
                        <Text className="text-xl font-semibold text-center">Informacion producto</Text>
                        <Pressable onPress={onClose}>
                            <Entypo name="cross" size={30} color="black" />
                        </Pressable>
                    </View>

                    <View className="flex items-center text-center my-4 space-y-4">
                        <ThemedText className="" type="defaultSemiBold">
                            Product Name
                        </ThemedText>
                        <ThemeInput
                            placeholder="Product Name"
                            className="w-80 h-14 border border-gray-300 rounded-md p-2"
                        />

                        <ThemedText className="mt-2" type="defaultSemiBold">
                            Stock
                        </ThemedText>
                        <ThemeInput
                            placeholder="Stock"
                            className="w-80 h-14 border border-gray-300 rounded-md p-2"
                            keyboardType="numeric"
                        />
                        <ThemedText className="mt-2" type="defaultSemiBold">
                            Price
                        </ThemedText>
                        <ThemeInput
                            placeholder="Price"
                            className="w-80 h-14 border border-gray-300 rounded-md p-2"
                            keyboardType="numeric"
                        />
                        <ThemedText className="mt-2" type="defaultSemiBold">
                            Image URL
                        </ThemedText>
                        <ThemeInput
                            placeholder="Image URL"
                            className="w-80 h-14 border border-gray-300 rounded-md p-2"
                        />

                    </View>

                    <View className="flex-row justify-center border-t pt-4 text-center ">
                        <Button
                            onPress={onClose}
                            className="bg-blue-600 py-2 px-4 rounded-md"
                        >
                            <Text className="text-white text-base">Cerrar</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalDetalle;