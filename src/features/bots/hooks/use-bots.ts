import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentBotsApi } from "@/lib/api";
import type {
  CreateContentBotRequest,
  UpdateTopicsRequest,
  UpdateSignatureRequest,
  UpdatePostLimitsRequest,
} from "@/types";

export function useContentBots() {
  return useQuery({
    queryKey: ["content-bots"],
    queryFn: () => contentBotsApi.list(),
  });
}

export function useContentBot(id: string) {
  return useQuery({
    queryKey: ["content-bot", id],
    queryFn: () => contentBotsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateContentBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContentBotRequest) => contentBotsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}

export function useUpdateTopics() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTopicsRequest }) =>
      contentBotsApi.updateTopics(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}

export function useUpdateSignature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSignatureRequest }) =>
      contentBotsApi.updateSignature(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}

export function useUpdatePostLimits() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostLimitsRequest }) =>
      contentBotsApi.updatePostLimits(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}

export function useToggleBotStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contentBotsApi.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}

export function useDeleteContentBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contentBotsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-bots"] });
    },
  });
}
