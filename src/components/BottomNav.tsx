import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../constants';
import { ScreenName, useNavigation } from '../navigation/NavigationContext';

interface TabDef {
  key: ScreenName;
  label: string;
  glyph: string;
}

const TABS: TabDef[] = [
  { key: 'Home', label: 'Home', glyph: '⌂' },
  { key: 'Nearby', label: 'Nearby', glyph: '◈' },
  { key: 'GamesLobby', label: 'Games', glyph: '▤' },
  { key: 'Settings', label: 'Settings', glyph: '⚙' },
];

interface Props {
  active: ScreenName;
}

export default function BottomNav({ active }: Props) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.bar}>
      {TABS.map(tab => {
        const isActive = tab.key === active;
        const color = isActive ? colors.accentBLE : colors.textSecondary;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => navigate(tab.key)}
          >
            <Text style={[styles.glyph, { color }]}>{tab.glyph}</Text>
            <Text style={[typography.caption, { color, marginTop: 2 }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 20,
  },
});
