"use client";

import { Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function SettingsSessionsPage() {
  return (
    <Card dir="rtl">
      <CardContent className="p-6">
        <EmptyState
          icon={<Monitor className="h-6 w-6" />}
          title="جلسات فعال"
          description="لیست نشست‌های فعال حساب شما در اینجا نمایش داده خواهد شد."
        />
      </CardContent>
    </Card>
  );
}
