"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, Bell, Key, Users, Monitor, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const settingsNav = [
  { name: "پروفایل", href: "/workspace/settings", icon: User },
  { name: "امنیت", href: "/workspace/settings/security", icon: Shield },
  { name: "اعلان‌ها", href: "/workspace/settings/notifications", icon: Bell },
  { name: "تلگرام", href: "/workspace/settings/telegram", icon: Key },
  { name: "تیم", href: "/workspace/settings/team", icon: Users },
  { name: "جلسات", href: "/workspace/settings/sessions", icon: Monitor },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1" dir="rtl">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {settingsNav.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#5B5FEF]/10 text-[#5B5FEF] shadow-sm"
                        : "text-text-secondary hover:bg-muted/50 hover:text-text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}
