export interface Wallet {
  walletAddress: string;
  tonBalance: number;
  tomanBalance: number;
  usdBalance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  reference?: string;
  createdAt: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}
