import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { platformsApi } from "@/lib/api";
import type { CreatePlatformRequest, UpdatePlatformRequest, AddAdminRequest } from "@/types";

export function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: () => platformsApi.list(),
  });
}

export function usePlatform(id: string) {
  return useQuery({
    queryKey: ["platform", id],
    queryFn: () => platformsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreatePlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlatformRequest) => platformsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
}

export function useUpdatePlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlatformRequest }) =>
      platformsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
}

export function useDeletePlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => platformsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
}

export function useAddAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddAdminRequest }) =>
      platformsApi.addAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
}

export function useRemoveAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ platformId, adminId }: { platformId: string; adminId: string }) =>
      platformsApi.removeAdmin(platformId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
    },
  });
}
