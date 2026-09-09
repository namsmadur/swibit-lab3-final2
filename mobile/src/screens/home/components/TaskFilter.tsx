import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const TaskFilter = ({ filter, onFilterChange, onRefresh }) => (
  <View style={styles.container}>
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder="🔍 Filter by status"
        value={filter}
        onChangeText={onFilterChange}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
    </View>
    <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
      <Text style={styles.refreshText}>⟳</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  inputWrapper: { flex: 1, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, backgroundColor: '#fff', paddingHorizontal: 12 },
  input: { paddingVertical: 9, fontSize: 14, color: '#1f2937' },
  refreshButton: { backgroundColor: '#7c3aed', paddingVertical: 9, paddingHorizontal: 14, borderRadius: 12 },
  refreshText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
