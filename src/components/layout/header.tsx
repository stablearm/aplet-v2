"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Plus, User, Sun, Moon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const routeLabels: Record<string, string> = {
  dashboard: "داشبورد",
  campaigns: "کمپین‌ها",
  platforms: "پلتفرم‌ها",
  bots: "بات‌های محتوا",
  marketplace: "مارکت‌پلیس",
  wallet: "کیف پول",
  revenue: "درآمد",
  analytics: "تحلیل‌ها",
  subscription: "اشتراک",
  settings: "تنظیمات",
  notifications: "اعلانات",
  new: "جدید",
  edit: "ویرایش",
  detail: "جزئیات",
  members: "اعضا",
  analytics_page: "تحلیل‌ها",
  content: "محتوا",
  downloads: "دانلودها",
  campaigns_page: "کمپین‌ها",
  revenue_page: "درآمد",
  search: "جستجو",
  categories: "دسته‌بندی‌ها",
  favorites: "علاقه‌مندی‌ها",
  orders: "سفارشات",
  publishers: "ناشران",
  deposit: "افزایش موجودی",
  withdraw: "برداشت",
  transactions: "تراکنش‌ها",
  history: "تاریخچه",
  daily: "روزانه",
  monthly: "ماهانه",
  growth: "رشد",
  audience: "مخاطبان",
  plans: "پلن‌ها",
  billing: "پرداخت",
  invoices: "صورتحساب‌ها",
  security: "امنیت",
  team: "تیم",
  telegram: "تلگرام",
  api: "API",
  sessions: "جلسات",
};

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Skip "workspace" from display
  const displaySegments = segments.filter((s) => s !== "workspace");

  if (displaySegments.length === 0) return null;

  // Check if a segment looks like a MongoDB ObjectId (24 hex chars)
  const isIdSegment = (s: string) => /^[0-9a-f]{24}$/i.test(s);

  return (
    <nav className="flex items-center gap-1.5 text-sm" dir="rtl">
      <Link
        href="/workspace/dashboard"
        className="text-text-tertiary hover:text-[#5B5FEF] transition-colors duration-200"
      >
        خانه
      </Link>
      {displaySegments.map((segment, index) => {
        const isLast = index === displaySegments.length - 1;
        const label = isIdSegment(segment) ? "جزئیات" : (routeLabels[segment] || segment);
        const href = "/" + segments.slice(0, segments.indexOf(segment) + 1).join("/");

        return (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-text-tertiary" />
            {isLast ? (
              <span className="text-text-primary font-semibold">{label}</span>
            ) : (
              <Link href={href} className="text-text-tertiary hover:text-[#5B5FEF] transition-colors duration-200">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function Header() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useUIStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#CBD5E1]/50 bg-white/80 backdrop-blur-xl px-4 md:px-6 lg:px-8 dark:border-border/50 dark:bg-background/80" dir="rtl">
      {/* Right: Breadcrumbs (RTL = right side) */}
      <div className="flex items-center gap-3">
        <Breadcrumbs />
      </div>

      {/* Left: Actions (RTL = left side) */}
      <div className="flex items-center gap-2">
        {/* Command Palette Trigger - Hidden on mobile */}
        <button className="hidden md:flex items-center gap-2.5 rounded-xl border border-[#CBD5E1]/60 bg-[#F1F5F9]/40 px-3.5 py-2 text-xs text-text-tertiary hover:bg-[#F1F5F9] hover:text-text-secondary hover:border-[#5B5FEF]/30 transition-all duration-200 dark:border-border/60 dark:bg-muted/40 dark:hover:bg-muted">
          <Search className="h-3.5 w-3.5" />
          <span>جستجو...</span>
          <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded-md border border-[#CBD5E1]/60 bg-white px-1.5 font-mono text-[10px] font-medium text-text-tertiary dark:border-border/60 dark:bg-surface">
            <span className="text-[9px]">⌘</span>K
          </kbd>
        </button>

        <Separator orientation="vertical" className="mx-1 h-5 bg-border/50 hidden md:block" />

        {/* Theme Toggle */}
        <Button size="icon" variant="ghost" onClick={toggleTheme} className="h-9 w-9 rounded-xl">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Quick Create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-xl border-border/50 shadow-lg">
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/campaigns/new">ایجاد کمپین</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/platforms/new">افزودن پلتفرم</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/bots/new">اتصال بات</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/wallet/deposit">افزایش موجودی</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-danger pulse-notification" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-xl border-border/50 shadow-lg">
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/settings">
                {user?.firstName || user?.email || "پروفایل"}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/subscription">اشتراک</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="rounded-lg">
              <Link href="/workspace/settings">تنظیمات</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
