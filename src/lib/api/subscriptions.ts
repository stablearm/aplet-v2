import { apiRequest } from "@/lib/api-client";
import type {
  SubscriptionPackage,
  ActivateSubscriptionRequest,
  ActivateSubscriptionResponse,
  SubscriptionStatus,
} from "@/types";

export const subscriptionsApi = {
  getPackages: () =>
    apiRequest<SubscriptionPackage[]>("/api/v1/subscriptions/packages"),

  activate: (data: ActivateSubscriptionRequest) =>
    apiRequest<ActivateSubscriptionResponse>("/api/v1/subscriptions/activate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getStatus: (contentBotId: string) =>
    apiRequest<SubscriptionStatus>(
      `/api/v1/subscriptions/${contentBotId}`
    ),
};
