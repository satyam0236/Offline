import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import { colors, spacing, typography } from '../constants';
import { useNavigation } from '../navigation/NavigationContext';

const ONBOARDING_KEY = '@offline/onboarding_complete';
const { width } = Dimensions.get('window');

interface Slide {
  glyph: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    glyph: '◈',
    title: 'Fully Offline',
    subtitle: 'No internet. No servers. No one watching.',
  },
  {
    glyph: '⛁',
    title: 'Encrypted by Default',
    subtitle: 'Every message and call encrypted, device to device.',
  },
  {
    glyph: '⇄',
    title: 'Two Ways to Connect',
    subtitle: 'Bluetooth for chat and games. WiFi Direct for calls. Both fully offline.',
  },
];

export default function OnboardingScreen() {
  const { replace } = useNavigation();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const finish = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } finally {
      replace('Home');
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== index) setIndex(newIndex);
  };

  const isLast = index === SLIDES.length - 1;

  return (
    <ScreenContainer>
      <TouchableOpacity style={styles.skip} onPress={finish}>
        <Text style={typography.caption}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <Text style={styles.glyph}>{item.glyph}</Text>
            </View>
            <Text style={[typography.h1, styles.title]}>{item.title}</Text>
            <Text style={[typography.body, styles.subtitle]}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && { backgroundColor: colors.accentBLE, width: 18 },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        {isLast ? (
          <Button label="Get Started" onPress={finish} />
        ) : (
          <Button
            label="Next"
            variant="outline"
            onPress={() => listRef.current?.scrollToIndex({ index: index + 1 })}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  skip: {
    alignSelf: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.accentBLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  glyph: {
    fontSize: 40,
    color: colors.accentBLE,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceElevated,
    marginHorizontal: 4,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
