"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Zap, TrendingUp, Users, ArrowLeft, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { CAMPAIGN_LIMITS, CAMPAIGN_COST_PER_MEMBER } from "@/lib/constants";

function formatNumber(n: number): string {
  return n.toLocaleString("fa-IR");
}

function formatToman(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function HeroOrderCard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { theme } = useUIStore();
  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [channel, setChannel] = useState("");
  const [memberCount, setMemberCount] = useState(5000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const totalCost = memberCount * CAMPAIGN_COST_PER_MEMBER;
  const costPer1000 = CAMPAIGN_COST_PER_MEMBER * 1000;

  // Animate numbers on change
  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => setIsAnimating(false), 150);
    return () => clearTimeout(t);
  }, [memberCount]);

  const handleOrder = () => {
    if (!channel.trim()) return;
    if (isAuthenticated) {
      router.push(`/workspace/campaigns/new?channel=${encodeURIComponent(channel)}&members=${memberCount}`);
    } else {
      router.push(`/register?returnTo=${encodeURIComponent(`/workspace/campaigns/new?channel=${encodeURIComponent(channel)}&members=${memberCount}`)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleOrder();
  };

  return (
    <div className="relative rounded-2xl border border-border/40 bg-surface shadow-2xl shadow-black/5 overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5 bg-surface-elevated/50">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-[10px] text-text-tertiary mr-2 font-mono">aplet.ir/workspace</span>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* Channel Input */}
        <div className="rounded-xl border border-border/30 bg-background/50 p-3 md:p-4">
          <p className="text-xs font-semibold text-text-primary mb-3 flex items-center gap-1.5">
            <Send className="h-3.5 w-3.5 text-primary" />
            ایجاد کمپین جدید
          </p>
          <div>
            <label className="text-[10px] text-text-tertiary block mb-1.5">کانال مقصد</label>
            <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-surface px-3 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-200">
              <Send className="h-3.5 w-3.5 text-text-tertiary shrink-0" />
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value.replace("@", ""))}
                onKeyDown={handleKeyDown}
                placeholder="mychannel"
                dir="ltr"
                className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-tertiary outline-none min-w-0"
              />
              {channel && (
                <span className="text-[10px] text-primary font-medium shrink-0">@{channel}</span>
              )}
            </div>
          </div>
        </div>

        {/* Member Count Slider */}
        <div className="rounded-xl border border-border/30 bg-background/50 p-3 md:p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] text-text-tertiary">تعداد اعضا</label>
            <span className={`text-xs font-bold text-primary tabular-nums transition-transform duration-150 ${isAnimating ? "scale-105" : ""}`}>
              {formatNumber(memberCount)}
            </span>
          </div>

          <Slider
            min={CAMPAIGN_LIMITS.MIN_TARGET}
            max={CAMPAIGN_LIMITS.MAX_TARGET}
            step={1000}
            value={memberCount}
            onChange={setMemberCount}
          />

          <div className="flex justify-between mt-2">
            <span className="text-[9px] text-text-tertiary">{formatNumber(CAMPAIGN_LIMITS.MIN_TARGET)}</span>
            <span className="text-[10px] text-primary font-semibold tabular-nums">
              {formatToman(totalCost)} تومان
            </span>
            <span className="text-[9px] text-text-tertiary">{formatNumber(CAMPAIGN_LIMITS.MAX_TARGET)}</span>
          </div>

          {/* Quick select buttons */}
          <div className="flex gap-1.5 mt-3">
            {[1000, 5000, 10000, 25000, 50000].map((n) => (
              <button
                key={n}
                onClick={() => setMemberCount(n)}
                className={`flex-1 text-[9px] md:text-[10px] py-1.5 rounded-lg border transition-all duration-150 font-medium ${
                  memberCount === n
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/30 bg-surface hover:border-primary/30 hover:bg-primary/5 text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {formatNumber(n)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/30 bg-background/50 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <p className="text-[10px] text-text-tertiary">اعضای جذب شده</p>
            </div>
            <p className="text-base font-bold text-text-primary tabular-nums">۲,۳۴۰</p>
            <p className="text-[10px] text-emerald-500 font-medium">+۱۲٪ امروز</p>
          </div>
          <div className="rounded-xl border border-border/30 bg-background/50 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="h-3 w-3 text-primary" />
              <p className="text-[10px] text-text-tertiary">کمپین فعال</p>
            </div>
            <p className="text-base font-bold text-text-primary">۳</p>
            <p className="text-[10px] text-primary font-medium">در حال پردازش</p>
          </div>
        </div>

        {/* Cost Summary + CTA */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 md:p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-text-secondary">هزینه هر ۱,۰۰۰ عضو</span>
            <span className="text-[10px] font-medium text-text-primary tabular-nums">{formatToman(costPer1000)} تومان</span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/20">
            <span className="text-xs font-semibold text-text-primary">هزینه کل</span>
            <span className="text-sm font-bold text-primary tabular-nums">{formatToman(totalCost)} تومان</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={!channel.trim()}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-l from-primary to-accent text-sm font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
          >
            {isAuthenticated ? (
              <>
                ثبت سفارش
                <ArrowLeft className="h-4 w-4" />
              </>
            ) : (
              <>
                ورود و ثبت سفارش
                <ArrowLeft className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
