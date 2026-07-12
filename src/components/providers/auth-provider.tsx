"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { authApi } from "@/lib/api";
import { loadTokens, clearTokens, isRefreshTokenExpired } from "@/lib/api-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    loadTokens();

    // If refresh token is expired, no point calling API — clear immediately
    if (isRefreshTokenExpired()) {
      clearTokens();
      setUser(null);
      return;
    }

    authApi
      .getProfile()
      .then((user) => setUser(user))
      .catch(() => {
        clearTokens();
        setUser(null);
      });
  }, [setUser, setLoading]);

  return <>{children}</>;
}
