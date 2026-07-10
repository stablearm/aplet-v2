"use client";

import { useEffect, useState, useCallback } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    chat_instance?: string;
    chat_type?: string;
    start_param?: string;
    auth_date?: number;
    hash?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export interface TelegramWebAppInfo {
  initData: string;
  user: TelegramUser | null;
  isReady: boolean;
  isMiniApp: boolean;
}

const TELEGRAM_WEBAPP_SCRIPT_URL = "https://telegram.org/js/telegram-web-app.js?62";

function injectTelegramScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.Telegram?.WebApp) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TELEGRAM_WEBAPP_SCRIPT_URL}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      if (window.Telegram?.WebApp) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = TELEGRAM_WEBAPP_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function useTelegramWebApp(): TelegramWebAppInfo {
  const [info, setInfo] = useState<TelegramWebAppInfo>({
    initData: "",
    user: null,
    isReady: false,
    isMiniApp: false,
  });

  const detectAndInitialize = useCallback(async () => {
    await injectTelegramScript();

    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setInfo({ initData: "", user: null, isReady: true, isMiniApp: false });
      return;
    }

    tg.ready();

    setInfo({
      initData: tg.initData,
      user: tg.initDataUnsafe?.user ?? null,
      isReady: true,
      isMiniApp: true,
    });
  }, []);

  useEffect(() => {
    detectAndInitialize();
  }, [detectAndInitialize]);

  return info;
}
