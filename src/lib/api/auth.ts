import { apiRequest } from "@/lib/api-client";
import type {
  LoginRequest,
  RegisterRequest,
  TelegramMiniAppAuthRequest,
  RefreshTokenRequest,
  UpdateProfileRequest,
  LinkTelegramRequest,
  User,
  AuthTokens,
} from "@/types";

export const authApi = {
  register: (data: RegisterRequest) =>
    apiRequest<{ user: User } & AuthTokens>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  login: (data: LoginRequest) =>
    apiRequest<{ user: User } & AuthTokens>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  telegramMiniApp: (data: TelegramMiniAppAuthRequest) =>
    apiRequest<{ user: User } & AuthTokens>("/api/v1/auth/telegram-mini-app", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  refresh: (data: RefreshTokenRequest) =>
    apiRequest<{
      token: string;
      newRefreshToken: string;
      accessTokenExpires: string;
      refreshTokenExpires: string;
    }>("/api/v1/auth/refresh", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  logout: (data: RefreshTokenRequest) =>
    apiRequest<{ success: boolean }>("/api/v1/auth/logout", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfile: () => apiRequest<User>("/api/v1/auth/me"),

  updateProfile: (data: UpdateProfileRequest) =>
    apiRequest<{ success: boolean; message: string }>("/api/v1/auth/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  linkTelegram: (data: LinkTelegramRequest) =>
    apiRequest<{ success: boolean; message: string }>(
      "/api/v1/auth/me/link-telegram",
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    ),
};
