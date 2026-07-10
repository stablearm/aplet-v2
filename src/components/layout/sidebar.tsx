"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Radio,
  Bot,
  Store,
  Wallet,
  TrendingUp,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { clearTokens } from "@/lib/api-client";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ApletLogo, ApletSymbol } from "@/components/brand";

const mainNav = [
  { name: "داشبورد", href: "/workspace/dashboard", icon: LayoutDashboard },
  { name: "کمپین‌ها", href: "/workspace/campaigns", icon: Megaphone },
  { name: "پلتفرم‌ها", href: "/workspace/platforms", icon: Radio },
  { name: "بات‌های محتوا", href: "/workspace/bots", icon: Bot },
  { name: "مارکت‌پلیس", href: "/workspace/marketplace", icon: Store },
  { name: "تحلیل‌ها", href: "/workspace/analytics", icon: BarChart3 },
];

const financeNav = [
  { name: "کیف پول", href: "/workspace/wallet", icon: Wallet },
  { name: "درآمد", href: "/workspace/revenue", icon: TrendingUp },
];

const bottomNav = [
  { name: "اشتراک", href: "/workspace/subscription", icon: CreditCard },
  { name: "تنظیمات", href: "/workspace/settings", icon: Settings },
];

function SidebarItem({
  item,
  isActive,
  collapsed,
}: {
  item: { name: string; href: string; icon: React.ComponentType<{ className?: string }> };
  isActive: boolean;
  collapsed: boolean;
}) {
  const content = (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-[#5B5FEF]/10 text-[#5B5FEF] shadow-sm"
          : "text-text-secondary hover:bg-muted/50 hover:text-text-primary"
      )}
    >
      {isActive && !collapsed && (
        <div className="absolute right-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-l-full bg-[#5B5FEF]" />
      )}
      {isActive && collapsed && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-[#5B5FEF]" />
      )}
      <item.icon className={cn(
        "h-[18px] w-[18px] shrink-0 transition-all duration-200",
        isActive ? "text-[#5B5FEF]" : "text-text-tertiary group-hover:text-text-primary"
      )} />
      {!collapsed && <span className="truncate">{item.name}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          {item.name}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, theme } = useUIStore();
  const { user } = useAuthStore();
  const collapsed = sidebarCollapsed;
  const isDark = theme === "dark";

  const handleLogout = () => {
    useAuthStore.getState().logout();
    clearTokens();
    window.location.href = "/login";
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 hidden md:flex flex-col border-l border-[#CBD5E1]/50 bg-gradient-to-b from-white via-white to-[#F8FAFC] backdrop-blur-2xl transition-all duration-300 ease-in-out dark:border-border/40 dark:from-surface-elevated/80 dark:via-surface-elevated/80 dark:to-surface-elevated/80",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
        dir="rtl"
      >
        {/* Logo & Toggle */}
        <div className={cn(
          "flex h-16 items-center border-b border-[#CBD5E1]/30 px-4 dark:border-border/30",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link href="/workspace/dashboard" className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}>
            {collapsed ? (
              <ApletSymbol variant={isDark ? "dark" : "light"} size={28} />
            ) : (
              <ApletLogo variant={isDark ? "dark" : "light"} className="h-7" />
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-text-tertiary hover:bg-muted/60 hover:text-text-primary transition-all duration-200"
              title="بستن سایدبار"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Main Navigation - hidden scrollbar */}
        <nav className="flex-1 overflow-y-auto px-3 pt-3 pb-2 scrollbar-none">
          {/* Main Section */}
          {!collapsed && (
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary/70">
              اصلی
            </p>
          )}
          <ul className="space-y-0.5">
            {mainNav.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <SidebarItem item={item} isActive={isActive} collapsed={collapsed} />
                </li>
              );
            })}
          </ul>

          {/* Finance Section */}
          <div className={cn("mt-4", collapsed && "mt-3")}>
            {!collapsed && (
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary/70">
                مالی
              </p>
            )}
            {collapsed && <div className="mx-3 my-2 h-px bg-border/40" />}
            <ul className="space-y-0.5">
              {financeNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <SidebarItem item={item} isActive={isActive} collapsed={collapsed} />
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border/30 px-3 py-2">
          <ul className="space-y-0.5">
            {bottomNav.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <SidebarItem item={item} isActive={isActive} collapsed={collapsed} />
                </li>
              );
            })}
          </ul>

          {/* User Area */}
          {!collapsed && (
            <div className="mt-2 rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 border border-border/30 p-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5B5FEF]/10 text-[#5B5FEF] text-xs font-bold">
                  {(user?.firstName || user?.email || "کاربر")[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-text-primary truncate">
                    {user?.firstName || user?.email || "کاربر"}
                  </p>
                  <p className="text-[10px] text-text-tertiary truncate">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={cn(
              "mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-medium text-text-secondary hover:bg-danger/5 hover:text-danger transition-all duration-200",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-[16px] w-[16px] shrink-0" />
            {!collapsed && <span>خروج</span>}
          </button>
        </div>

        {/* Expand Button - Only when collapsed */}
        {collapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute -left-3.5 top-20 flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-surface-elevated text-text-tertiary hover:bg-[#5B5FEF]/10 hover:text-[#5B5FEF] hover:border-[#5B5FEF]/30 transition-all duration-200 shadow-md z-50"
            title="باز کردن سایدبار"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </aside>
    </TooltipProvider>
  );
}
