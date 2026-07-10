import { apiRequest } from "@/lib/api-client";
import type {
  Platform,
  PlatformDetail,
  CreatePlatformRequest,
  UpdatePlatformRequest,
  AddAdminRequest,
} from "@/types";

export const platformsApi = {
  create: (data: CreatePlatformRequest) =>
    apiRequest<{ id: string; webhookStatus: string }>("/api/v1/platforms", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  list: () => apiRequest<Platform[]>("/api/v1/platforms"),

  getById: (id: string) =>
    apiRequest<PlatformDetail>(`/api/v1/platforms/${id}`),

  update: (id: string, data: UpdatePlatformRequest) =>
    apiRequest<void>(`/api/v1/platforms/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<void>(`/api/v1/platforms/${id}`, {
      method: "DELETE",
    }),

  addAdmin: (id: string, data: AddAdminRequest) =>
    apiRequest<void>(`/api/v1/platforms/${id}/admins`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  removeAdmin: (platformId: string, adminId: string) =>
    apiRequest<void>(`/api/v1/platforms/${platformId}/admins/${adminId}`, {
      method: "DELETE",
    }),
};
