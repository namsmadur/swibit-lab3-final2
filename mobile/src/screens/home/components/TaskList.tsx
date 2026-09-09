import React from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { TaskCard } from './TaskCard';

export const TaskList = ({ tasks, isLoading, onRefresh, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>✨ No tasks yet</Text>
        <Text style={styles.emptySubtitle}>Create your first task!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard
          id={item.id}
          title={item.title}
          status={item.status}
          description={item.description}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingBottom: 12 }}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 18, color: '#6b7280' },
  emptySubtitle: { fontSize: 14, color: '#9ca3af', marginTop: 4 },
});
