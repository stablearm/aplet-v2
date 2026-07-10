export interface EarningsSummary {
  sentUsers: number;
  tomanEarnings: number;
  availableBalanceTon: number;
  availableBalanceToman: number;
  totalEarnings: number;
  earningsEnabled: boolean;
}

export interface EarningsStats {
  platformCount: number;
  totalUsersAdded: number;
  currentUsersAddedNotWithdrawn: number;
  totalEarnings: number;
}

export type WithdrawalType = "ton_coin" | "rial";

export interface WithdrawalTransaction {
  id: string;
  type: WithdrawalType;
  amount: string;
  status: string;
  address: string;
  createdAt: string;
}

export interface WithdrawRequest {
  type: WithdrawalType;
  address: string;
}

export interface WithdrawResponse {
  id: string;
  status: string;
}
