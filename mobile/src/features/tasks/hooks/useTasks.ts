import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../../../services/api";
import Toast from "react-native-toast-message";

export const TASKS_QUERY_KEY = "tasks";

export const useTasks = (status?: string) => {
  return useQuery({
    queryKey: [TASKS_QUERY_KEY, status || "all"],
    queryFn: () => {
      console.log("📤 Fetching tasks with status:", status);
      return taskApi.getAll({ status });
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      Toast.show({ type: "success", text1: "Task created" });
    },
    onError: (err: any) => {
      console.error("❌ Create error:", err);
      Toast.show({ type: "error", text1: "Creation failed", text2: err.message });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      console.log(`📤 Updating task ${id} with data:`, data);
      return taskApi.update(id, data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      Toast.show({ type: "success", text1: "Task updated" });
    },
    onError: (err: any) => {
      console.error("❌ Update error:", err);
      Toast.show({ type: "error", text1: "Update failed", text2: err.message });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      console.log(`🗑️ 🔥 useDeleteTask.mutationFn called with id: ${id}`);
      const result = await taskApi.delete(id);
      console.log(`✅ DELETE response:`, result);
      return { result, id };
    },
    onSuccess: (data, variables) => {
      console.log(`✅ Delete successful for task ${variables}`);
      // إزالة المهمة من الكاش
      qc.setQueryData([TASKS_QUERY_KEY, "all"], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((task: any) => task.id !== variables);
      });
      // إبطال الاستعلامات
      qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      Toast.show({ type: "success", text1: "Task deleted" });
    },
    onError: (err: any) => {
      console.error("❌ Delete error:", err);
      Toast.show({ type: "error", text1: "Deletion failed", text2: err.message });
    },
  });
};
