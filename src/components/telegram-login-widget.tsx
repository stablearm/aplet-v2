"use client";

import { useEffect, useRef, useState } from "react";

interface TelegramLoginWidgetProps {
  botUsername: string;
  onAuth: (data: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
  }) => void;
  onError?: (error: string) => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

const WIDGET_SCRIPT_URL = "https://telegram.org/js/telegram-widget.js?22";

export function TelegramLoginWidget({
  botUsername,
  onAuth,
  onError,
  size = "large",
  className,
}: TelegramLoginWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !botUsername) return;

    const container = containerRef.current;
    container.innerHTML = "";
    setHasError(false);

    // Set up the global callback before loading the script
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).onTelegramAuth = (user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
      auth_date: number;
      hash: string;
    }) => {
      onAuth(user);
    };

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", size);
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");

    script.onerror = () => {
      console.error("Failed to load Telegram Login Widget script");
      setHasError(true);
      onError?.("برای استفاده از ویجت، دامنه سایت باید در BotFather ثبت شده باشد.");
    };

    // Check for domain error after a short delay
    // The widget renders an iframe that shows "Bot domain invalid" if domain is not registered
    const checkTimeout = setTimeout(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", () => {
          try {
            // If we can access the iframe content and it shows an error
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              const bodyText = iframeDoc.body?.textContent || "";
              if (bodyText.includes("Bot domain invalid") || bodyText.includes("bot domain")) {
                setHasError(true);
                onError?.("دامنه فعلی در BotFather ثبت نشده است. لطفاً از روش دیگری استفاده کنید.");
              }
            }
          } catch {
            // Cross-origin iframe - can't access content, which is normal
          }
        });
      }
    }, 3000);

    container.appendChild(script);

    return () => {
      clearTimeout(checkTimeout);
      container.innerHTML = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).onTelegramAuth;
    };
  }, [botUsername, onAuth, size, onError]);

  if (hasError) {
    return (
      <div className={`rounded-xl bg-warning/10 border border-warning/20 p-4 text-center ${className}`}>
        <p className="text-xs text-text-secondary mb-2">
          ویجت تلگرام در دامنه فعلی کار نمی‌کند.
        </p>
        <p className="text-[11px] text-text-tertiary">
          لطفاً از روش ربات یا لینک زیر استفاده کنید.
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
