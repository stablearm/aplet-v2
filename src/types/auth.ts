export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  telegramId: string | null;
  profileCompleted: boolean;
  roles: string[];
  walletAddress: string | null;
  tomanBalance: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface TelegramMiniAppAuthRequest {
  initData: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  telegramId?: string;
  telegramUsername?: string;
  phoneNumber?: string;
}

export interface LinkTelegramRequest {
  initData: string;
}
