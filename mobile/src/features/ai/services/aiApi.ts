import { request } from "../../../services/api";

export const aiApi = {
  chat: (messages: any[], context?: string) =>
    request<{ response: string }>("/api/v1/ai/chat", {
      method: "POST",
      body: JSON.stringify({ messages, context }),
    }),
  health: () => request<{ status: string }>("/api/v1/ai/health"),
};
