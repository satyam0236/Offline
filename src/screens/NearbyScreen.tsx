import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Icon from '../components/Icon';
import ScreenContainer from '../components/ScreenContainer';
import { colors, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

// Placeholder — swap for live BLE scan results later.
const DEVICES = [
  { id: '1', nickname: 'Rahul', distance: '4m', connected: true, inCall: false },
  { id: '2', nickname: 'Aisha', distance: '11m', connected: true, inCall: true },
  { id: '3', nickname: 'Vik', distance: '18m', connected: false, inCall: false },
  { id: '4', nickname: 'Priya', distance: '~25m', connected: false, inCall: false },
];

function RadarRing({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 2600,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  const opacity = anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.7, 0.2, 0] });

  return (
    <Animated.View
      style={[styles.ring, { transform: [{ scale }], opacity }]}
    />
  );
}

export default function NearbyScreen() {
  const { goBack, navigate } = useNavigation();

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="back" />
        </TouchableOpacity>
        <Text style={typography.h1}>Nearby</Text>
        <TouchableOpacity>
          <Icon name="scan" color={colors.accentBLE} />
        </TouchableOpacity>
      </View>

      <View style={styles.radarWrap}>
        <RadarRing delay={0} />
        <RadarRing delay={900} />
        <RadarRing delay={1800} />
        <View style={styles.radarCenter}>
          <Text style={styles.radarCenterGlyph}>◈</Text>
        </View>
      </View>

      <FlatList
        data={DEVICES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Avatar nickname={item.nickname} online={item.connected} size={44} />
            <View style={styles.rowText}>
              <View style={styles.nameRow}>
                <Text style={typography.body}>{item.nickname}</Text>
                {item.inCall && (
                  <Icon name="wifi" size={12} color={colors.accentWifi} style={styles.callIcon} />
                )}
              </View>
              <Text style={typography.caption}>{item.distance} away</Text>
            </View>
            {item.connected ? (
              <TouchableOpacity onPress={() => navigate('Chat', { nickname: item.nickname })}>
                <Text style={[typography.caption, { color: colors.accentBLE }]}>Open Chat</Text>
              </TouchableOpacity>
            ) : (
              <Button label="Connect" variant="outline" small onPress={() => {}} />
            )}
          </View>
        )}
      />

      <Text style={styles.footerNote}>
        Only OFFLINE users appear here. Distance is estimated from signal
        strength, not GPS.
      </Text>
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
  radarWrap: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: colors.accentBLE,
  },
  radarCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarCenterGlyph: {
    color: colors.accentBLE,
    fontSize: 18,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  rowText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callIcon: {
    marginLeft: spacing.xs,
  },
  footerNote: {
    ...typography.caption,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
