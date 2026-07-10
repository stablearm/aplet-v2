import { apiRequest } from "@/lib/api-client";
import type {
  ContentBot,
  ContentBotDetail,
  CreateContentBotRequest,
  CreateContentBotResponse,
  UpdateTopicsRequest,
  UpdateSignatureRequest,
  UpdatePostLimitsRequest,
} from "@/types";

export const contentBotsApi = {
  create: (data: CreateContentBotRequest) =>
    apiRequest<CreateContentBotResponse>("/api/v1/content-bots", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  list: () => apiRequest<ContentBot[]>("/api/v1/content-bots"),

  getById: (id: string) =>
    apiRequest<ContentBotDetail>(`/api/v1/content-bots/${id}`),

  updateTopics: (id: string, data: UpdateTopicsRequest) =>
    apiRequest<void>(`/api/v1/content-bots/${id}/topics`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  updateSignature: (id: string, data: UpdateSignatureRequest) =>
    apiRequest<void>(`/api/v1/content-bots/${id}/signature`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  updatePostLimits: (id: string, data: UpdatePostLimitsRequest) =>
    apiRequest<void>(`/api/v1/content-bots/${id}/post-limits`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  toggleStatus: (id: string) =>
    apiRequest<{ success: boolean; status: string }>(
      `/api/v1/content-bots/${id}/toggle-status`,
      { method: "POST" }
    ),

  delete: (id: string) =>
    apiRequest<void>(`/api/v1/content-bots/${id}`, {
      method: "DELETE",
    }),
};
