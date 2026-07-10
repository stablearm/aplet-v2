import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { walletApi } from "@/lib/api";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: () => walletApi.getWallet(),
  });
}

export function useWalletBalance() {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => walletApi.getBalance(),
  });
}

export function useWalletDepositAddress() {
  return useQuery({
    queryKey: ["wallet-deposit-address"],
    queryFn: () => walletApi.getDepositAddress(),
  });
}

export function useCheckDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => walletApi.checkDeposit(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    },
  });
}

export function useWalletTransactions(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["wallet-transactions", page, limit],
    queryFn: () => walletApi.getTransactions(page, limit),
  });
}
