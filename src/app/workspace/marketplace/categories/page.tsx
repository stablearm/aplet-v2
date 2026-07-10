"use client";

import { Store } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "سیاسی", count: 0 },
  { name: "اقتصادی", count: 0 },
  { name: "اجتماعی", count: 0 },
  { name: "فن‌آوری", count: 0 },
  { name: "ورزشی", count: 0 },
  { name: "سرگرمی", count: 0 },
];

export default function MarketplaceCategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="دسته‌بندی‌ها"
        description="مرور پلتفرم‌ها بر اساس دسته‌بندی"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name} dir="rtl" className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.count} پلتفرم</p>
                  </div>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
