import { apiRequest } from "@/lib/api-client";
import type {
  Campaign,
  CampaignPricing,
  CampaignStatus,
  CreateCampaignRequest,
  CreateCampaignResponse,
} from "@/types";

export const campaignsApi = {
  getPricing: () => apiRequest<CampaignPricing>("/api/v1/campaigns/pricing"),

  create: (data: CreateCampaignRequest) =>
    apiRequest<CreateCampaignResponse>("/api/v1/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  list: (status?: CampaignStatus) => {
    const params = status ? `?status=${status}` : "";
    return apiRequest<Campaign[]>(`/api/v1/campaigns${params}`);
  },

  getById: (id: string) =>
    apiRequest<Campaign>(`/api/v1/campaigns/${id}`),

  pause: (id: string) =>
    apiRequest<{ success: boolean; status: string }>(
      `/api/v1/campaigns/${id}/pause`,
      { method: "POST" }
    ),

  resume: (id: string) =>
    apiRequest<{ success: boolean; status: string }>(
      `/api/v1/campaigns/${id}/resume`,
      { method: "POST" }
    ),

  cancel: (id: string) =>
    apiRequest<{ success: boolean; status: string }>(
      `/api/v1/campaigns/${id}/cancel`,
      { method: "POST" }
    ),
};
