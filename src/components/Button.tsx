import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing, typography } from '../constants';

type Variant = 'primary' | 'outline' | 'danger' | 'wifi';

interface Props {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  small?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  small,
  style,
}: Props) {
  const isOutline = variant === 'outline';
  const bg =
    variant === 'primary'
      ? colors.accentBLE
      : variant === 'danger'
      ? colors.danger
      : variant === 'wifi'
      ? colors.accentWifi
      : 'transparent';
  const borderColor =
    variant === 'outline' ? colors.accentBLE : 'transparent';
  const textColor = isOutline ? colors.accentBLE : colors.background;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        small && styles.small,
        {
          backgroundColor: bg,
          borderColor,
          borderWidth: isOutline ? 1 : 0,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            typography.body,
            small && { fontSize: 13 },
            { color: textColor, fontWeight: '700' },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
});
