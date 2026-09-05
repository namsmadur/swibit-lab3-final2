import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") return localStorage.getItem(key);
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") localStorage.setItem(key, value);
    else await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") localStorage.removeItem(key);
    else await SecureStore.deleteItemAsync(key);
  },
};

export const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = await storage.getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  console.log(`📤 ${options.method || 'GET'} ${url}`);
  const res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    console.error(`❌ Request failed: ${res.status}`, errData);
    throw new Error(errData.detail || `HTTP ${res.status}`);
  }
  const data = await res.json();
  console.log(`✅ Request successful:`, data);
  return data;
};

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
    console.log(`🗑️🔥 taskApi.delete called for id: ${id}`);
    return request<any>(`/api/v1/tasks/${id}`, { method: "DELETE" });
  },
};

export const { getItem: getToken, setItem: setToken, removeItem: removeToken } = storage;
