import type { ApiError, AuthTokens } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let accessTokenExpiresAt: number | null = null;
let refreshTokenExpiresAt: number | null = null;
let refreshPromise: Promise<boolean> | null = null;

export function setTokens(tokens: AuthTokens) {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
  accessTokenExpiresAt = parseExpiry(tokens.accessTokenExpires);
  refreshTokenExpiresAt = parseExpiry(tokens.refreshTokenExpires);
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    if (accessTokenExpiresAt) localStorage.setItem("accessTokenExpiresAt", String(accessTokenExpiresAt));
    if (refreshTokenExpiresAt) localStorage.setItem("refreshTokenExpiresAt", String(refreshTokenExpiresAt));
  }
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  accessTokenExpiresAt = null;
  refreshTokenExpiresAt = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiresAt");
    localStorage.removeItem("refreshTokenExpiresAt");
  }
}

export function loadTokens() {
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
    refreshToken = localStorage.getItem("refreshToken");
    const aexp = localStorage.getItem("accessTokenExpiresAt");
    const rexp = localStorage.getItem("refreshTokenExpiresAt");
    accessTokenExpiresAt = aexp ? Number(aexp) : null;
    refreshTokenExpiresAt = rexp ? Number(rexp) : null;
  }
}

export function isAccessTokenExpired(): boolean {
  if (!accessTokenExpiresAt) return false;
  return Date.now() >= accessTokenExpiresAt - 30_000;
}

export function isRefreshTokenExpired(): boolean {
  if (!refreshTokenExpiresAt) return false;
  return Date.now() >= refreshTokenExpiresAt;
}

function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }
  return null;
}

export function getRefreshToken(): string | null {
  if (refreshToken) return refreshToken;
  if (typeof window !== "undefined") {
    refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
  }
  return null;
}

function parseExpiry(value: string | undefined): number | null {
  if (!value) return null;
  const ts = Date.parse(value);
  return isNaN(ts) ? null : ts;
}

async function doRefresh(): Promise<boolean> {
  if (isRefreshTokenExpired()) {
    clearTokens();
    return false;
  }

  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const data = await response.json();
    setTokens({
      accessToken: data.token,
      refreshToken: data.newRefreshToken,
      accessTokenExpires: data.accessTokenExpires,
      refreshTokenExpires: data.refreshTokenExpires,
    });
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = doRefresh();
  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    ...(fetchOptions.headers as Record<string, string> || {}),
  };

  if (!skipAuth) {
    // Proactively refresh if access token is about to expire
    if (isAccessTokenExpired()) {
      await refreshAccessToken();
    }

    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!skipAuth && response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = getAccessToken();
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...fetchOptions,
          headers,
        });
      }
    }
  }

  if (!response.ok) {
    const raw = await response.json().catch(() => null);
    throw {
      statusCode: response.status,
      message: raw?.message || "An unexpected error occurred",
    } as ApiError;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export { API_BASE_URL };
