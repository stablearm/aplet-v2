"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, density } = useUIStore();

  useEffect(() => {
    // Apply theme
    const resolved = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : theme;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);

    // Apply density
    document.documentElement.classList.remove("comfortable", "compact");
    if (density !== "comfortable") {
      document.documentElement.classList.add(density);
    }
  }, [theme, density]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = media.matches ? "dark" : "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolved);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return <>{children}</>;
}
