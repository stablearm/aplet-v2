import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignsApi } from "@/lib/api";
import type { CampaignStatus, CreateCampaignRequest } from "@/types";

export function useCampaigns(status?: CampaignStatus) {
  return useQuery({
    queryKey: ["campaigns", status],
    queryFn: () => campaignsApi.list(status),
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignsApi.getById(id),
    enabled: !!id,
  });
}

export function useCampaignPricing() {
  return useQuery({
    queryKey: ["campaign-pricing"],
    queryFn: () => campaignsApi.getPricing(),
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCampaignRequest) => campaignsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
}

export function usePauseCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => campaignsApi.pause(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
    },
  });
}

export function useResumeCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => campaignsApi.resume(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
    },
  });
}

export function useCancelCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => campaignsApi.cancel(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
    },
  });
}
