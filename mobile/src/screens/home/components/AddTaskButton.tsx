import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export const AddTaskButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/tasks/create')}>
      <Text style={styles.text}>➕ Add New Task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 12, alignItems: 'center', marginBottom: 8 },
  text: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
