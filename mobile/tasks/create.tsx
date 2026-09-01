import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { createTask } from "../../lib/api";
import TaskForm from "../../components/TaskForm";

export default function CreateTaskScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title: string, description: string, completed: boolean) => {
    setLoading(true);
    try {
      await createTask({ title, description, is_completed: completed });
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TaskForm onSubmit={handleSubmit} isLoading={loading} submitLabel="Create" />
    </View>
  );
}
