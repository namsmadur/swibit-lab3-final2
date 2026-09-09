import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeStats = ({ total }) => (
  <View style={styles.container}>
    <Text style={styles.count}>{total}</Text>
    <Text style={styles.label}>Total Tasks</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  count: { fontSize: 18, fontWeight: '700', color: '#7c3aed', textAlign: 'center' },
  label: { fontSize: 12, color: '#6b7280' },
});
