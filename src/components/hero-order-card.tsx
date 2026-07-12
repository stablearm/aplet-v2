"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowLeft, Sparkles, Check, Minus, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
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
  const { theme } = useUIStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [channel, setChannel] = useState("");
  const [memberCount, setMemberCount] = useState(5000);
  const [isDragging, setIsDragging] = useState(false);
  const [channelFocused, setChannelFocused] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const totalCost = memberCount * CAMPAIGN_COST_PER_MEMBER;
  const percentage = ((memberCount - CAMPAIGN_LIMITS.MIN_TARGET) / (CAMPAIGN_LIMITS.MAX_TARGET - CAMPAIGN_LIMITS.MIN_TARGET)) * 100;

  // Resolve actual theme (handles "system")
  useEffect(() => {
    const resolve = () => {
      if (theme === "dark") return "dark";
      if (theme === "light") return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };
    setResolvedTheme(resolve());
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => setResolvedTheme(resolve());
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const isDark = resolvedTheme === "dark";

  const handleSliderInteraction = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
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
    <div
      className={`relative rounded-3xl overflow-hidden transition-colors duration-300 ${
        isDark
          ? "border border-white/[0.08] bg-[#0f1120]/90 shadow-2xl shadow-black/40"
          : "border border-gray-200 bg-white shadow-xl shadow-gray-200/60"
      }`}
    >
      {/* Background accents */}
      <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none ${
        isDark ? "bg-primary/20" : "bg-primary/[0.08]"
      }`} />
      <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] pointer-events-none ${
        isDark ? "bg-accent/15" : "bg-accent/[0.06]"
      }`} />

      <div className="relative p-5 md:p-6 space-y-5">
        {/* ─── Channel Input ─── */}
        <div>
          <label className={`text-xs font-semibold block mb-2 ${isDark ? "text-white/60" : "text-gray-500"}`}>
            کانال مقصد
          </label>
          <div
            dir="ltr"
            className={`flex items-center rounded-xl transition-all duration-300 overflow-hidden ${
              channelFocused
                ? isDark
                  ? "border border-primary/50 bg-white/[0.06] ring-2 ring-primary/10"
                  : "border border-primary/40 bg-primary/[0.03] ring-2 ring-primary/10"
                : isDark
                  ? "border border-white/[0.08] bg-white/[0.04]"
                  : "border border-gray-200 bg-gray-50"
            }`}
          >
            <div className={`flex items-center justify-center w-11 h-11 shrink-0 ${
              isDark ? "border-l border-white/[0.06]" : "border-l border-gray-200"
            }`}>
              <span className={`text-sm font-semibold ${channelFocused || channel ? "text-primary" : isDark ? "text-white/25" : "text-gray-400"}`}>@</span>
            </div>
            <input
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value.replace(/^@/, "").replace(/[^a-zA-Z0-9_]/g, ""))}
              onFocus={() => setChannelFocused(true)}
              onBlur={() => setChannelFocused(false)}
              placeholder="channel_name"
              dir="ltr"
              className={`flex-1 h-11 bg-transparent text-sm font-medium outline-none min-w-0 px-3 ${
                isDark ? "text-white placeholder:text-white/20" : "text-gray-900 placeholder:text-gray-400"
              }`}
            />
            <div className="flex items-center justify-center w-11 h-11 shrink-0">
              {channel ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Send className={`h-4 w-4 ${isDark ? "text-white/20" : "text-gray-300"}`} />
              )}
            </div>
          </div>
          {channel && (
            <p className={`mt-1.5 text-[11px] ${isDark ? "text-white/30" : "text-gray-400"}`}>
              t.me/<span className="font-semibold text-primary">{channel}</span>
            </p>
          )}
        </div>

        {/* ─── Member Slider ─── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className={`text-xs font-semibold ${isDark ? "text-white/60" : "text-gray-500"}`}>
              تعداد اعضا
            </label>
            <span className={`text-xl font-extrabold tabular-nums ${isDark ? "text-white" : "text-gray-900"}`}>
              {formatMembers(memberCount)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={stepDown}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                isDark
                  ? "border-white/[0.08] bg-white/[0.04] text-white/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                  : "border-gray-200 bg-white text-gray-400 hover:bg-primary/5 hover:border-primary/30 hover:text-primary shadow-sm"
              }`}
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
              <div className={`absolute inset-x-0 h-1.5 rounded-full ${isDark ? "bg-white/[0.08]" : "bg-gray-200"}`} />
              <div
                className="absolute h-1.5 rounded-full bg-gradient-to-l from-primary to-accent"
                style={{ right: 0, width: `${percentage}%` }}
              />
              <div
                className="absolute h-3 rounded-full bg-primary/15 blur-sm"
                style={{ right: 0, width: `${percentage}%` }}
              />
              <div
                className={`absolute w-5 h-5 rounded-full shadow-md transition-transform duration-100 z-10 pointer-events-none ${
                  isDark
                    ? "bg-white shadow-primary/30"
                    : "bg-primary shadow-primary/25 border-2 border-white"
                } ${isDragging ? "scale-125" : ""}`}
                style={{ right: `calc(${percentage}% - 10px)` }}
              >
                <div className={`absolute inset-[3px] rounded-full ${
                  isDark ? "bg-[#0f1120]" : "bg-white"
                }`} />
              </div>
            </div>

            <button
              onClick={stepUp}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                isDark
                  ? "border-white/[0.08] bg-white/[0.04] text-white/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                  : "border-gray-200 bg-white text-gray-400 hover:bg-primary/5 hover:border-primary/30 hover:text-primary shadow-sm"
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className={`flex justify-between mt-1.5 px-11 ${isDark ? "text-white/20" : "text-gray-400"}`}>
            <span className="text-[10px] tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MAX_TARGET)}</span>
            <span className="text-[10px] tabular-nums">{formatMembers(CAMPAIGN_LIMITS.MIN_TARGET)}</span>
          </div>

          <div className="flex gap-2 mt-3">
            {quickSelects.map((n) => (
              <button
                key={n}
                onClick={() => setMemberCount(n)}
                className={`flex-1 text-[11px] py-2 rounded-xl font-semibold transition-all duration-200 ${
                  memberCount === n
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : isDark
                      ? "bg-white/[0.04] text-white/35 hover:bg-white/[0.08] hover:text-white/60"
                      : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-primary/5 hover:border-primary/20 hover:text-primary"
                }`}
              >
                {formatMembers(n)}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Price + CTA ─── */}
        <div className={`rounded-2xl p-4 space-y-4 ${
          isDark
            ? "border border-white/[0.06] bg-white/[0.03]"
            : "border border-gray-100 bg-gray-50/80"
        }`}>
          <div className="text-center">
            <p className={`text-[11px] font-medium mb-1 ${isDark ? "text-white/35" : "text-gray-400"}`}>هزینه کل</p>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className={`text-2xl md:text-3xl font-extrabold tabular-nums ${isDark ? "text-white" : "text-gray-900"}`}>
                {formatToman(totalCost)}
              </span>
              <span className={`text-sm font-medium ${isDark ? "text-white/40" : "text-gray-500"}`}>تومان</span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={!channel.trim()}
            className="w-full flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-gradient-to-l from-primary via-primary to-accent text-[15px] font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAuthenticated ? (
              <>ثبت سفارش فوری<ArrowLeft className="h-4 w-4" /></>
            ) : (
              <><Sparkles className="h-4 w-4" />شروع کنید<ArrowLeft className="h-4 w-4" /></>
            )}
          </button>

          <p className={`text-center text-[11px] ${isDark ? "text-white/20" : "text-gray-400"}`}>
            {isAuthenticated ? "پرداخت از کیف پول • فوری" : "ثبت‌نام رایگان • پرداخت بعد از نتیجه"}
          </p>
        </div>
      </div>
    </div>
  );
}
