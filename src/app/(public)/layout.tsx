"use client";

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { AuthProvider } from "@/components/providers/auth-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background" dir="rtl">
        <PublicHeader />
        <main>{children}</main>
        <PublicFooter />
      </div>
    </AuthProvider>
  );
}
