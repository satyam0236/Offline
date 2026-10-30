import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../constants';

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={typography.label}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});
