import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useCreateTask } from "../../../features/tasks/hooks/useTasks";

export default function CreateTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { mutate: createTask, isLoading } = useCreateTask();
  const router = useRouter();

  const handleSubmit = () => {
    if (!title.trim()) { alert("Title is required"); return; }
    createTask({ title, description, status }, {
      onSuccess: () => { router.replace("/tabs"); },
      onError: (err) => alert("Failed: " + err.message),
    });
  };

  if (isLoading) return <ActivityIndicator size="large" color="#7c3aed" style={{ flex: 1, justifyContent: "center" }} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f3ff", padding: 20, justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 28,
          padding: 24,
          shadowColor: "#7c3aed",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          elevation: 6,
          borderWidth: 1,
          borderColor: "rgba(124,58,237,0.06)",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#1f2937" }}>📝 Create New Task</Text>
        <Text style={{ fontSize: 14, color: "#6b7280", marginBottom: 18 }}>Plan your tasks and get things done</Text>

        <TextInput
          placeholder="Task Title *"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1.5,
            borderColor: "#e5e7eb",
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 14,
            fontSize: 16,
            backgroundColor: "#fafafa",
          }}
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={{
            borderWidth: 1.5,
            borderColor: "#e5e7eb",
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 14,
            fontSize: 16,
            backgroundColor: "#fafafa",
            height: 80,
            textAlignVertical: "top",
          }}
          multiline
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          placeholder="Status (pending, in_progress, completed)"
          value={status}
          onChangeText={setStatus}
          style={{
            borderWidth: 1.5,
            borderColor: "#e5e7eb",
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 20,
            fontSize: 16,
            backgroundColor: "#fafafa",
          }}
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#7c3aed",
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            marginBottom: 8,
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>✅ Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            borderRadius: 16,
            paddingVertical: 12,
            alignItems: "center",
            borderWidth: 1.5,
            borderColor: "#e5e7eb",
          }}
        >
          <Text style={{ color: "#4b5563", fontSize: 15, fontWeight: "600" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
