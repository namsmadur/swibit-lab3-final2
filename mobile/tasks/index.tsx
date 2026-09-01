import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getTasks, deleteTask } from "../../lib/api";

export default function TaskListScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleDelete = async (id: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
            loadTasks();
          } catch (err: any) {
            Alert.alert("Error", err.message);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", marginBottom: 10 }}>Error loading tasks</Text>
        <Button title="Retry" onPress={loadTasks} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Task" onPress={() => router.push("/tasks/create")} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description || "No description"}</Text>
            <Text style={{ color: item.is_completed ? "green" : "orange" }}>
              {item.is_completed ? "? Completed" : "? Pending"}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Button title="Edit" onPress={() => router.push(/tasks/)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No tasks yet</Text>}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="Ask AI" onPress={() => router.push("/assistant")} />
      </View>
    </View>
  );
}
