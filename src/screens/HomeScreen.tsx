import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../components/Avatar';
import BottomNav from '../components/BottomNav';
import Card from '../components/Card';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';
import StatusDot from '../components/StatusDot';
import { colors, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

// Placeholder data — replace with real BLE scan results once the
// connectivity layer (Chapter 2 of the project docs) is wired in.
const NEARBY_USERS = [
  { id: '1', nickname: 'Rahul', online: true },
  { id: '2', nickname: 'Aisha', online: true },
  { id: '3', nickname: 'Vik', online: true },
];

export default function HomeScreen() {
  const { navigate } = useNavigation();

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name="menu" />
        </TouchableOpacity>
        <Text style={typography.brand}>OFFLINE</Text>
        <View style={styles.topStatus}>
          <Icon name="bluetooth" size={16} color={colors.accentBLE} />
          <Icon name="wifi" size={16} color={colors.accentWifi} style={styles.wifiIcon} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.statusCard}>
          <View style={styles.statusRow}>
            <StatusDot active color={colors.accentBLE} />
            <Text style={typography.body}>Bluetooth: Active</Text>
          </View>
          <View style={styles.statusRow}>
            <StatusDot active={false} color={colors.accentWifi} />
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              WiFi Direct: Idle
            </Text>
          </View>
          <View style={styles.statusRow}>
            <StatusDot active color={colors.accentBLE} />
            <Text style={typography.body}>
              Nearby: {NEARBY_USERS.length}
            </Text>
          </View>
        </Card>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard} onPress={() => navigate('Chat')}>
            <Text style={styles.gridGlyph}>✉</Text>
            <Text style={typography.h2}>Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => navigate('GamesLobby')}>
            <Text style={styles.gridGlyph}>▤</Text>
            <Text style={typography.h2}>Games</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} onPress={() => navigate('Call')}>
            <Text style={[styles.gridGlyph, { color: colors.accentWifi }]}>☎</Text>
            <Text style={typography.h2}>Calls</Text>
            <Text style={styles.wifiTag}>WiFi Direct</Text>
          </TouchableOpacity>
        </View>

        <SectionHeader title="Nearby" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {NEARBY_USERS.map(user => (
            <TouchableOpacity
              key={user.id}
              style={styles.nearbyItem}
              onPress={() => navigate('Chat', { nickname: user.nickname })}
            >
              <Avatar nickname={user.nickname} online={user.online} size={56} />
              <Text style={[typography.caption, { marginTop: spacing.xs }]}>
                {user.nickname}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <BottomNav active="Home" />
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
  topStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wifiIcon: {
    marginLeft: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  statusCard: {
    marginTop: spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs / 2,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  gridCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs / 2,
  },
  gridGlyph: {
    fontSize: 26,
    color: colors.accentBLE,
    marginBottom: spacing.xs,
  },
  wifiTag: {
    ...typography.caption,
    color: colors.accentWifi,
    marginTop: 2,
  },
  nearbyItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
});
