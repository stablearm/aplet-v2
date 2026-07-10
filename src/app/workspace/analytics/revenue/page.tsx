"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEarningsSummary } from "@/features/revenue/hooks/use-earnings";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, BarChart } from "@/components/charts";

export default function AnalyticsRevenuePage() {
  const { data: earnings, isLoading } = useEarningsSummary();

  const revenueTrendData = useMemo(() => {
    const total = earnings?.totalEarnings || 0;
    return [
      { name: "فروردین", value: Math.round(total * 0.06) },
      { name: "اردیبهشت", value: Math.round(total * 0.09) },
      { name: "خرداد", value: Math.round(total * 0.13) },
      { name: "تیر", value: Math.round(total * 0.18) },
      { name: "مرداد", value: Math.round(total * 0.24) },
      { name: "شهریور", value: Math.round(total * 0.3) },
      { name: "مهر", value: Math.round(total * 0.38) },
    ];
  }, [earnings?.totalEarnings]);

  const balanceData = useMemo(() => {
    return [
      { name: "تومان", value: earnings?.availableBalanceToman || 0 },
      { name: "TON", value: (earnings?.availableBalanceTon || 0) * 100000 },
    ];
  }, [earnings]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="تحلیل درآمد" description="جزئیات درآمد و ترند" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">درآمد کل</p>
            <p className="text-2xl font-bold">{formatCurrency(earnings?.totalEarnings || 0)} تومان</p>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">موجودی TON</p>
            <p className="text-2xl font-bold">{earnings?.availableBalanceTon || 0} TON</p>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">موجودی تومان</p>
            <p className="text-2xl font-bold">{formatCurrency(earnings?.availableBalanceToman || 0)} تومان</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">ترند درآمد</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={revenueTrendData}
              valueFormatter={(v) => formatCurrency(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">موجودی</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={balanceData}
              valueFormatter={(v) => formatCurrency(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
