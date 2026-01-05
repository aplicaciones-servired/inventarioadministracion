import React from 'react';
import { Text as RNText, type TextProps } from 'react-native';

export type NativeTextProps = TextProps & {
  className?: string;
  children: React.ReactNode;
};

export function Text({ className, children, ...props }: NativeTextProps) {
  const baseClass = 'text-gray-900 dark:text-white';
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <RNText className={combinedClass} {...props}>
      {children}
    </RNText>
  );
}
