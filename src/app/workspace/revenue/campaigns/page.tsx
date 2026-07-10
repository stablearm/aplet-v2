"use client";

import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function RevenueCampaignsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="درآمد کمپین‌ها" description="درآمد حاصل از کمپین‌ها" />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<Megaphone className="h-6 w-6" />}
            title="درآمد کمپین‌ها"
            description="داده‌های درآمد کمپین‌ها به زودی نمایش داده خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
