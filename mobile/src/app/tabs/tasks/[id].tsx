import { useLocalSearchParams, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../../../services/api"; // ✅ استيراد صحيح
import { useUpdateTask } from "../../../features/tasks/hooks/useTasks";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskId = parseInt(id);
  console.log("📄 Edit screen loaded for task ID:", taskId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // جلب بيانات المهمة
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => {
      console.log("📤 Fetching task details for ID:", taskId);
      return taskApi.getById(taskId);
    },
    enabled: !isNaN(taskId) && taskId > 0,
    retry: 2,
  });

  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (data) {
      console.log("✅ Task data loaded:", data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setStatus(data.status || "pending");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("❌ Error loading task:", error);
      Alert.alert("Error", "Failed to load task: " + (error.message || "Unknown error"));
    }
  }, [error]);

  const handleUpdate = () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Title is required");
      return;
    }
    console.log("📤 Updating task:", { id: taskId, data: { title, description, status } });
    updateMutation.mutate(
      { id: taskId, data: { title, description, status } },
      {
        onSuccess: () => {
          console.log("✅ Update successful");
          Alert.alert("Success", "Task updated successfully");
          router.back();
        },
        onError: (err: any) => {
          console.error("❌ Update failed:", err);
          Alert.alert("Error", "Update failed: " + err.message);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text style={{ marginTop: 10, color: "#6b7280" }}>Loading task...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 18, color: "red", marginBottom: 10 }}>Error loading task</Text>
        <Text style={{ color: "#6b7280", textAlign: "center" }}>{error.message}</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 20,
            backgroundColor: "#7c3aed",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#6b7280" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fc", padding: 20 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 20 }}>
          Edit Task
        </Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            fontSize: 16,
            backgroundColor: "#f9fafb",
          }}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            fontSize: 16,
            backgroundColor: "#f9fafb",
            height: 100,
            textAlignVertical: "top",
          }}
          multiline
        />
        <TextInput
          placeholder="Status (pending, in_progress, completed)"
          value={status}
          onChangeText={setStatus}
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 12,
            padding: 14,
            marginBottom: 20,
            fontSize: 16,
            backgroundColor: "#f9fafb",
          }}
        />

        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            backgroundColor: "#7c3aed",
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Update Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            borderRadius: 12,
            padding: 14,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Text style={{ color: "#4b5563", fontSize: 14 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}