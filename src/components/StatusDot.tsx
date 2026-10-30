import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants';

interface Props {
  active: boolean;
  color?: string;
  size?: number;
}

/** Small filled dot — active uses the given color, inactive is always grey. */
export default function StatusDot({ active, color = colors.accentBLE, size = 8 }: Props) {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: active ? color : colors.offlineDot,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    marginRight: 6,
  },
});
