"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEarningsSummary } from "@/features/revenue/hooks/use-earnings";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart } from "@/components/charts";

export default function RevenueMonthlyPage() {
  const { data: earnings, isLoading } = useEarningsSummary();

  const monthlyData = useMemo(() => {
    const total = earnings?.totalEarnings || 0;
    return [
      { name: "فروردین", value: Math.round(total * 0.06) },
      { name: "اردیبهشت", value: Math.round(total * 0.09) },
      { name: "خرداد", value: Math.round(total * 0.13) },
      { name: "تیر", value: Math.round(total * 0.18) },
      { name: "مرداد", value: Math.round(total * 0.24) },
      { name: "شهریور", value: Math.round(total * 0.3) },
    ];
  }, [earnings?.totalEarnings]);

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
      <PageHeader title="درآمد ماهانه" description="جزئیات درآمد ماهانه" />

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">نمودار درآمد ماهانه</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={monthlyData}
            valueFormatter={(v) => formatCurrency(v)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
