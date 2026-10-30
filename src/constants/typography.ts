import { Platform, TextStyle } from 'react-native';
import { colors } from './colors';

// Monospace font family per platform. Swap 'monospace' for a custom
// bundled font later (e.g. 'JetBrainsMono-Regular') if you want more
// control than the OS default.
export const fontFamily = Platform.select({
  android: 'monospace',
  ios: 'Courier',
  default: 'monospace',
});

export const typography: Record<string, TextStyle> = {
  brand: {
    fontFamily,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 4,
    color: colors.textPrimary,
  },
  h1: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h2: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontFamily,
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  label: {
    fontFamily,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.accentBLE,
  },
};
