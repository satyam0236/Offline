import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';

interface Props {
  nickname: string;
  size?: number;
  online?: boolean;
  tone?: 'accent' | 'neutral';
}

/**
 * Deliberately letter-based, never a photo — matches the app's
 * privacy-first identity model (no profile pictures, ever).
 */
export default function Avatar({ nickname, size = 48, online, tone = 'accent' }: Props) {
  const initial = nickname.trim().charAt(0).toUpperCase() || '?';
  const bg = tone === 'accent' ? colors.accentBLE : colors.surfaceElevated;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
          },
        ]}
      >
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
      </View>
      {online !== undefined && (
        <View
          style={[
            styles.onlineDot,
            {
              backgroundColor: online ? colors.online : colors.offlineDot,
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: (size * 0.28) / 2,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: colors.background,
    fontWeight: '700',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.background,
  },
});
