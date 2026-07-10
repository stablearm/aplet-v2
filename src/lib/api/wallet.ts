import { apiRequest } from "@/lib/api-client";
import type { Wallet, TransactionsResponse } from "@/types";

export const walletApi = {
  getWallet: () => apiRequest<Wallet>("/api/v1/wallet"),

  getDepositAddress: () =>
    apiRequest<{ walletAddress: string }>("/api/v1/wallet/deposit-address"),

  getBalance: () => apiRequest<Wallet>("/api/v1/wallet/balance"),

  checkDeposit: () =>
    apiRequest<{
      tonBalance: number;
      tomanBalance: number;
      usdBalance: number;
      swept: boolean;
      depositedToman?: number;
    }>("/api/v1/wallet/check-deposit", {
      method: "POST",
    }),

  getTransactions: (page = 1, limit = 20) =>
    apiRequest<TransactionsResponse>(
      `/api/v1/wallet/transactions?page=${page}&limit=${limit}`
    ),
};
