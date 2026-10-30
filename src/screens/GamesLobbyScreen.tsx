import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import ScreenContainer from '../components/ScreenContainer';
import { colors, radius, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

interface GameDef {
  key: string;
  glyph: string;
  name: string;
  tag: string;
  locked?: boolean;
}

const GAMES: GameDef[] = [
  { key: 'ttt', glyph: '⌗', name: 'Tic Tac Toe', tag: '2 Players' },
  { key: 'snake', glyph: '⌇', name: 'Snake', tag: 'Solo' },
  { key: 'saap', glyph: '⚄', name: 'Saap Seedhi', tag: '2-4 Players' },
  { key: 'soon', glyph: '⛁', name: 'Coming Soon', tag: '', locked: true },
];

export default function GamesLobbyScreen() {
  const { goBack } = useNavigation();

  const openGame = (game: GameDef) => {
    if (game.locked) return;
    // Actual game screens (Tic Tac Toe board, Snake engine, Saap Seedhi
    // board) are separate screens for the next batch — this lobby only
    // needs to route to them once built.
    Alert.alert(game.name, 'Game screen not built yet — this is the lobby only.');
  };

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Text style={typography.body}>←</Text>
        </TouchableOpacity>
        <Text style={typography.h1}>Games</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2 Nearby</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Play with people nearby. Zero internet, zero servers.
      </Text>

      <View style={styles.grid}>
        {GAMES.map(game => (
          <TouchableOpacity
            key={game.key}
            style={[styles.card, game.locked && styles.cardLocked]}
            onPress={() => openGame(game)}
            disabled={game.locked}
          >
            <Text style={[styles.glyph, game.locked && { color: colors.textDisabled }]}>
              {game.locked ? '⛁' : game.glyph}
            </Text>
            <Text style={[typography.h2, game.locked && { color: colors.textSecondary }]}>
              {game.name}
            </Text>
            {!!game.tag && (
              <Text style={styles.tag}>{game.tag}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerNote}>
        More games coming. All played over Bluetooth.
      </Text>

      <BottomNav active="GamesLobby" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.accentBLE,
    fontSize: 11,
    fontFamily: typography.caption.fontFamily,
  },
  subtitle: {
    ...typography.caption,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md - spacing.xs,
  },
  card: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    margin: spacing.xs,
  },
  cardLocked: {
    opacity: 0.5,
  },
  glyph: {
    fontSize: 32,
    color: colors.accentBLE,
    marginBottom: spacing.sm,
  },
  tag: {
    ...typography.caption,
    color: colors.accentBLE,
    marginTop: 4,
  },
  footerNote: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
