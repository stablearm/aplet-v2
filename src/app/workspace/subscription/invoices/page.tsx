"use client";

import { FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function SubscriptionInvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="صورتحساب‌ها"
        description="تاریخچه صورتحساب‌ها"
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<FileText className="h-6 w-6" />}
            title="هنوز صورتحسابی ندارید"
            description="صورتحساب‌های شما در اینجا نمایش داده خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
