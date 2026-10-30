/**
 * OFFLINE — Color Tokens
 * Teal  = anything happening over BLE (chat, games, discovery)
 * Blue  = anything happening over WiFi Direct (calls)
 * Keep this split consistent everywhere — it's how the user learns
 * which "channel" is active without any technical explanation on screen.
 */
export const colors = {
  background: '#080808',
  surface: '#141414',
  surfaceElevated: '#1E1E1E',
  border: '#1E1E1E',

  accentBLE: '#00B4A6', // teal
  accentWifi: '#4A90D9', // muted blue
  danger: '#C0392B',

  textPrimary: '#F5F5F5',
  textSecondary: '#888888',
  textDisabled: '#4A4A4A',

  online: '#3DDC97',
  offlineDot: '#4A4A4A',
} as const;

export type ColorToken = keyof typeof colors;
