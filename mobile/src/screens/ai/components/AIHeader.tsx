import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AIHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>✨ AI Assistant</Text>
    <Text style={styles.subtitle}>Ask me about your tasks and projects</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#7c3aed',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 13, color: '#e0d7ff', marginTop: 4 },
});
