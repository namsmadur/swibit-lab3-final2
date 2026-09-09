import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>📋 Your Tasks</Text>
    <Text style={styles.subtitle}>Manage and track your progress</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#1f2937' },
  subtitle: { fontSize: 13, color: '#6b7280', marginTop: 2 },
});
