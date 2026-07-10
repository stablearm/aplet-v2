"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ExternalLink, Settings, Check, MessageCircle } from "lucide-react";
import { useProfile, useLinkTelegram } from "@/features/settings/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TelegramLoginWidget } from "@/components/telegram-login-widget";

const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "apletbot";

interface TelegramLinkPromptProps {
  className?: string;
  compact?: boolean;
}

export function TelegramLinkPrompt({ className, compact = false }: TelegramLinkPromptProps) {
  const { data: profile, isLoading } = useProfile();
  const linkTelegram = useLinkTelegram();
  const [linkError, setLinkError] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const botLink = profile?.id
    ? `https://t.me/${BOT_USERNAME}?start=${profile.id}`
    : `https://t.me/${BOT_USERNAME}`;

  const handleWidgetAuth = useCallback(
    async (data: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      auth_date: number;
      hash: string;
    }) => {
      setLinkError(null);
      try {
        const initData = [
          `user=${JSON.stringify({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
          })}`,
          `auth_date=${data.auth_date}`,
          `hash=${data.hash}`,
        ].join("\n");

        await linkTelegram.mutateAsync(initData);
        setSuccess(true);
      } catch (err) {
        const apiError = err as { message?: string };
        setLinkError(apiError.message || "خطا در اتصال تلگرام. لطفاً دوباره تلاش کنید.");
      }
    },
    [linkTelegram]
  );

  if (isLoading) {
    return null;
  }

  if (profile?.telegramId || success) {
    return (
      <div className={`flex items-center gap-2 text-sm text-success ${className}`}>
        <Check className="h-4 w-4" />
        <span>حساب تلگرام متصل است</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`rounded-xl border border-warning/30 bg-warning/5 p-4 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0088cc]/10 text-[#0088cc]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">اتصال تلگرام لازم است</p>
              <p className="text-[11px] text-text-tertiary">برای استفاده از کمپین‌ها ابتدا حساب تلگرام خود را متصل کنید</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(botLink, "_blank")}
              className="gap-1.5"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              اتصال سریع
            </Button>
            <Link href="/workspace/settings/telegram">
              <Button size="sm" variant="ghost" className="gap-1.5">
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-warning/20">
          <p className="text-[12px] text-text-tertiary mb-3">یا از همینجا متصل کنید:</p>
          <TelegramLoginWidget
            botUsername={BOT_USERNAME}
            onAuth={handleWidgetAuth}
            onError={setWidgetError}
            size="medium"
          />
          {widgetError && (
            <p className="text-[11px] text-text-tertiary mt-2">{widgetError}</p>
          )}
        </div>

        {linkError && (
          <div className="mt-3 rounded-lg bg-danger/10 p-2.5 text-[12px] text-danger">
            {linkError}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={`border-warning/30 ${className}`} dir="rtl">
      <CardContent className="p-5">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0088cc]/10 text-[#0088cc]">
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">اتصال حساب تلگرام</h3>
            <p className="text-sm text-text-tertiary mt-1">
              برای استفاده از کمپین‌ها، پلتفرم‌ها و بات‌های محتوا، شناسه تلگرام خود را متصل کنید.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.open(botLink, "_blank")}
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              اتصال از طریق ربات
            </Button>
            <Link href="/workspace/settings/telegram">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Settings className="h-4 w-4" />
                تنظیمات تلگرام
              </Button>
            </Link>
          </div>

          {linkError && (
            <div className="rounded-lg bg-danger/10 p-3 text-sm text-danger">
              {linkError}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
