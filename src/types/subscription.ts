import { type SubscriptionType } from "./bot";

export interface SubscriptionPackage {
  type: SubscriptionType;
  duration: string;
  adminPrice: number;
  memberCount: number;
  months: number;
  memberPrice: number;
  totalPrice: number;
}

export interface ActivateSubscriptionRequest {
  packageType: SubscriptionType;
  contentBotId: string;
}

export interface ActivateSubscriptionResponse {
  success: boolean;
  expiresAt: string;
  packageType: SubscriptionType;
}

export interface SubscriptionStatus {
  subscriptionType: SubscriptionType;
  subscriptionExpiresAt: string;
  isTrial: boolean;
  allocatedMemberCount: number;
  isExpired: boolean;
}
