"use client";

import { ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function MarketplaceOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="سفارشات"
        description="تاریخچه سفارشات مارکت‌پلیس"
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<ShoppingBag className="h-6 w-6" />}
            title="هنوز سفارشی ندارید"
            description="سفارشات شما از مارکت‌پلیس در اینجا نمایش داده خواهند شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
