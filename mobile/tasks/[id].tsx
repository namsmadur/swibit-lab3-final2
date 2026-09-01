import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getTasks, updateTask } from "../../lib/api";
import TaskForm from "../../components/TaskForm";

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const taskId = parseInt(id as string);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState({ title: "", description: "", is_completed: false });

  useEffect(() => {
    const loadTask = async () => {
      try {
        const tasks = await getTasks();
        const task = tasks.find((t: any) => t.id === taskId);
        if (task) {
          setInitialData({ title: task.title, description: task.description || "", is_completed: task.is_completed });
        } else {
          Alert.alert("Error", "Task not found");
          router.back();
        }
      } catch (err: any) {
        Alert.alert("Error", err.message);
        router.back();
      } finally {
        setFetching(false);
      }
    };
    loadTask();
  }, [taskId]);

  const handleSubmit = async (title: string, description: string, completed: boolean) => {
    setLoading(true);
    try {
      await updateTask(taskId, { title, description, is_completed: completed });
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TaskForm
        initialTitle={initialData.title}
        initialDescription={initialData.description}
        initialCompleted={initialData.is_completed}
        onSubmit={handleSubmit}
        isLoading={loading}
        submitLabel="Update"
      />
    </View>
  );
}
