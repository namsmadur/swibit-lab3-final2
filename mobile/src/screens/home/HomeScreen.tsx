import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../../features/tasks/hooks/useTasks';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { taskApi } from '../../services/api';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const { data, isLoading, error, refetch } = useTasks(filter || undefined);

  useEffect(() => {
    if (data && Array.isArray(data)) setTasks(data);
  }, [data]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskApi.delete(id);
      const result = await refetch();
      if (result.data) setTasks(result.data);
      Toast.show({ type: 'success', text1: 'Task deleted' });
    } catch (err: any) {
      Toast.show({ type: 'error', text1: 'Delete failed', text2: err.message });
      const result = await refetch();
      if (result.data) setTasks(result.data);
    }
  };

  const onRefresh = async () => {
    const result = await refetch();
    if (result.data) setTasks(result.data);
  };

  if (error) return <Text style={{ padding: 20, color: 'red' }}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>📋 Your Tasks</Text>
          <Text style={styles.subtitle}>Manage and track your progress</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsCount}>{tasks.length}</Text>
          <Text style={styles.statsLabel}>Total Tasks</Text>
        </View>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="🔍 Filter by status"
            value={filter}
            onChangeText={setFilter}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshText}>⟳</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>
              {item.description && <Text style={styles.taskDesc}>{item.description}</Text>}
              <View style={styles.taskActions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => router.push(`/edit-task/${item.id}`)}>
                  <Text style={styles.editText}>✏️ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshing={isLoading}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create-task')}>
            <Text style={styles.addText}>➕ Add New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
    paddingTop: 12,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: '800', color: '#1f2937' },
  subtitle: { fontSize: 12, color: '#6b7280', marginTop: 1 },
  statsContainer: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statsCount: { fontSize: 16, fontWeight: '700', color: '#7c3aed', textAlign: 'center' },
  statsLabel: { fontSize: 11, color: '#6b7280' },
  filterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 13,
    color: '#1f2937',
  },
  refreshButton: {
    backgroundColor: '#7c3aed',
    padding: 8,
    borderRadius: 12,
    marginLeft: 8,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  refreshText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.05)',
  },
  taskTitle: { fontSize: 15, fontWeight: '700', color: '#1f2937' },
  taskStatus: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  taskDesc: { fontSize: 12, color: '#9ca3af', marginTop: 3 },
  taskActions: { flexDirection: 'row', marginTop: 8, gap: 6 },
  editBtn: { backgroundColor: '#ede9fe', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16 },
  editText: { fontSize: 12, color: '#7c3aed', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#fee2e2', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 16 },
  deleteText: { fontSize: 12, color: '#dc2626', fontWeight: '600' },
  footer: {
    paddingVertical: 10,
    marginTop: 'auto',
  },
  addButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  logoutButton: { paddingVertical: 8, alignItems: 'center' },
  logoutText: { color: '#6b7280', fontSize: 13, fontWeight: '500' },
});






