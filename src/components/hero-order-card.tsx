"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft, Sparkles, Check } from "lucide-react";
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
    const rtl = document.documentElement.dir === "rtl";
    let ratio = rtl
      ? (rect.right - clientX) / rect.width
      : (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    const raw = CAMPAIGN_LIMITS.MIN_TARGET + ratio * (CAMPAIGN_LIMITS.MAX_TARGET - CAMPAIGN_LIMITS.MIN_TARGET);
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

  const quickSelects = [1000, 5000, 10000, 25000, 50000];

  return (
    <div className="relative rounded-3xl border border-white/[0.08] bg-[#0f1120]/80 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/15 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative p-5 md:p-6 space-y-5">
        {/* ─── Channel Input ─── */}
        <div>
          <label className="text-[11px] font-medium text-white/40 block mb-2 uppercase tracking-wider">کانال مقصد</label>
          <div
            className={`flex items-center gap-0 rounded-2xl border transition-all duration-300 overflow-hidden ${
              channelFocused
                ? "border-primary/60 bg-white/[0.06] shadow-lg shadow-primary/10"
                : "border-white/[0.06] bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 shrink-0">
              <Send className={`h-4 w-4 transition-colors duration-300 ${channelFocused ? "text-primary" : "text-white/25"}`} />
            </div>
            <div className="flex-1 flex items-center h-12 min-w-0">
              <span className={`text-sm font-medium shrink-0 transition-colors duration-300 ${channel ? "text-primary" : "text-white/20"}`}>@</span>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, ""))}
                onFocus={() => setChannelFocused(true)}
                onBlur={() => setChannelFocused(false)}
                placeholder="channel_name"
                dir="ltr"
                className="flex-1 h-full bg-transparent text-sm font-medium text-white placeholder:text-white/15 outline-none px-1 min-w-0"
              />
            </div>
            {channel && (
              <div className="flex items-center justify-center w-12 h-12 shrink-0">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
            )}
          </div>
        </div>

        {/* ─── Member Slider ─── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-medium text-white/40 uppercase tracking-wider">تعداد اعضا</label>
            <span className="text-lg font-bold text-white tabular-nums">
              {formatMembers(memberCount)}
            </span>
          </div>

          {/* Custom slider track */}
          <div
            ref={sliderRef}
            className="relative h-12 flex items-center cursor-pointer select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Track background */}
            <div className="absolute inset-x-0 h-2 rounded-full bg-white/[0.06]" />
            {/* Track fill */}
            <div
              className="absolute h-2 rounded-full bg-gradient-to-l from-primary via-primary to-accent transition-none"
              style={{ width: `${percentage}%` }}
            />
            {/* Glow on fill */}
            <div
              className="absolute h-4 rounded-full bg-primary/20 blur-sm transition-none"
              style={{ width: `${percentage}%` }}
            />
            {/* Thumb */}
            <div
              className={`absolute w-5 h-5 rounded-full bg-white shadow-lg shadow-primary/40 transition-transform duration-100 z-10 -translate-x-1/2 ${
                isDragging ? "scale-125" : ""
              }`}
              style={{ left: `${percentage}%` }}
            >
              <div className="absolute inset-1 rounded-full bg-primary" />
            </div>
          </div>

          {/* Min/Max labels */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-white/25 tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MIN_TARGET)}</span>
            <span className="text-[10px] text-white/25 tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MAX_TARGET)}</span>
          </div>

          {/* Quick select */}
          <div className="flex gap-2 mt-3">
            {quickSelects.map((n) => (
              <button
                key={n}
                onClick={() => setMemberCount(n)}
                className={`flex-1 text-[11px] py-2 rounded-xl font-medium transition-all duration-200 ${
                  memberCount === n
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white/[0.04] text-white/35 hover:bg-white/[0.08] hover:text-white/60"
                }`}
              >
                {formatMembers(n)}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Price + CTA ─── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-4">
          {/* Price display */}
          <div className="text-center">
            <p className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">هزینه کل</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-extrabold text-white tabular-nums">{formatToman(totalCost)}</span>
              <span className="text-sm font-medium text-white/40">تومان</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleOrder}
            disabled={!channel.trim()}
            className="w-full flex items-center justify-center gap-2.5 h-13 rounded-2xl bg-gradient-to-l from-primary via-primary to-accent text-[15px] font-bold text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-xl"
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

          <p className="text-center text-[10px] text-white/20">
            {isAuthenticated ? "پرداخت از کیف پول • فوری" : "ثبت‌نام رایگان • پرداخت بعد از نتیجه"}
          </p>
        </div>
      </div>
    </div>
  );
}
