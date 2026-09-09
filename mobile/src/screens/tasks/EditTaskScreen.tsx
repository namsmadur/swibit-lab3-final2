import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { taskApi } from '../../services/api';
import { useUpdateTask } from '../../features/tasks/hooks/useTasks';
import Toast from 'react-native-toast-message';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const taskId = parseInt(id as string);
  const router = useRouter();
  console.log('📄 Edit screen loaded for task ID:', taskId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const { data, isLoading: isLoadingTask, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskApi.getById(taskId),
    enabled: !isNaN(taskId) && taskId > 0,
  });

  const { mutate: updateTask, isLoading: isUpdating } = useUpdateTask();

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
      setStatus(data.status || 'pending');
    }
  }, [data]);

  // دالة تبديل الحالة
  const toggleStatus = () => {
    let newStatus = 'pending';
    if (status === 'pending') newStatus = 'in_progress';
    else if (status === 'in_progress') newStatus = 'completed';
    else if (status === 'completed') newStatus = 'pending';
    setStatus(newStatus);
  };

  // الحصول على الإيموجي حسب الحالة
  const getStatusEmoji = () => {
    if (status === 'pending') return '⏳';
    if (status === 'in_progress') return '🔄';
    return '✅';
  };

  const handleUpdate = () => {
    if (!title.trim()) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Title is required' });
      return;
    }
    updateTask(
      { id: taskId, data: { title: title.trim(), description: description.trim(), status } },
      {
        onSuccess: () => {
          Toast.show({ type: 'success', text1: 'Task Updated', text2: 'Task updated successfully' });
          router.push('/tabs');
        },
        onError: (err: any) => {
          Toast.show({ type: 'error', text1: 'Update Failed', text2: err.message });
        },
      }
    );
  };

  if (isLoadingTask) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text style={styles.loadingText}>Loading task...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Failed to load task</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>✏️ Edit Task</Text>
          <Text style={styles.subtitle}>Update your task details</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Title *"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* حقل الحالة القابل للنقر */}
          <TouchableOpacity style={styles.statusContainer} onPress={toggleStatus} activeOpacity={0.7}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>
              {getStatusEmoji()} {status}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={isUpdating}>
            <Text style={styles.buttonText}>
              {isUpdating ? 'Updating...' : '✅ Update Task'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center', padding: 16 },
  innerContainer: { width: '100%', maxWidth: 600 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f3ff' },
  loadingText: { marginTop: 10, color: '#6b7280', fontSize: 16 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f3ff' },
  errorText: { fontSize: 18, color: 'red', fontWeight: 'bold' },
  errorSubtext: { marginTop: 8, color: '#6b7280', textAlign: 'center' },
  retryButton: { marginTop: 16, backgroundColor: '#7c3aed', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 16 },
  retryText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.06)',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#1f2937', marginBottom: 2 },
  subtitle: { fontSize: 13, color: '#6b7280', marginBottom: 16 },
  input: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#1f2937',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statusLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusValue: {
    fontSize: 15,
    color: '#7c3aed',
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 14,
  },
  cancelText: { color: '#4b5563', fontSize: 14, fontWeight: '600' },
});
