import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

export default function ScreenContainer({ children, style, edges }: Props) {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={edges ?? ['top', 'bottom', 'left', 'right']}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
