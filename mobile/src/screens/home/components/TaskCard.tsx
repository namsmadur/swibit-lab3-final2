import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TaskCard = ({ id, title, status, description, onEdit, onDelete }) => {
  const statusEmoji = status === 'pending' ? '⏳' : status === 'in_progress' ? '🔄' : '✅';
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>{statusEmoji} {status}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(id)}>
          <Text style={styles.editText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(id)}>
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '700', color: '#1f2937' },
  status: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  description: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
  actions: { flexDirection: 'row', marginTop: 10, gap: 8 },
  editBtn: { backgroundColor: '#ede9fe', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 16 },
  editText: { fontSize: 13, color: '#7c3aed', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#fee2e2', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 16 },
  deleteText: { fontSize: 13, color: '#dc2626', fontWeight: '600' },
});
