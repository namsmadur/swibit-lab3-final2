import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TaskCardProps {
  id: number;
  title: string;
  status: string;
  description?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusPress?: (id: number, newStatus: string) => void; // جديد
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  status,
  description,
  onEdit,
  onDelete,
  onStatusPress,
}) => {
  const statusEmoji = status === 'pending' ? '⏳' : status === 'in_progress' ? '🔄' : '✅';

  // دالة لتبديل الحالة
  const handleStatusPress = () => {
    if (!onStatusPress) return;
    // تحديد الحالة التالية: pending -> in_progress -> completed -> pending
    let newStatus = 'pending';
    if (status === 'pending') newStatus = 'in_progress';
    else if (status === 'in_progress') newStatus = 'completed';
    else if (status === 'completed') newStatus = 'pending';
    onStatusPress(id, newStatus);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleStatusPress} activeOpacity={0.7}>
        <Text style={[styles.status, styles.statusButton]}>
          {statusEmoji} {status}
        </Text>
      </TouchableOpacity>
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
  statusButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  description: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
  actions: { flexDirection: 'row', marginTop: 10, gap: 8 },
  editBtn: { backgroundColor: '#ede9fe', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 16 },
  editText: { fontSize: 13, color: '#7c3aed', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#fee2e2', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 16 },
  deleteText: { fontSize: 13, color: '#dc2626', fontWeight: '600' },
});
