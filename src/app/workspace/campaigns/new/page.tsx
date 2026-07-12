"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Send, Bot, CheckCircle2, Copy, ExternalLink, ArrowLeft, ArrowRight,
  Loader2, Shield, Users, CreditCard, Check, AlertCircle,
  Radio, Zap, CircleDot,
} from "lucide-react";
import { useCreateCampaign, useCampaignPricing } from "@/features/campaigns/hooks/use-campaigns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CAMPAIGN_LIMITS } from "@/lib/constants";
import { apiRequest } from "@/lib/api-client";

const BOT_USERNAME = "safevalidatorbot";

/* ──────────── RTL Step Indicator ──────────── */
const stepsMeta = [
  { id: 1, label: "کانال مقصد", icon: Send },
  { id: 2, label: "اتصال ربات", icon: Bot },
  { id: 3, label: "جزئیات کمپین", icon: Users },
  { id: 4, label: "تسویه و تأیید", icon: CreditCard },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-between mb-10 px-2" dir="rtl">
      {stepsMeta.map((s, i) => {
        const active = s.id === current;
        const done = s.id < current;
        const Icon = s.icon;
        return (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                done
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : active
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-100 text-gray-300 dark:bg-white/[0.06] dark:text-white/15"
              }`}>
                {done ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4 md:h-5 md:w-5" />}
                {active && <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />}
              </div>
              <span className={`text-[10px] md:text-[11px] font-bold text-center whitespace-nowrap transition-colors ${
                active ? "text-primary" : done ? "text-emerald-500" : "text-gray-300 dark:text-white/15"
              }`}>{s.label}</span>
            </div>
            {i < stepsMeta.length - 1 && (
              <div className={`w-6 md:w-12 h-[2px] rounded-full mt-[-20px] mx-0.5 shrink-0 ${
                done ? "bg-emerald-500" : "bg-gray-200 dark:bg-white/[0.06]"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────── Checking Animation ──────────── */
function CheckingAnimation({ channel }: { channel: string }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="text-center py-12 space-y-6">
      <div className="relative inline-flex">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Radio className="h-8 w-8 text-primary" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
        <div className="absolute inset-[-8px] rounded-full border border-primary/10 animate-pulse" />
      </div>

      <div>
        <h3 className="text-lg font-extrabold text-text-primary mb-2">در حال بررسی کانال</h3>
        <p className="text-sm text-text-secondary">
          سیستم در حال بررسی وضعیت ربات در کانال <span className="font-bold text-primary">@{channel}</span> است
        </p>
      </div>

      <div className="max-w-xs mx-auto space-y-2">
        {[
          { label: "بررسی اتصال ربات", done: phase >= 1 },
          { label: "تأیید دسترسی‌ها", done: phase >= 2 },
          { label: "آماده‌سازی کمپین", done: phase >= 3 },
        ].map((item, i) => (
          <div key={i} className={`flex items-center gap-2 text-xs transition-all duration-500 ${
            item.done ? "text-emerald-500 opacity-100" : "text-text-tertiary opacity-50"
          }`}>
            {item.done ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <CircleDot className="h-3.5 w-3.5 shrink-0 animate-pulse" />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
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
    const m = searchParams.get("members");
    if (ch) setChannel(ch);
    if (m) { const n = parseInt(m, 10); if (!isNaN(n)) setMemberCount(n); }
  }, [searchParams]);

  const totalCost = memberCount * (pricing?.totalPerMember || 500);
  const costPerMember = pricing?.totalPerMember || 500;

  const copyBot = useCallback(() => {
    navigator.clipboard.writeText(`@${BOT_USERNAME}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  /* ── Step 1 → 2 ── */
  const goStep2 = async () => {
    if (!channel.trim()) return;
    setError(null);
    setCreating(true);
    try {
      const res = await createMutation.mutateAsync({
        channelUsername: channel.replace(/^@/, ""),
        targetSubscriberCount: memberCount,
        name: `کمپین ${channel}`,
      });
      setCampaignId(res.id);
      setStep(2);
      setChecking(true);
      try {
        const r = await apiRequest<{ hasBot: boolean }>(`/api/v1/campaigns/${res.id}/check-bot`);
        setBotFound(r.hasBot);
      } catch { setBotFound(false); }
      finally { setChecking(false); }
    } catch (err) {
      setError((err as { message?: string }).message || "خطا در ایجاد کمپین");
    } finally { setCreating(false); }
  };

  /* ── Step 2 → 3 ── */
  const goStep3 = async () => {
    if (botFound) { setVerified(true); setStep(3); return; }
    if (!campaignId) return;
    setVerifying(true);
    setError(null);
    try {
      await apiRequest(`/api/v1/campaigns/${campaignId}/verify`, { method: "POST" });
      setVerified(true);
      setStep(3);
    } catch (err) {
      setError((err as { message?: string }).message || "تأیید ناموفق بود. لطفاً مطمئن شوید ربات به عنوان ادمین به کانال اضافه شده است.");
    } finally { setVerifying(false); }
  };

  const goStep4 = () => { if (campaignName.trim()) setStep(4); };

  const handleFinalSubmit = () => {
    if (campaignId) router.push(`/workspace/campaigns/${campaignId}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-4" dir="rtl">
      {/* Title */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-extrabold text-text-primary">ایجاد کمپین جدید</h1>
        <p className="text-sm text-text-secondary mt-1.5">کمپین عضوگیری خود را در ۴ مرحله ساده راه‌اندازی کنید</p>
      </div>

      <Stepper current={step} />

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 mb-5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ════════════ Step 1: Channel ════════════ */}
      {step === 1 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-text-primary">کانال مقصد</h2>
              <p className="text-xs text-text-secondary mt-0.5">نام کانال تلگرامی خود را وارد کنید تا فرآیند کمپین آغاز شود</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-secondary block mb-2">نام کانال</label>
            <div dir="ltr" className="flex items-center rounded-xl border border-border/50 bg-background focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
              <span className="text-sm font-bold text-text-tertiary pl-1.5 pr-4">@</span>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, ""))}
                placeholder="mychannel"
                dir="ltr"
                className="flex-1 h-12 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-tertiary outline-none text-left"
              />
            </div>
            {channel && (
              <p dir="ltr" className="mt-2 text-xs text-text-secondary text-left">
                t.me/<span className="font-bold text-primary">{channel}</span>
              </p>
            )}
          </div>

          <div className="flex justify-start">
            <Button onClick={goStep2} disabled={!channel.trim() || creating} className="h-11 px-6 gap-2">
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowLeft className="h-4 w-4" />}
              ادامه
            </Button>
          </div>
        </div>
      )}

      {/* ════════════ Step 2: Bot ════════════ */}
      {step === 2 && (
        <div className="rounded-2xl border border-border/50 bg-surface overflow-hidden">
          {checking ? (
            <CheckingAnimation channel={channel} />
          ) : botFound ? (
            /* ── Bot already connected ── */
            <div className="text-center py-12 px-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-text-primary mb-1.5">ربات در کانال شما فعال است</h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                  ربات تأیید در کانال <span className="font-bold text-primary">@{channel}</span> شناسایی شد و نیازی به انجام کار اضافی نیست. می‌توانید مستقیماً به مرحله بعد بروید.
                </p>
              </div>
              <Button onClick={goStep3} className="h-11 px-8 gap-2">
                ادامه به مرحله بعد
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            /* ── Bot not found — instructions ── */
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-text-primary">اتصال ربات تأیید</h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    برای فعال‌سازی کمپین، ربات تأیید باید به کانال شما اضافه شود تا بتوانیم صحت مالکیت کانال را بررسی کنیم
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                {/* 1: Add bot */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-extrabold text-primary">۱</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary mb-1.5">بات را به عنوان ادمین کانال اضافه کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        وارد تنظیمات کانال <span className="font-bold">@{channel}</span> شوید، بخش ادمین‌ها را باز کنید و نام بات زیر را جستجو کنید تا به عنوان ادمین اضافه شود:
                      </p>
                      <button
                        onClick={copyBot}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/15 active:scale-95 transition-all text-xs font-mono font-bold text-primary"
                      >
                        @{BOT_USERNAME}
                        {copied ? (
                          <span className="flex items-center gap-1 text-emerald-500"><Check className="h-3.5 w-3.5" /> کپی شد</span>
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2: Permissions */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-extrabold text-primary">۲</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary mb-1.5">دسترسی‌های لازم را فعال کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        هنگام اضافه کردن بات، گزینه <span className="font-bold">«مدیریت پیام‌ها»</span> را فعال کنید. این دسترسی به بات اجازه می‌دهد تا اطلاعات اولیه کانال و وضعیت عضویت کاربران را بررسی کند و هیچ تغییری در کانال شما ایجاد نمی‌کند.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3: Verify */}
                <div className="rounded-xl border border-border/30 bg-background/50 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-extrabold text-primary">۳</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary mb-1.5">اتصال را تأیید کنید</p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        پس از اضافه کردن بات، دکمه «تأیید اتصال» را بزنید. سیستم به صورت خودکار کانال شما را بررسی می‌کند و نتیجه را نمایش می‌دهد.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open bot in Telegram */}
              <a
                href={`https://t.me/${BOT_USERNAME}?start=verify_${channel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full h-12 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/20 text-sm font-bold text-[#229ED9] hover:bg-[#229ED9]/15 transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                باز کردن بات در تلگرام
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {/* Actions */}
              <div className="flex justify-between items-center pt-1">
                <Button variant="ghost" onClick={() => setStep(1)} className="gap-1.5 text-text-secondary">
                  <ArrowRight className="h-4 w-4" />
                  بازگشت
                </Button>
                <Button onClick={goStep3} disabled={verifying} className="h-11 px-6 gap-2">
                  {verifying ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />در حال بررسی...</>
                  ) : (
                    <>تأیید اتصال</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════ Step 3: Details ════════════ */}
      {step === 3 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-text-primary">جزئیات کمپین</h2>
              <p className="text-xs text-text-secondary mt-0.5">نام کمپین و تعداد اعضای مورد نظر خود را وارد کنید</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-2">نام کمپین</label>
              <Input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="مثال: تبلیغات تابستان ۱۴۰۴"
                className="h-12"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-text-secondary block mb-2">تعداد عضو هدف</label>
              <Input
                type="number"
                min={CAMPAIGN_LIMITS.MIN_TARGET}
                max={CAMPAIGN_LIMITS.MAX_TARGET}
                step={1000}
                value={memberCount}
                onChange={(e) => setMemberCount(parseInt(e.target.value) || CAMPAIGN_LIMITS.MIN_TARGET)}
                className="h-12"
              />
              <p className="text-[11px] text-text-tertiary mt-1.5">
                حداقل {CAMPAIGN_LIMITS.MIN_TARGET.toLocaleString("fa-IR")} و حداکثر {CAMPAIGN_LIMITS.MAX_TARGET.toLocaleString("fa-IR")} عضو
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <Button variant="ghost" onClick={() => setStep(2)} className="gap-1.5 text-text-secondary">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={goStep4} disabled={!campaignName.trim()} className="h-11 px-6 gap-2">
              ادامه
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ════════════ Step 4: Invoice ════════════ */}
      {step === 4 && (
        <div className="rounded-2xl border border-border/50 bg-surface p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-text-primary">خلاصه سفارش و تأیید نهایی</h2>
              <p className="text-xs text-text-secondary mt-0.5">اطلاعات کمپین خود را بررسی کنید و سفارش را ثبت کنید</p>
            </div>
          </div>

          <div className="rounded-xl border border-border/30 bg-background/50 divide-y divide-border/30">
            {[
              ["کانال مقصد", `@${channel}`],
              ["نام کمپین", campaignName],
              ["تعداد عضو هدف", `${memberCount.toLocaleString("fa-IR")} نفر`],
              ["هزینه هر عضو", `${costPerMember.toLocaleString("fa-IR")} تومان`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between p-4">
                <span className="text-xs text-text-secondary">{label}</span>
                <span className="text-sm font-bold text-text-primary">{value}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-text-primary">هزینه کل کمپین</span>
              <div className="text-left">
                <span className="text-2xl font-extrabold text-primary tabular-nums">{totalCost.toLocaleString("fa-IR")}</span>
                <span className="text-sm font-bold text-primary mr-1">تومان</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <Button variant="ghost" onClick={() => setStep(3)} className="gap-1.5 text-text-secondary">
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Button>
            <Button onClick={handleFinalSubmit} className="h-12 px-8 gap-2 bg-gradient-to-l from-primary to-accent text-white shadow-lg shadow-primary/25">
              ثبت نهایی سفارش
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
