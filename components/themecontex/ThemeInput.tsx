import '../../global.css';
import React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { useColorScheme } from "nativewind";

export type ThemeInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export default function ThemeInput({
  lightColor,
  darkColor,
  keyboardType,
  value,
  onChangeText,
  className,
  ...props
}: ThemeInputProps) {

  const { colorScheme: currentTheme = "light" } = useColorScheme();

  const baseClass = currentTheme === 'dark'
    ? 'text-center text-white bg-gray-800 h-19 w-60 px-3 rounded-md border border-white'
    : 'text-center text-gray-900 bg-gray-200 h-19 w-60 px-3 rounded-md border border-gray-300';

  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  const placeholderTextColor = currentTheme === 'dark' ? '#9CA3AF' : '#6B7280';

  return (
    <TextInput
      className={combinedClass}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
}