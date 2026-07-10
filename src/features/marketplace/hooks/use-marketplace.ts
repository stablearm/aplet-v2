import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marketplaceApi } from "@/lib/api";
import type { CreateListingRequest, PaginationParams } from "@/types";

export function useMarketplaceChannels(params?: PaginationParams) {
  return useQuery({
    queryKey: ["marketplace-channels", params],
    queryFn: () => marketplaceApi.listChannels(params),
  });
}

export function useMarketplaceGroups(params?: PaginationParams) {
  return useQuery({
    queryKey: ["marketplace-groups", params],
    queryFn: () => marketplaceApi.listGroups(params),
  });
}

export function useMarketplaceListing(id: string) {
  return useQuery({
    queryKey: ["marketplace-listing", id],
    queryFn: () => marketplaceApi.getListing(id),
    enabled: !!id,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListingRequest) => marketplaceApi.createListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-channels"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-groups"] });
    },
  });
}

export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => marketplaceApi.deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-channels"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-groups"] });
    },
  });
}

export function usePurchaseListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => marketplaceApi.purchase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-channels"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-groups"] });
    },
  });
}
