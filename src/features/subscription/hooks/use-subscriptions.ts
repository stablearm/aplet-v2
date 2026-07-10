import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionsApi } from "@/lib/api";
import type { ActivateSubscriptionRequest } from "@/types";

export function useSubscriptionPackages() {
  return useQuery({
    queryKey: ["subscription-packages"],
    queryFn: () => subscriptionsApi.getPackages(),
  });
}

export function useSubscriptionStatus(contentBotId: string) {
  return useQuery({
    queryKey: ["subscription-status", contentBotId],
    queryFn: () => subscriptionsApi.getStatus(contentBotId),
    enabled: !!contentBotId,
  });
}

export function useActivateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ActivateSubscriptionRequest) => subscriptionsApi.activate(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["subscription-packages"] });
      queryClient.invalidateQueries({ queryKey: ["subscription-status", variables.contentBotId] });
    },
  });
}
