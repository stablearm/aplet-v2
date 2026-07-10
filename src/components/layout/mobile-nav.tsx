"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Megaphone, Wallet, Bell, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { name: "داشبورد", href: "/workspace/dashboard", icon: LayoutDashboard },
  { name: "کمپین‌ها", href: "/workspace/campaigns", icon: Megaphone },
  { name: "کیف پول", href: "/workspace/wallet", icon: Wallet },
  { name: "اعلانات", href: "/workspace/notifications", icon: Bell },
  { name: "بیشتر", href: "/workspace/more", icon: MoreHorizontal },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-surface/90 backdrop-blur-xl md:hidden" dir="rtl">
      <div className="flex items-center justify-around py-1.5 px-1 max-w-lg mx-auto safe-area-inset-bottom">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/workspace/more";
          const isMore = item.href === "/workspace/more";
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 text-[9px] font-semibold transition-all duration-200 min-w-[52px] rounded-xl",
                isMore && !isActive && "text-text-tertiary",
                isActive
                  ? "text-[#5B5FEF]"
                  : !isMore && "text-text-tertiary hover:text-text-secondary"
              )}
            >
              <div className={cn(
                "relative flex items-center justify-center h-8 w-12 rounded-xl transition-all duration-200",
                isActive && "bg-[#5B5FEF]/10",
                isMore && !isActive && "bg-muted/50"
              )}>
                <item.icon className={cn(
                  "h-[18px] w-[18px] transition-transform duration-200",
                  isActive && "scale-110 text-[#5B5FEF]"
                )} />
              </div>
              <span className={cn(isActive && "text-[#5B5FEF]")}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
