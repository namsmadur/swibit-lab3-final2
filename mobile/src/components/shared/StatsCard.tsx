import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  count: number;
  label: string;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  count,
  label,
  color = '#7c3aed',
}) => (
  <View style={[styles.container, { backgroundColor: `${color}15` }]}>
    <Text style={[styles.count, { color }]}>{count}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start' },
  count: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  label: { fontSize: 12, color: '#6b7280' },
});
