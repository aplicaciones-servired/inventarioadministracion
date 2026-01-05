import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { colorScheme, useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

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
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const scheme = colorScheme.get();
    setCurrentTheme(scheme === "dark" ? "dark" : "light");
  }, []);

  // Determina el color basado en el tema actual
  const color = currentTheme === 'dark' ? darkColor : lightColor;

  return (
    <Text
      style={[
        color ? { color } : undefined, // Aplica el color del tema
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style, // Los estilos personalizados tienen prioridad
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
