"use client";

import { Check } from "lucide-react";
import { useSubscriptionPackages } from "@/features/subscription/hooks/use-subscriptions";
import { PageLayout } from "@/components/layout/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

const planLabels: Record<string, string> = {
  one_month: "۱ ماهه",
  three_months: "۳ ماهه",
  six_months: "۶ ماهه",
  twelve_months: "۱۲ ماهه",
};

export default function SubscriptionPage() {
  const { data: packages, isLoading } = useSubscriptionPackages();

  return (
    <PageLayout
      title="اشتراک"
      description="مدیریت اشتراک و پلن‌ها"
    >
      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {packages?.map((pkg, index) => (
            <Card key={pkg.type} className={index === 2 ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                {index === 2 && <Badge className="w-fit mb-1">محبوب‌ترین</Badge>}
                <CardTitle className="text-sm">{planLabels[pkg.type] || pkg.duration}</CardTitle>
                <p className="text-xs text-text-tertiary">{pkg.memberCount} عضو</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-text-primary">{formatCurrency(pkg.totalPrice)}</span>
                  <span className="text-xs text-text-tertiary mr-1">تومان</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>{pkg.memberCount} عضو</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>{pkg.duration}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-text-secondary">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>بات محتوا</span>
                  </li>
                </ul>
                <Button variant={index === 2 ? "default" : "outline"} size="sm" className="w-full">
                  انتخاب پلن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
