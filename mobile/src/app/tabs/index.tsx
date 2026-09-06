import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { taskApi } from "../../services/api";

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");
  const { data, isLoading, error, refetch } = useTasks(statusFilter || undefined);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) setTasks(data);
  }, [data]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await taskApi.delete(id);
      const result = await refetch();
      if (result.data) setTasks(result.data);
    } catch (error: any) {
      alert("Delete failed: " + error.message);
      const result = await refetch();
      if (result.data) setTasks(result.data);
    }
  };

  const onRefresh = async () => {
    const result = await refetch();
    if (result.data) setTasks(result.data);
  };

  if (isLoading) return <Text style={{ padding: 20, textAlign: "center" }}>Loading...</Text>;
  if (error) return <Text style={{ padding: 20, color: "red", textAlign: "center" }}>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f3ff", paddingHorizontal: 16, paddingTop: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <Text style={{ fontSize: 24, fontWeight: "800", color: "#1f2937" }}>📋 Your Tasks</Text>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>{tasks.length}</Text>
      </View>
      <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>Manage and track your progress</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="🔍 Filter by status"
            value={statusFilter}
            onChangeText={setStatusFilter}
            style={{
              borderWidth: 1.5,
              borderColor: "#e5e7eb",
              borderRadius: 14,
              paddingVertical: 10,
              paddingHorizontal: 14,
              backgroundColor: "#fff",
              fontSize: 14,
            }}
            placeholderTextColor="#9ca3af"
          />
        </View>
        <TouchableOpacity
          onPress={onRefresh}
          style={{
            backgroundColor: "#7c3aed",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 14,
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}>⟳</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "#6b7280" }}>✨ No tasks yet</Text>
          <Text style={{ fontSize: 14, color: "#9ca3af" }}>Create your first task!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 16,
                marginBottom: 12,
                shadowColor: "#7c3aed",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 4,
                borderWidth: 1,
                borderColor: "rgba(124,58,237,0.08)",
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "700", color: "#1f2937" }}>{item.title}</Text>
              <Text style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                {item.status === "pending" && "⏳"}
                {item.status === "in_progress" && "🔄"}
                {item.status === "completed" && "✅"} {item.status}
              </Text>
              {item.description && (
                <Text style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>{item.description}</Text>
              )}
              <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
                <TouchableOpacity
                  onPress={() => router.push(`/tabs/tasks/${item.id}`)}
                  style={{
                    backgroundColor: "#ede9fe",
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#7c3aed", fontWeight: "600" }}>✏️ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "#fee2e2",
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#dc2626", fontWeight: "600" }}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      <View style={{ paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => router.push("/tabs/tasks/create")}
          style={{
            backgroundColor: "#7c3aed",
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            marginBottom: 8,
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>➕ Add New Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={{ paddingVertical: 10, alignItems: "center" }}>
          <Text style={{ color: "#6b7280", fontSize: 14, fontWeight: "500" }}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
