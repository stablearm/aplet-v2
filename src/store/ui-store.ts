"use client";

import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark" | "system";
  density: "comfortable" | "compact";
  locale: "fa" | "en";

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setDensity: (density: "comfortable" | "compact") => void;
  setLocale: (locale: "fa" | "en") => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark" | "system") {
  if (typeof window === "undefined") return;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
}

function applyDensity(density: "comfortable" | "compact") {
  if (typeof window === "undefined") return;
  document.documentElement.classList.remove("comfortable", "compact");
  if (density !== "comfortable") {
    document.documentElement.classList.add(density);
  }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: loadFromStorage("sidebar-collapsed", false),
  theme: loadFromStorage("theme", "dark" as const),
  density: loadFromStorage("density", "comfortable" as const),
  locale: "fa",

  toggleSidebar: () =>
    set((state) => {
      const next = !state.sidebarCollapsed;
      saveToStorage("sidebar-collapsed", next);
      return { sidebarCollapsed: next };
    }),

  setSidebarCollapsed: (collapsed) => {
    saveToStorage("sidebar-collapsed", collapsed);
    set({ sidebarCollapsed: collapsed });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    saveToStorage("theme", theme);
    set({ theme });
  },

  setDensity: (density) => {
    applyDensity(density);
    saveToStorage("density", density);
    set({ density });
  },

  setLocale: (locale) => set({ locale }),
}));
