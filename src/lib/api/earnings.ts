import { apiRequest } from "@/lib/api-client";
import type {
  EarningsSummary,
  EarningsStats,
  WithdrawalTransaction,
  WithdrawRequest,
  WithdrawResponse,
} from "@/types";

export const earningsApi = {
  getSummary: () => apiRequest<EarningsSummary>("/api/v1/earnings"),

  getTransactions: () =>
    apiRequest<WithdrawalTransaction[]>("/api/v1/earnings/transactions"),

  withdraw: (data: WithdrawRequest) =>
    apiRequest<WithdrawResponse>("/api/v1/earnings/withdraw", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getStats: () => apiRequest<EarningsStats>("/api/v1/earnings/stats"),
};
