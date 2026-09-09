import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const AITypingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#7c3aed" />
    <Text style={styles.text}>AI is thinking...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'flex-start',
  },
  text: { marginLeft: 8, color: '#6b7280', fontSize: 14 },
});
