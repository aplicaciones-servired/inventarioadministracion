import { Text, type TextProps } from 'react-native';

import { useColorScheme } from 'nativewind';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { colorScheme: currentScheme } = useColorScheme();

  // Determina el color basado en el tema actual
  const color = currentScheme === 'dark' ? darkColor : lightColor;

  // Determina las clases de NativeWind según el tipo
  const getTypeClasses = () => {
    const baseColorClass = !lightColor && !darkColor ? 'text-black dark:text-white' : '';
    
    switch (type) {
      case 'title':
        return `text-2xl font-bold leading-8 ${baseColorClass}`;
      case 'defaultSemiBold':
        return `text-base leading-6 font-semibold ${baseColorClass}`;
      case 'subtitle':
        return `text-xl font-bold ${baseColorClass}`;
      case 'link':
        return 'text-base leading-[30px] text-[#0a7ea4] dark:text-[#58bfe8]';
      case 'default':
      default:
        return `text-base leading-6 ${baseColorClass}`;
    }
  };

  return (
    <Text
      className={getTypeClasses()}
      style={[
        color ? { color } : undefined, // Aplica el color del tema
        style, // Los estilos personalizados tienen prioridad
      ]}
      {...rest}
    />
  );
}
