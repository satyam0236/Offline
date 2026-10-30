import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../constants';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export default function Card({ children, style, elevated }: Props) {
  return (
    <View
      style={[
        styles.card,
        elevated && { backgroundColor: colors.surfaceElevated },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
  },
});
