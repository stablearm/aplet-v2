"use client";

import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function SubscriptionBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="پرداخت"
        description="مدیریت اطلاعات پرداخت"
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<CreditCard className="h-6 w-6" />}
            title="مدیریت پرداخت"
            description="قابلیت مدیریت اطلاعات پرداخت به زودی اضافه خواهد شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
