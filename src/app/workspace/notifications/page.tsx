"use client";

import { Bell, Megaphone, Wallet, AlertTriangle, Shield } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="اعلانات"
        description="اعلان‌های سیستم و کسب و کار"
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<Bell className="h-6 w-6" />}
            title="اعلان جدیدی ندارید"
            description="اعلان‌های مالی، کمپین، پلتفرم و سیستمی در اینجا نمایش داده خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
