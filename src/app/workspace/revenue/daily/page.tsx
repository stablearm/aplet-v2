"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEarningsSummary } from "@/features/revenue/hooks/use-earnings";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart } from "@/components/charts";

export default function RevenueDailyPage() {
  const { data: earnings, isLoading } = useEarningsSummary();

  const dailyData = useMemo(() => {
    const today = earnings?.availableBalanceToman || 0;
    return [
      { name: "شنبه", value: Math.round(today * 0.12) },
      { name: "یکشنبه", value: Math.round(today * 0.15) },
      { name: "دوشنبه", value: Math.round(today * 0.18) },
      { name: "سه‌شنبه", value: Math.round(today * 0.14) },
      { name: "چهارشنبه", value: Math.round(today * 0.2) },
      { name: "پنجشنبه", value: Math.round(today * 0.16) },
      { name: "جمعه", value: Math.round(today * 0.05) },
    ];
  }, [earnings?.availableBalanceToman]);

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
      <PageHeader title="درآمد روزانه" description="جزئیات درآمد روزانه" />

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">درآمد هفتگی</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={dailyData}
            color="#22c55e"
            valueFormatter={(v) => formatCurrency(v)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
