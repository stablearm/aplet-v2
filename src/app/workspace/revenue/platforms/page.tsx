"use client";

import { Radio } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function RevenuePlatformsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="درآمد پلتفرم‌ها" description="درآمد حاصل از پلتفرم‌ها" />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<Radio className="h-6 w-6" />}
            title="درآمد پلتفرم‌ها"
            description="داده‌های درآمد پلتفرم‌ها به زودی نمایش داده خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
