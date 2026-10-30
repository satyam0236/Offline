import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

const ONBOARDING_KEY = '@offline/onboarding_complete';

export default function SplashScreen() {
  const { replace } = useNavigation();
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [sweep]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const done = await AsyncStorage.getItem(ONBOARDING_KEY);
        replace(done === 'true' ? 'Home' : 'Onboarding');
      } catch {
        // If storage read fails for any reason, don't block the user.
        replace('Onboarding');
      }
    }, 1400);
    return () => clearTimeout(timer);
  }, [replace]);

  const rotate = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <View style={styles.hexagon}>
          <Text style={styles.hexGlyph}>◈</Text>
        </View>
      </View>
      <Text style={styles.brand}>OFFLINE</Text>
      <Text style={styles.tagline}>No Signal. No Trace.</Text>

      <View style={styles.radarWrap}>
        <View style={styles.radarRing} />
        <Animated.View
          style={[styles.radarSweep, { transform: [{ rotate }] }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    marginBottom: spacing.md,
  },
  hexagon: {
    width: 84,
    height: 84,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accentBLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexGlyph: {
    fontSize: 34,
    color: colors.accentBLE,
  },
  brand: {
    ...typography.brand,
    marginTop: spacing.sm,
  },
  tagline: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  radarWrap: {
    position: 'absolute',
    bottom: spacing.xxl,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  radarSweep: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderTopColor: colors.accentBLE,
    borderTopWidth: 2,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
});
