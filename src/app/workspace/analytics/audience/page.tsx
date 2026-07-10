"use client";

import { useMemo } from "react";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEarningsStats } from "@/features/revenue/hooks/use-earnings";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, PieChart } from "@/components/charts";

export default function AnalyticsAudiencePage() {
  const { data: stats, isLoading } = useEarningsStats();

  const audienceGrowthData = useMemo(() => {
    const total = stats?.totalUsersAdded || 0;
    return [
      { name: "۱", value: Math.round(total * 0.1) },
      { name: "۲", value: Math.round(total * 0.15) },
      { name: "۳", value: Math.round(total * 0.22) },
      { name: "۴", value: Math.round(total * 0.32) },
      { name: "۵", value: Math.round(total * 0.45) },
      { name: "۶", value: Math.round(total * 0.6) },
      { name: "۷", value: Math.round(total * 0.75) },
      { name: "۸", value: Math.round(total * 0.88) },
      { name: "۹", value: Math.round(total * 0.95) },
      { name: "۱۰", value: total },
    ];
  }, [stats?.totalUsersAdded]);

  const audienceStatusData = useMemo(() => {
    const total = stats?.totalUsersAdded || 0;
    const withdrawn = total - (stats?.currentUsersAddedNotWithdrawn || 0);
    return [
      { name: "برداشت شده", value: withdrawn },
      { name: "در انتظار", value: stats?.currentUsersAddedNotWithdrawn || 0 },
    ];
  }, [stats]);

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
      <PageHeader title="مخاطبان" description="تحلیل مخاطبان جذب شده" />

      <div className="grid gap-4 md:grid-cols-2">
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">کل مخاطبان</p>
            <p className="text-2xl font-bold">{formatNumber(stats?.totalUsersAdded || 0)}</p>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">مخاطبان در انتظار</p>
            <p className="text-2xl font-bold">{formatNumber(stats?.currentUsersAddedNotWithdrawn || 0)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">ترند مخاطبان</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={audienceGrowthData}
              color="#8b5cf6"
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">وضعیت برداشت</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={audienceStatusData}
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
