import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import type { UpdateProfileRequest } from "@/types";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useLinkTelegram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (initData: string) => authApi.linkTelegram({ initData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
