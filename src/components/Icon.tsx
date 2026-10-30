import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../constants';

/**
 * Placeholder icon system using plain Unicode glyphs so the app runs
 * immediately without adding react-native-vector-icons (or an SVG set)
 * as a dependency yet. Swap `GLYPHS` values for a proper icon font or
 * custom SVG set later — every call site stays the same (<Icon name="back" />).
 */
const GLYPHS: Record<string, string> = {
  back: '←',
  menu: '☰',
  scan: '⟳',
  refresh: '⟳',
  gear: '⚙',
  lock: '⛁',
  send: '➤',
  attach: '＋',
  mic: '●',
  micOff: '⊘',
  speaker: '◔',
  phoneDown: '☎',
  info: 'ℹ',
  bluetooth: '◈',
  wifi: '◉',
  trash: '⌫',
  warning: '⚠',
};

interface Props {
  name: keyof typeof GLYPHS;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export default function Icon({ name, size = 18, color = colors.textPrimary, style }: Props) {
  return (
    <Text style={[styles.glyph, { fontSize: size, color }, style]}>
      {GLYPHS[name] ?? '?'}
    </Text>
  );
}

const styles = StyleSheet.create({
  glyph: {
    textAlign: 'center',
  },
});
