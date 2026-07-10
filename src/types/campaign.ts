export type CampaignStatus =
  | "active"
  | "paused"
  | "completed"
  | "cancelled"
  | "pending_payment";

export interface CampaignPricing {
  memberCost: number;
  commissionPerMember: number;
  totalPerMember: number;
}

export interface Campaign {
  id: string;
  orderId: string;
  name: string;
  targetChannelUsername: string;
  status: CampaignStatus;
  targetSubscriberCount: number;
  currentSubscriberCount: number;
  totalCost: number;
  channelTitle: string;
  channelId?: number;
  publicLink?: string;
  inviteLink?: string;
  type?: string;
  costPer1000?: number;
  createdAt: string;
  expiresAt: string;
  progress: number;
}

export interface CreateCampaignRequest {
  campaignId?: string;
  name?: string;
  channelUsername?: string;
  publicLink?: string;
  targetSubscriberCount?: number;
}

export interface CreateCampaignResponse {
  id: string;
  orderId: string;
  status: string;
  channelTitle?: string;
  channelId?: number;
  totalCost?: number;
  targetSubscriberCount?: number;
  expiresAt?: string;
  message?: string;
}
