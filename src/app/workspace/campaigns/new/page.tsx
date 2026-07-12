"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Send, Bot, CheckCircle2, Copy, ExternalLink, ArrowLeft, ArrowRight,
  Loader2, Shield, Users, CreditCard, Check, AlertCircle, Sparkles,
  Search, MessageCircle, Settings, RefreshCw,
} from "lucide-react";
import { useCreateCampaign, useCampaignPricing } from "@/features/campaigns/hooks/use-campaigns";
import { useProfile } from "@/features/settings/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CAMPAIGN_LIMITS } from "@/lib/constants";
import { apiRequest } from "@/lib/api-client";

const BOT_USERNAME = "safevalidatorbot";

// RTL step order: rightmost = step 1, leftmost = step 4
const steps = [
  { id: 1, label: "کانال", icon: Send },
  { id: 2, label: "اتصال ربات", icon: Bot },
  { id: 3, label: "جزئیات", icon: Users },
  { id: 4, label: "تسویه", icon: CreditCard },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8" dir="rtl">
      {[...steps].reverse().map((step, i) => {
        const isActive = step.id === current;
        const isDone = step.id < current;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isDone
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15"
                      : "bg-gray-100 text-gray-400 dark:bg-white/[0.06] dark:text-white/25"
                }`}
              >
                {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <span className={`text-[11px] font-semibold transition-colors ${
                isActive ? "text-primary" : isDone ? "text-emerald-500" : "text-gray-400 dark:text-white/25"
              }`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-10 md:w-16 h-0.5 rounded-full mb-6 mx-1 transition-colors ${
                step.id < current ? "bg-emerald-500" : "bg-gray-200 dark:bg-white/[0.06]"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createMutation = useCreateCampaign();
  const { data: pricing } = useCampaignPricing();

  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [memberCount, setMemberCount] = useState(5000);
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [botFound, setBotFound] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const ch = searchParams.get("channel");
    const members = searchParams.get("members");
    if (ch) setChannel(ch);
    if (members) {
      const n = parseInt(members, 10);
      if (!isNaN(n)) setMemberCount(n);
    }
  }, [searchParams]);

  const totalCost = memberCount * (pricing?.totalPerMember || 500);
  const costPerMember = pricing?.totalPerMember || 500;

  const copyBot = useCallback(() => {
    navigator.clipboard.writeText(`@${BOT_USERNAME}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  // Step 1 → 2: Create campaign then check bot
  const goStep2 = async () => {
    if (!channel.trim()) return;
    setError(null);
    setCreating(true);
    try {
      const response = await createMutation.mutateAsync({
        channelUsername: channel.replace(/^@/, ""),
        targetSubscriberCount: memberCount,
        name: `کمپین ${channel}`,
      });
      setCampaignId(response.id);

      // Check if bot is already in channel
      setChecking(true);
      setStep(2);
      try {
        const result = await apiRequest<{ hasBot: boolean }>(`/api/v1/campaigns/${response.id}/check-bot`);
        setBotFound(result.hasBot);
      } catch {
        setBotFound(false);
      } finally {
        setChecking(false);
      }
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message || "خطا در ایجاد کمپین");
    } finally {
      setCreating(false);
    }
  };

  // Step 2 → 3: If bot found, skip. If not, verify.
  const goStep3 = async () => {
    if (botFound) {
      setVerified(true);
      setStep(3);
      return;
    }
    if (!campaignId) return;
    setVerifying(true);
    setError(null);
    try {
      await apiRequest(`/api/v1/campaigns/${campaignId}/verify`, { method: "POST" });
      setVerified(true);
      setStep(3);
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message || "تأیید ناموفق بود. لطفاً مطمئن شوید ربات را به عنوان ادمین به کانال اضافه کرده‌اید.");
    } finally {
      setVerifying(false);
    }
  };

  const goStep4 = () => {
    if (!campaignName.trim()) return;
    setStep(4);
  };

  const handleFinalSubmit = () => {
    if (campaignId) router.push(`/workspace/campaigns/${campaignId}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-text-primary">ایجاد کمپین</h1>
        <p className="text-sm text-text-secondary mt-1">کمپین عضوگیری خود را در ۴ مرحله بسازید</p>
      </div>

      <StepIndicator current={step} />

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ═══ Step 1: Channel ═══ */}
      {step === 1 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">کانال مقصد</h2>
              <p className="text-xs text-text-secondary">نام کانال تلگرامی که می‌خواهید برای آن کمپین بسازید وارد کنید</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1.5">نام کانال</label>
            <div className="flex items-center rounded-xl border border-border/50 bg-background focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="text-sm font-medium text-text-tertiary pr-4 pl-1">@</span>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, ""))}
                placeholder="mychannel"
                dir="ltr"
                className="flex-1 h-12 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-tertiary outline-none"
              />
            </div>
            {channel && (
              <p className="mt-2 text-xs text-text-secondary">
                t.me/<span className="font-semibold text-primary">{channel}</span>
              </p>
            )}
          </div>

          <div className="flex justify-start">
            <Button onClick={goStep2} disabled={!channel.trim() || creating} className="gap-2">
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowLeft className="h-4 w-4" />}
              ادامه
            </Button>
          </div>
        </div>
      )}

      {/* ═══ Step 2: Bot Verification ═══ */}
      {step === 2 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 space-y-5">
          {checking ? (
            /* ─── Checking State ─── */
            <div className="text-center py-10 space-y-4">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-7 w-7 text-primary animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-1">در حال بررسی کانال...</h3>
                <p className="text-xs text-text-secondary">سیستم در حال بررسی وجود ربات در کانال <span className="font-semibold text-primary">@{channel}</span> است</p>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          ) : botFound ? (
            /* ─── Bot Already Connected ─── */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary mb-1">ربات قبلاً متصل است</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                  ربات تأیید در کانال <span className="font-semibold text-primary">@{channel}</span> شناسایی شد. نیازی به انجام کار اضافی نیست.
                </p>
              </div>
              <Button onClick={goStep3} className="gap-2">
                ادامه
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            /* ─── Bot Not Found — Instructions ─── */
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-text-primary">اتصال ربات تأیید</h2>
                  <p className="text-xs text-text-secondary">
                    برای فعال‌سازی کمپین، ربات تأیید باید به کانال شما اضافه شود تا بتوانیم صحت ادمین بودن شما را بررسی کنیم
                  </p>
                </div>
              </div>

              {/* Step-by-step instructions */}
              <div className="space-y-3">
                {/* Step 1: Add bot */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">۱</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text-primary mb-1">ربات را به کانال اضافه کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        به تنظیمات کانال <span className="font-semibold">@{channel}</span> بروید، بخش ادمین‌ها را باز کنید و ربات زیر را به عنوان ادمین جستجو و اضافه کنید:
                      </p>
                      <button
                        onClick={copyBot}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/10 hover:bg-primary/15 transition-all text-xs font-mono font-semibold text-primary"
                      >
                        @{BOT_USERNAME}
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Permissions */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">۲</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">دسترسی‌های لازم را فعال کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        هنگام اضافه کردن ربات، گزینه <span className="font-semibold">«افزودن ادمین‌های جدید»</span> را روشن کنید. این دسترسی فقط برای تأیید هویت شما لازم است و ربات هیچ عمل دیگری در کانال انجام نمی‌دهد.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Verify */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">۳</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary mb-1">تأیید کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        پس از اضافه کردن ربات، دکمه تأیید را بزنید. سیستم به صورت خودکار کانال شما را بررسی می‌کند و نتیجه را نمایش می‌دهد.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open bot button */}
              <a
                href={`https://t.me/${BOT_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border/50 bg-background text-sm font-medium text-text-primary hover:bg-surface hover:border-primary/30 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                باز کردن ربات در تلگرام
                <ExternalLink className="h-3.5 w-3.5 text-text-tertiary" />
              </a>

              {/* Actions */}
              <div className="flex justify-between pt-1">
                <Button variant="ghost" onClick={() => setStep(1)} className="gap-1.5">
                  <ArrowRight className="h-4 w-4" />
                  بازگشت
                </Button>
                <Button onClick={goStep3} disabled={verifying} className="gap-2">
                  {verifying ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />در حال تأیید...</>
                  ) : (
                    <>تأیید کانال</>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══ Step 3: Campaign Details ═══ */}
      {step === 3 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">جزئیات کمپین</h2>
              <p className="text-xs text-text-secondary">نام کمپین و تعداد اعضای مورد نظر خود را مشخص کنید</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1.5">نام کمپین</label>
              <Input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="مثال: تبلیغات تابستان ۱۴۰۴"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1.5">تعداد عضو هدف</label>
              <Input
                type="number"
                min={CAMPAIGN_LIMITS.MIN_TARGET}
                max={CAMPAIGN_LIMITS.MAX_TARGET}
                step={1000}
                value={memberCount}
                onChange={(e) => setMemberCount(parseInt(e.target.value) || CAMPAIGN_LIMITS.MIN_TARGET)}
              />
              <p className="text-[11px] text-text-tertiary mt-1">
                حداقل {CAMPAIGN_LIMITS.MIN_TARGET.toLocaleString("fa-IR")} و حداکثر {CAMPAIGN_LIMITS.MAX_TARGET.toLocaleString("fa-IR")} عضو
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-1">
            <Button variant="ghost" onClick={() => setStep(2)} className="gap-1.5">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={goStep4} disabled={!campaignName.trim()} className="gap-2">
              ادامه
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ═══ Step 4: Invoice ═══ */}
      {step === 4 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">خلاصه سفارش</h2>
              <p className="text-xs text-text-secondary">اطلاعات کمپین خود را بررسی و تأیید کنید</p>
            </div>
          </div>

          <div className="rounded-xl border border-border/30 bg-background/50 divide-y divide-border/30">
            <div className="flex items-center justify-between p-3.5">
              <span className="text-xs text-text-secondary">کانال مقصد</span>
              <span className="text-sm font-semibold text-text-primary">@{channel}</span>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="text-xs text-text-secondary">نام کمپین</span>
              <span className="text-sm font-semibold text-text-primary">{campaignName}</span>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="text-xs text-text-secondary">تعداد عضو</span>
              <span className="text-sm font-semibold text-text-primary">{memberCount.toLocaleString("fa-IR")}</span>
            </div>
            <div className="flex items-center justify-between p-3.5">
              <span className="text-xs text-text-secondary">هزینه هر عضو</span>
              <span className="text-sm text-text-primary">{costPerMember.toLocaleString("fa-IR")} تومان</span>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-primary">هزینه کل</span>
              <span className="text-xl font-extrabold text-primary tabular-nums">{totalCost.toLocaleString("fa-IR")} تومان</span>
            </div>
          </div>

          <div className="flex justify-between pt-1">
            <Button variant="ghost" onClick={() => setStep(3)} className="gap-1.5">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={handleFinalSubmit} className="gap-2 bg-gradient-to-l from-primary to-accent">
              تأیید و مشاهده کمپین
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
