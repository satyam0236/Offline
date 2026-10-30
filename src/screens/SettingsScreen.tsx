import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';
import { colors, spacing, typography } from '../constants';

const GHOST_MODE_KEY = '@offline/ghost_mode';
const AUTO_DELETE_KEY = '@offline/auto_delete';

const AUTO_DELETE_OPTIONS = ['1hr', '24hr', '7 days', 'Never'] as const;

function Row({
  label,
  subtext,
  right,
}: {
  label: string;
  subtext?: string;
  right: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={typography.body}>{label}</Text>
        {!!subtext && <Text style={styles.subtext}>{subtext}</Text>}
      </View>
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const [ghostMode, setGhostMode] = useState(false);
  const [autoDeleteIndex, setAutoDeleteIndex] = useState(3); // 'Never' default

  useEffect(() => {
    (async () => {
      const storedGhost = await AsyncStorage.getItem(GHOST_MODE_KEY);
      const storedDelete = await AsyncStorage.getItem(AUTO_DELETE_KEY);
      if (storedGhost != null) setGhostMode(storedGhost === 'true');
      if (storedDelete != null) setAutoDeleteIndex(Number(storedDelete));
    })();
  }, []);

  const toggleGhost = async (value: boolean) => {
    setGhostMode(value);
    await AsyncStorage.setItem(GHOST_MODE_KEY, String(value));
  };

  const cycleAutoDelete = async () => {
    const next = (autoDeleteIndex + 1) % AUTO_DELETE_OPTIONS.length;
    setAutoDeleteIndex(next);
    await AsyncStorage.setItem(AUTO_DELETE_KEY, String(next));
  };

  const confirmWipe = () => {
    Alert.alert('Wipe All Messages', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Wipe', style: 'destructive', onPress: () => {} },
    ]);
  };

  const confirmReset = () => {
    Alert.alert('Reset OFFLINE', 'This will create a new identity and erase everything. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <ScreenContainer>
      <Text style={[typography.h1, styles.title]}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionHeader title="Identity" />
        <Row label="Your Nickname" subtext="Tap to edit" right={<Icon name="info" size={14} color={colors.textSecondary} />} />
        <TouchableOpacity onPress={() => {}}>
          <Row
            label="Regenerate Identity"
            subtext="Creates a new device identity instantly"
            right={<Icon name="refresh" size={16} color={colors.accentBLE} />}
          />
        </TouchableOpacity>

        <SectionHeader title="Privacy" />
        <Row
          label="Encryption"
          subtext="Always on. Cannot be disabled."
          right={<Icon name="lock" size={16} color={colors.accentBLE} />}
        />
        <TouchableOpacity onPress={cycleAutoDelete}>
          <Row
            label="Auto-Delete Messages"
            subtext={AUTO_DELETE_OPTIONS[autoDeleteIndex]}
            right={<Icon name="info" size={14} color={colors.textSecondary} />}
          />
        </TouchableOpacity>
        <Row
          label="Ghost Mode"
          subtext="Stop appearing in nearby scans"
          right={
            <Switch
              value={ghostMode}
              onValueChange={toggleGhost}
              trackColor={{ false: colors.surfaceElevated, true: colors.accentBLE }}
              thumbColor={colors.textPrimary}
            />
          }
        />

        <SectionHeader title="Connectivity" />
        <Row
          label="Bluetooth"
          right={<View style={[styles.liveDot, { backgroundColor: colors.accentBLE }]} />}
        />
        <Row
          label="WiFi Direct"
          subtext="Used only during calls"
          right={<View style={[styles.liveDot, { backgroundColor: colors.accentWifi }]} />}
        />
        <Row label="Signal Reach" subtext="Medium" right={<Icon name="info" size={14} color={colors.textSecondary} />} />

        <Text style={styles.dangerHeader}>DANGER ZONE</Text>
        <TouchableOpacity onPress={confirmWipe}>
          <Row
            label="Wipe All Messages"
            right={<Icon name="trash" size={16} color={colors.danger} />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmReset}>
          <Row
            label="Reset OFFLINE"
            subtext="Cannot be undone"
            right={<Icon name="warning" size={16} color={colors.danger} />}
          />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>OFFLINE v1.0.0</Text>
          <Text style={styles.promise}>Nothing leaves your device. Ever.</Text>
        </View>
      </ScrollView>

      <BottomNav active="Settings" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  rowText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  subtext: {
    ...typography.caption,
    marginTop: 2,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dangerHeader: {
    ...typography.label,
    color: colors.danger,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  version: {
    ...typography.caption,
  },
  promise: {
    ...typography.caption,
    fontStyle: 'italic',
    marginTop: 2,
  },
});
