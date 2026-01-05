import '../../global.css';
import { View, type ViewProps } from 'react-native';
import { useColorScheme } from "nativewind";
 
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { colorScheme: currentTheme = "light" } = useColorScheme();

  const className = currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';

  return <View className={className} style={style} {...otherProps} />;
}
