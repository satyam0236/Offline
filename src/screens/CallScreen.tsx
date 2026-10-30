import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import { colors, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function CallScreen() {
  const { goBack, params } = useNavigation();
  const nickname = (params?.nickname as string) ?? 'Unknown';
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.channelLabel}>WiFi Direct • Encrypted Audio</Text>

      <View style={styles.center}>
        <View style={styles.avatarWrap}>
          <Animated.View
            style={[styles.pulseRing, { transform: [{ scale }], opacity }]}
          />
          <Avatar nickname={nickname} size={120} />
        </View>
        <Text style={[typography.h1, styles.name]}>{nickname}</Text>
        <Text style={styles.timer}>{formatDuration(seconds)}</Text>
        <Text style={styles.note}>Local connection only. No carrier. No internet.</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setMuted(m => !m)}
        >
          <Icon name={muted ? 'micOff' : 'mic'} color={colors.textPrimary} size={22} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endBtn} onPress={goBack}>
          <Icon name="phoneDown" color={colors.textPrimary} size={26} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setSpeaker(s => !s)}
        >
          <Icon
            name="speaker"
            color={speaker ? colors.accentWifi : colors.textPrimary}
            size={22}
          />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  channelLabel: {
    ...typography.caption,
    color: colors.accentWifi,
    marginTop: spacing.sm,
  },
  center: {
    alignItems: 'center',
  },
  avatarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  pulseRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.accentWifi,
  },
  name: {
    marginBottom: spacing.xs,
  },
  timer: {
    ...typography.body,
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  note: {
    ...typography.caption,
    fontStyle: 'italic',
    marginTop: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.lg,
  },
  endBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
