import React from 'react';
import { Pressable, type PressableProps } from 'react-native';

export type ButtonProps = PressableProps & {
  className?: string;
  children: React.ReactNode;
};

export function Button({ className, children, ...props }: ButtonProps) {
  const baseClass = 'px-4 py-2 h-19 rounded-lg bg-blue-600 active:bg-blue-700 disabled:bg-blue-300';
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <Pressable className={combinedClass} {...props}>
      {children}
    </Pressable>
  );
}
