const API_BASE_URL = "http://127.0.0.1:8000";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
};

export const deleteToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};

const request = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: Bearer  }),
    ...options.headers,
  };
  const response = await fetch(${API_BASE_URL}, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "Request failed");
  }
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(${API_BASE_URL}/auth/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }
  return response.json();
};

export const getTasks = () => request("/tasks");
export const createTask = (task: any) => request("/tasks", { method: "POST", body: JSON.stringify(task) });
export const updateTask = (id: number, task: any) => request(/tasks/, { method: "PUT", body: JSON.stringify(task) });
export const deleteTask = (id: number) => request(/tasks/, { method: "DELETE" });
export const askAssistant = (query: string) => request("/assistant/ask", { method: "POST", body: JSON.stringify({ query }) });
