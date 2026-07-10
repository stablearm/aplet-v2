"use client";

import Link from "next/link";
import {
  Radio,
  Bot,
  Store,
  TrendingUp,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { clearTokens } from "@/lib/api-client";

const mainItems = [
  { name: "پلتفرم‌ها", href: "/workspace/platforms", icon: Radio, description: "مدیریت کانال‌های تلگرام", color: "from-[#5B5FEF]/15 to-[#3B82F6]/15", iconColor: "text-[#5B5FEF]" },
  { name: "بات‌های محتوا", href: "/workspace/bots", icon: Bot, description: "بات‌های هوش مصنوعی", color: "from-[#10B981]/15 to-[#059669]/15", iconColor: "text-[#10B981]" },
  { name: "مارکت‌پلیس", href: "/workspace/marketplace", icon: Store, description: "خرید و فروش کانال", color: "from-[#F59E0B]/15 to-[#D97706]/15", iconColor: "text-[#F59E0B]" },
];

const financeItems = [
  { name: "کیف پول", href: "/workspace/wallet", icon: Wallet, description: "مدیریت موجودی", color: "from-[#3B82F6]/15 to-[#2563EB]/15", iconColor: "text-[#3B82F6]" },
  { name: "درآمد", href: "/workspace/revenue", icon: TrendingUp, description: "پیگیری درآمد", color: "from-[#10B981]/15 to-[#059669]/15", iconColor: "text-[#10B981]" },
  { name: "تحلیل‌ها", href: "/workspace/analytics", icon: BarChart3, description: "هوش کسب و کار", color: "from-[#8B5CF6]/15 to-[#7C3AED]/15", iconColor: "text-[#8B5CF6]" },
];

const otherItems = [
  { name: "اشتراک", href: "/workspace/subscription", icon: CreditCard, description: "مدیریت اشتراک", color: "from-[#EC4899]/15 to-[#DB2777]/15", iconColor: "text-[#EC4899]" },
  { name: "تنظیمات", href: "/workspace/settings", icon: Settings, description: "تنظیمات حساب", color: "from-[#64748B]/15 to-[#475569]/15", iconColor: "text-[#64748B]" },
];

export default function MorePage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background pb-24" dir="rtl">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-radial from-[#5B5FEF]/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative px-4 pt-6 pb-5">
          <h1 className="text-2xl font-extrabold text-text-primary">بیشتر</h1>
          <p className="text-xs text-text-tertiary mt-1">سایر بخش‌های داشبورد</p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* User Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#5B5FEF] to-[#3B82F6] p-4 text-white shadow-lg shadow-[#5B5FEF]/20">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-sm font-bold">
              {(user?.firstName || user?.email || "کاربر")[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.firstName || user?.email || "کاربر"}</p>
              <p className="text-xs text-white/70 truncate">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div>
          <h2 className="text-xs font-bold text-text-tertiary mb-3 px-1">مدیریت</h2>
          <div className="space-y-2">
            {mainItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="group flex items-center gap-3.5 rounded-2xl border border-border/30 bg-surface p-3.5 shadow-sm hover:shadow-md hover:border-[#5B5FEF]/20 transition-all duration-200">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} ${item.iconColor} shrink-0 group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-tertiary mt-0.5">{item.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-text-tertiary group-hover:text-[#5B5FEF] transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Finance Section */}
        <div>
          <h2 className="text-xs font-bold text-text-tertiary mb-3 px-1">مالی</h2>
          <div className="space-y-2">
            {financeItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="group flex items-center gap-3.5 rounded-2xl border border-border/30 bg-surface p-3.5 shadow-sm hover:shadow-md hover:border-[#5B5FEF]/20 transition-all duration-200">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} ${item.iconColor} shrink-0 group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-tertiary mt-0.5">{item.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-text-tertiary group-hover:text-[#5B5FEF] transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Section */}
        <div>
          <h2 className="text-xs font-bold text-text-tertiary mb-3 px-1">سایر</h2>
          <div className="space-y-2">
            {otherItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="group flex items-center gap-3.5 rounded-2xl border border-border/30 bg-surface p-3.5 shadow-sm hover:shadow-md hover:border-[#5B5FEF]/20 transition-all duration-200">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} ${item.iconColor} shrink-0 group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-tertiary mt-0.5">{item.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-text-tertiary group-hover:text-[#5B5FEF] transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-danger/20 bg-danger/5 p-3.5 text-sm font-bold text-danger hover:bg-danger/10 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
