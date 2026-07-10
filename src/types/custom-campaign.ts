export interface CustomCampaign {
  index: number;
  channelUsername: string;
  channelId: number;
  channelTitle: string;
  memberCount: number;
  createdAt: string;
}

export interface CreateCustomCampaignRequest {
  channelUsername?: string;
  publicLink?: string;
}
