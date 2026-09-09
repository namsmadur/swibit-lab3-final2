import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../../../services/api";
import Toast from "react-native-toast-message";

export const TASKS_QUERY_KEY = "tasks";

export const useTasks = (status?: string) => {
  console.log("📤 useTasks called with status:", status);
  return useQuery({
    queryKey: [TASKS_QUERY_KEY, status || "all"],
    queryFn: () => {
      console.log("📤 Fetching tasks...");
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
      Toast.show({ type: "error", text1: "Creation failed", text2: err.message });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => taskApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      Toast.show({ type: "success", text1: "Task updated" });
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: "Update failed", text2: err.message });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      console.log("🗑️ useDeleteTask.mutationFn called with id:", id);
      return taskApi.delete(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
      Toast.show({ type: "success", text1: "Task deleted" });
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: "Deletion failed", text2: err.message });
    },
  });
};

