"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Check, Clock, Zap } from "lucide-react";
import { useSubscriptionPackages } from "@/features/subscription/hooks/use-subscriptions";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionPlansPage() {
  const router = useRouter();
  const { data: packages, isLoading } = useSubscriptionPackages();

  return (
    <div className="space-y-6">
      <PageHeader title="بسته‌های اشتتراک" description="انتخاب بسته مناسب" actions={<Button variant="ghost" onClick={() => router.push("/workspace/subscription")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-64" />)}</div>
      ) : packages && packages.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <Card key={pkg.type} className="relative" dir="rtl">
              {pkg.type === "one_month" && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge>محبوب‌ترین</Badge></div>}
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">{pkg.duration}</h3>
                <div className="text-3xl font-bold mb-1">{pkg.totalPrice.toLocaleString("fa-IR")}</div>
                <p className="text-sm text-muted-foreground mb-4">تومان</p>
                <div className="space-y-2 text-sm text-left mb-6">
                  <div className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /><span>{pkg.memberCount.toLocaleString("fa-IR")} عضو</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span>{pkg.duration} اعتبار</span></div>
                  <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-muted-foreground" /><span>بات هوش مصنوعی</span></div>
                </div>
                <Button className="w-full">خرید</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
