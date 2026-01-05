import React, { useEffect } from 'react';
import { Text, Animated } from 'react-native';

type ToastType = 'success' | 'error' | 'info';

export type ToastProps = {
  message: string;
  type: ToastType;
  visible: boolean;
  onHide: () => void;
  duration?: number;
};

export function Toast({ message, type, visible, onHide, duration = 6000 }: ToastProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }
  }, [visible, duration, onHide, opacity]);

  if (!visible) return null;

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-600';
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'info':
        return 'bg-blue-500 border-blue-600';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <Animated.View
      style={{ opacity }}
      className={`mt-2 p-4 rounded-lg border-l-4 ${getColors()}`}
    >
      <Text className="text-white font-bold text-base">{message}</Text>
    </Animated.View>
  );
}
