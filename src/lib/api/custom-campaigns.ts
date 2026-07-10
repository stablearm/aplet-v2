import { apiRequest } from "@/lib/api-client";
import type { CustomCampaign, CreateCustomCampaignRequest } from "@/types";

export const customCampaignsApi = {
  list: () => apiRequest<CustomCampaign[]>("/api/v1/custom-campaigns"),

  create: (data: CreateCustomCampaignRequest) =>
    apiRequest<void>("/api/v1/custom-campaigns", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  remove: (index: number) =>
    apiRequest<void>(`/api/v1/custom-campaigns/${index}`, {
      method: "DELETE",
    }),
};
