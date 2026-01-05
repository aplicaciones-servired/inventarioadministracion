import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import ModalDetalle from "./ModalDetalle";

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
          <Text className="text-base font-semibold text-gray-900">
            {title}
          </Text>

          <Text className="text-xs text-gray-500 mt-0.5">
            {stock} in Stock
          </Text>
        </View>

        {/* Precio */}
        <Text className="text-base font-semibold text-gray-900">
          {price}
        </Text>
      </Pressable>
      <ModalDetalle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
  );
}
