"use client";

import { useState, useCallback } from "react";
import { ExternalLink, Check, Copy, MessageCircle, Smartphone } from "lucide-react";
import { useProfile, useLinkTelegram } from "@/features/settings/hooks/use-settings";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TelegramLoginWidget } from "@/components/telegram-login-widget";

const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "apletbot";

export default function SettingsTelegramPage() {
  const { data: profile, isLoading } = useProfile();
  const linkTelegram = useLinkTelegram();
  const [linkError, setLinkError] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const botLink = profile?.id
    ? `https://t.me/${BOT_USERNAME}?start=${profile.id}`
    : `https://t.me/${BOT_USERNAME}`;

  const handleDeepLink = () => {
    window.open(botLink, "_blank");
  };

  const copyBotLink = async () => {
    try {
      await navigator.clipboard.writeText(botLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = botLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
      } catch (err) {
        const apiError = err as { message?: string };
        setLinkError(apiError.message || "خطا در اتصال تلگرام. لطفاً دوباره تلاش کنید.");
      }
    },
    [linkTelegram]
  );

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base">حساب تلگرام</CardTitle>
        <CardDescription>اتصال حساب تلگرام به پلتفرم</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">شناسه تلگرام</span>
              <div className="flex items-center gap-2">
                {profile?.telegramId ? (
                  <>
                    <Badge variant="success">متصل</Badge>
                    <span className="text-sm font-mono">{profile.telegramId}</span>
                  </>
                ) : (
                  <Badge variant="warning">متصل نیست</Badge>
                )}
              </div>
            </div>

            {linkError && (
              <div className="rounded-xl bg-danger/10 p-3 text-sm text-danger">
                {linkError}
              </div>
            )}

            {/* Not connected: show linking options */}
            {!profile?.telegramId && (
              <div className="space-y-4">
                <p className="text-[13px] text-text-tertiary">
                  برای استفاده از کمپین‌ها، پلتفرم‌ها و بات‌های محتوا، شناسه تلگرام خود را متصل کنید.
                </p>

                {/* Method 1: Bot Deep Link */}
                <div className="rounded-xl border border-border/40 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0088cc]/10 text-[#0088cc]">
                      <MessageCircle className="h-3.5 w-3.5" />
                    </div>
                    <h4 className="text-[13px] font-semibold text-text-primary">روش اول: اتصال از طریق ربات</h4>
                  </div>
                  <p className="text-[12px] text-text-tertiary leading-relaxed">
                    روی دکمه زیر کلیک کنید تا ربات تلگرام باز شود. سپس دکمه <strong>شروع</strong> را بزنید تا اتصال خودکار انجام شود.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeepLink}
                      className="gap-1.5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      باز کردن ربات تلگرام
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyBotLink}
                      className="gap-1.5 text-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-success" />
                          کپی شد
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          کپی لینک
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Method 2: Mini App */}
                <div className="rounded-xl border border-border/40 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0088cc]/10 text-[#0088cc]">
                      <Smartphone className="h-3.5 w-3.5" />
                    </div>
                    <h4 className="text-[13px] font-semibold text-text-primary">روش دوم: اتصال از طریق اپلیکیشن تلگرام</h4>
                  </div>
                  <p className="text-[12px] text-text-tertiary leading-relaxed">
                    اگر از تلگرام استفاده می‌کنید، اپلیکیشن آپلت را باز کنید تا اتصال به صورت خودکار انجام شود.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeepLink}
                    className="gap-1.5"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    باز کردن در تلگرام
                  </Button>
                </div>

                {/* Method 3: Login Widget */}
                <div className="rounded-xl border border-border/40 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0088cc]/10 text-[#0088cc]">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <h4 className="text-[13px] font-semibold text-text-primary">روش سوم: اتصال از طریق ویجت</h4>
                  </div>
                  <p className="text-[12px] text-text-tertiary leading-relaxed">
                    با کلیک روی دکمه زیر، هویت شما در تلگرام تأیید و حساب متصل می‌شود.
                  </p>
                  <TelegramLoginWidget
                    botUsername={BOT_USERNAME}
                    onAuth={handleWidgetAuth}
                    onError={setWidgetError}
                    size="large"
                  />
                  {widgetError && (
                    <p className="text-[11px] text-text-tertiary mt-2">{widgetError}</p>
                  )}
                </div>
              </div>
            )}

            {/* Connected: show info */}
            {profile?.telegramId && (
              <div className="rounded-xl border border-success/20 bg-success/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <p className="text-sm text-success font-semibold">
                    حساب تلگرام شما متصل است.
                  </p>
                </div>
                <p className="text-[12px] text-text-tertiary">
                  شناسه تلگرام شما برای تمام APIهای پلتفرم استفاده می‌شود.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
