"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { AppShell } from "@/components/layout/app-shell";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchDialog } from "@/components/shared/search-dialog";
import { useAuthStore } from "@/store/auth-store";

function WorkspaceContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell>
      {children}
      <MobileNav />
      <SearchDialog />
    </AppShell>
  );
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider />
        <WorkspaceContent>{children}</WorkspaceContent>
      </AuthProvider>
    </QueryProvider>
  );
}
