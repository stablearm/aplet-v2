import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { earningsApi } from "@/lib/api";
import type { WithdrawRequest } from "@/types";

export function useEarningsSummary() {
  return useQuery({
    queryKey: ["earnings-summary"],
    queryFn: () => earningsApi.getSummary(),
  });
}

export function useEarningsStats() {
  return useQuery({
    queryKey: ["earnings-stats"],
    queryFn: () => earningsApi.getStats(),
  });
}

export function useEarningsTransactions() {
  return useQuery({
    queryKey: ["earnings-transactions"],
    queryFn: () => earningsApi.getTransactions(),
  });
}

export function useWithdraw() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WithdrawRequest) => earningsApi.withdraw(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earnings-summary"] });
      queryClient.invalidateQueries({ queryKey: ["earnings-stats"] });
      queryClient.invalidateQueries({ queryKey: ["earnings-transactions"] });
    },
  });
}
