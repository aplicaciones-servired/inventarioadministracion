import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import ModalDetalle from "./Modalproducto/ModalDetalle";
import { ThemedText } from "./themecontex/themed-text";

type Props = {
  title: string;
  stock: number;
  price: string;
  image: any;
};

export default function InventoryCard({
  title,
  stock,
  price,
  image,
}: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View>
      <Pressable
        className="
        flex-row items-center
        bg-white
        rounded-2xl
        h-36
        p-3
        mb-4
        shadow shadow-cyan-500/50
        hover:shadow-md
      "
        style={{ elevation: 3 }}
        onPress={() => setIsModalOpen(true)}
      >
        {/* Imagen */}
        <View className="w-16 h-16 rounded-xl bg-gray-100 items-center justify-center overflow-hidden">
          <Image
            source={image}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>

        {/* Info */}
        <View className="flex-1 ml-3">
          <ThemedText className="text-base font-semibold text-gray-900">
            {title}
          </ThemedText>

          <ThemedText className="text-xs text-gray-500 mt-0.5">
            {stock} in Stock
          </ThemedText>
        </View>

        {/* Precio */}
        <ThemedText className="text-base font-semibold text-gray-900">
          {price}
        </ThemedText>
      </Pressable>
      <ModalDetalle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
  );
}
