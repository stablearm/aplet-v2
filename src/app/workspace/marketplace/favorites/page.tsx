"use client";

import { Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function MarketplaceFavoritesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="علاقه‌مندی‌ها"
        description="پلتفرم‌های مورد علاقه شما"
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<Heart className="h-6 w-6" />}
            title="هنوز علاقه‌مندی ندارید"
            description="پلتفرم‌های مورد علاقه شما در اینجا ذخیره خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
