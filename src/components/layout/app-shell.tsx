"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out md:mr-[72px] overflow-x-hidden",
          !sidebarCollapsed && "md:mr-[260px]"
        )}
      >
        <Header />
        <main className="p-4 pb-24 md:p-6 md:pb-6 lg:p-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
