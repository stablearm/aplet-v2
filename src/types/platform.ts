export interface Platform {
  id: string;
  channelUsername: string;
  publicLink?: string;
  botUsername: string;
  botId: string;
  followQuota: number;
  webhookStatus: string;
  totalUsersAddedByPlatform: number;
  createdAt: string;
}

export interface PlatformDetail extends Platform {
  admins: PlatformAdmin[];
}

export interface PlatformAdmin {
  id: string;
  telegramId: string;
  username: string;
}

export interface CreatePlatformRequest {
  channelUsername?: string;
  publicLink?: string;
  botToken: string;
  followQuota: number;
}

export interface UpdatePlatformRequest {
  followQuota: number;
}

export interface AddAdminRequest {
  adminTelegramId: string;
  adminUsername?: string;
}
