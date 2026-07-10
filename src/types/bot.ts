export type ContentTopic =
  | "politics"
  | "international"
  | "economics"
  | "cryptocurrency"
  | "technology"
  | "science"
  | "social";

export type SubscriptionType =
  | "one_month"
  | "three_months"
  | "six_months"
  | "one_year";

export type BotStatus = "active" | "paused" | "inactive";

export interface ContentBot {
  id: string;
  channelUsername: string;
  channelId?: number;
  botUsername: string;
  status: BotStatus;
  selectedTopics: ContentTopic[];
  postSignature: string;
  subscriptionType: SubscriptionType;
  subscriptionExpiresAt: string;
  totalPosts: number;
  successfulPosts: number;
  failedPosts: number;
  lastPostTime?: string;
  createdAt: string;
}

export interface ContentBotDetail extends ContentBot {
  contentSettings: ContentSettings;
  postRateLimits: PostRateLimits;
  isTrial: boolean;
  allocatedMemberCount: number;
  feedSources: FeedSource[];
}

export interface ContentSettings {
  feedCheckInterval: number;
  postInterval: number;
  maxPostsPerDay: number;
  enableDuplicateCheck: boolean;
  minPostLength: number;
  maxPostLength: number;
  includeHashtags: boolean;
  includeEmojis: boolean;
}

export interface PostRateLimits {
  slot1: number;
  slot2: number;
  slot3: number;
  slot4: number;
}

export interface FeedSource {
  id: string;
  url: string;
  type: string;
}

export interface CreateContentBotRequest {
  channelUsername: string;
  botToken: string;
  selectedTopics: ContentTopic[];
  postSignature: string;
  subscriptionType: SubscriptionType;
}

export interface CreateContentBotResponse {
  id: string;
  channelUsername: string;
  botUsername: string;
  status: string;
  subscriptionType: SubscriptionType;
  subscriptionExpiresAt: string;
  isTrial: boolean;
  allocatedMemberCount: number;
  selectedTopics: ContentTopic[];
  postSignature: string;
  feedSourcesCount: number;
}

export interface UpdateTopicsRequest {
  topics: ContentTopic[];
}

export interface UpdateSignatureRequest {
  signature: string;
}

export interface UpdatePostLimitsRequest {
  slot1?: number;
  slot2?: number;
  slot3?: number;
  slot4?: number;
}
