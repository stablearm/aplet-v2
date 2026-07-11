"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { authApi } from "@/lib/api";
import { loadTokens, clearTokens } from "@/lib/api-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    loadTokens();
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
