import { request } from "../../../services/api";

export const taskApi = {
  getAll: (params?: { status?: string }) => {
    console.log("📤 taskApi.getAll called with params:", params);
    return request<any[]>("/api/v1/tasks" + (params?.status ? `?status=${params.status}` : ""));
  },
  getById: (id: number) => {
    console.log("📤 taskApi.getById called for id:", id);
    return request<any>(`/api/v1/tasks/${id}`);
  },
  create: (data: any) => {
    console.log("📤 taskApi.create called with data:", data);
    return request<any>("/api/v1/tasks", { method: "POST", body: JSON.stringify(data) });
  },
  update: (id: number, data: any) => {
    console.log("📤 taskApi.update called for id:", id, "data:", data);
    return request<any>(`/api/v1/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: (id: number) => {
    console.log("📤 taskApi.delete called for id:", id);
    return request<void>(`/api/v1/tasks/${id}`, { method: "DELETE" });
  },
};
