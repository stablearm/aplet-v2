"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft, Sparkles, Check, Minus, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { CAMPAIGN_LIMITS, CAMPAIGN_COST_PER_MEMBER } from "@/lib/constants";

function formatToman(n: number): string {
  return n.toLocaleString("fa-IR");
}

function formatMembers(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function HeroOrderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [channel, setChannel] = useState("");
  const [memberCount, setMemberCount] = useState(5000);
  const [isDragging, setIsDragging] = useState(false);
  const [channelFocused, setChannelFocused] = useState(false);

  const totalCost = memberCount * CAMPAIGN_COST_PER_MEMBER;
  const percentage = ((memberCount - CAMPAIGN_LIMITS.MIN_TARGET) / (CAMPAIGN_LIMITS.MAX_TARGET - CAMPAIGN_LIMITS.MIN_TARGET)) * 100;

  const handleSliderInteraction = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    // RTL: 0% is on the right, 100% is on the left
    const ratio = (rect.right - clientX) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    const raw = CAMPAIGN_LIMITS.MIN_TARGET + clamped * (CAMPAIGN_LIMITS.MAX_TARGET - CAMPAIGN_LIMITS.MIN_TARGET);
    const stepped = Math.round(raw / 1000) * 1000;
    setMemberCount(Math.max(CAMPAIGN_LIMITS.MIN_TARGET, Math.min(CAMPAIGN_LIMITS.MAX_TARGET, stepped)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleSliderInteraction(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleOrder = () => {
    if (!channel.trim()) return;
    const ch = channel.replace(/^@/, "");
    if (isAuthenticated) {
      router.push(`/workspace/campaigns/new?channel=${encodeURIComponent(ch)}&members=${memberCount}`);
    } else {
      router.push(`/register?returnTo=${encodeURIComponent(`/workspace/campaigns/new?channel=${encodeURIComponent(ch)}&members=${memberCount}`)}`);
    }
  };

  const stepDown = () => setMemberCount((v) => Math.max(CAMPAIGN_LIMITS.MIN_TARGET, v - 1000));
  const stepUp = () => setMemberCount((v) => Math.min(CAMPAIGN_LIMITS.MAX_TARGET, v + 1000));

  const quickSelects = [1000, 5000, 10000, 25000, 50000];

  return (
    <div className="relative rounded-3xl border border-border/50 bg-surface shadow-2xl shadow-black/[0.08] overflow-hidden dark:border-white/[0.08] dark:bg-[#0f1120]/80 dark:shadow-black/40">
      {/* Subtle gradient accents */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/[0.07] rounded-full blur-[80px] pointer-events-none dark:bg-primary/20" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/[0.05] rounded-full blur-[60px] pointer-events-none dark:bg-accent/15" />

      <div className="relative p-5 md:p-6 space-y-5">
        {/* ─── Channel Input ─── */}
        <div>
          <label className="text-xs font-semibold text-text-primary block mb-2">کانال مقصد</label>
          <div
            className={`flex items-center rounded-2xl border transition-all duration-300 overflow-hidden ${
              channelFocused
                ? "border-primary/50 bg-primary/[0.03] ring-2 ring-primary/10 dark:bg-primary/[0.06] dark:shadow-lg dark:shadow-primary/10"
                : "border-border/50 bg-background/50 dark:border-white/[0.06] dark:bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 shrink-0">
              {channel ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Send className={`h-4 w-4 transition-colors duration-300 ${channelFocused ? "text-primary" : "text-text-tertiary"}`} />
              )}
            </div>
            <input
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, ""))}
              onFocus={() => setChannelFocused(true)}
              onBlur={() => setChannelFocused(false)}
              placeholder="channel_name"
              dir="ltr"
              className="flex-1 h-12 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-tertiary outline-none min-w-0"
            />
            <div className="flex items-center gap-1 px-3 h-12 shrink-0 border-l border-border/30 dark:border-white/[0.06]">
              <span className={`text-sm font-medium transition-colors duration-300 ${channelFocused || channel ? "text-primary" : "text-text-tertiary"}`}>@</span>
            </div>
          </div>
          {/* Live preview */}
          {channel && (
            <p className="mt-2 text-xs text-text-secondary">
              t.me/<span className="font-semibold text-primary">{channel}</span>
            </p>
          )}
        </div>

        {/* ─── Member Slider ─── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-text-primary">تعداد اعضا</label>
            <span className="text-xl font-extrabold text-text-primary tabular-nums">
              {formatMembers(memberCount)}
            </span>
          </div>

          {/* Slider with +/- buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={stepDown}
              className="w-8 h-8 rounded-full border border-border/50 bg-background/50 flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-primary/10"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <div
              ref={sliderRef}
              className="relative flex-1 h-10 flex items-center cursor-pointer select-none touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Track */}
              <div className="absolute inset-x-0 h-2 rounded-full bg-border/40 dark:bg-white/[0.06]" />
              {/* Fill — grows from right (RTL start) */}
              <div
                className="absolute h-2 rounded-full bg-gradient-to-l from-primary to-accent"
                style={{ right: 0, width: `${percentage}%` }}
              />
              {/* Glow */}
              <div
                className="absolute h-4 rounded-full bg-primary/15 blur-sm dark:bg-primary/20"
                style={{ right: 0, width: `${percentage}%` }}
              />
              {/* Thumb */}
              <div
                className={`absolute w-5 h-5 rounded-full bg-primary shadow-md shadow-primary/30 transition-transform duration-100 z-10 pointer-events-none ${
                  isDragging ? "scale-125" : ""
                }`}
                style={{ right: `calc(${percentage}% - 10px)` }}
              >
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[#0f1120]" />
              </div>
            </div>

            <button
              onClick={stepUp}
              className="w-8 h-8 rounded-full border border-border/50 bg-background/50 flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-primary/10"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Min/Max */}
          <div className="flex justify-between mt-1.5 px-11">
            <span className="text-[10px] text-text-tertiary tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MAX_TARGET)}</span>
            <span className="text-[10px] text-text-tertiary tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MIN_TARGET)}</span>
          </div>

          {/* Quick select */}
          <div className="flex gap-2 mt-3">
            {quickSelects.map((n) => (
              <button
                key={n}
                onClick={() => setMemberCount(n)}
                className={`flex-1 text-[11px] py-2 rounded-xl font-semibold transition-all duration-200 ${
                  memberCount === n
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-background border border-border/40 text-text-secondary hover:bg-primary/5 hover:border-primary/20 hover:text-primary dark:bg-white/[0.04] dark:border-white/[0.06] dark:text-white/40 dark:hover:bg-white/[0.08] dark:hover:text-white/70"
                }`}
              >
                {formatMembers(n)}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Price + CTA ─── */}
        <div className="rounded-2xl border border-border/40 bg-background/60 p-4 space-y-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
          {/* Price */}
          <div className="text-center">
            <p className="text-[11px] font-medium text-text-tertiary mb-1">هزینه کل</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-2xl md:text-3xl font-extrabold text-text-primary tabular-nums">{formatToman(totalCost)}</span>
              <span className="text-sm font-medium text-text-secondary">تومان</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleOrder}
            disabled={!channel.trim()}
            className="w-full flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-gradient-to-l from-primary via-primary to-accent text-[15px] font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAuthenticated ? (
              <>
                ثبت سفارش فوری
                <ArrowLeft className="h-4 w-4" />
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                شروع کنید
                <ArrowLeft className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-text-tertiary">
            {isAuthenticated ? "پرداخت از کیف پول • فوری" : "ثبت‌نام رایگان • پرداخت بعد از نتیجه"}
          </p>
        </div>
      </div>
    </div>
  );
}
