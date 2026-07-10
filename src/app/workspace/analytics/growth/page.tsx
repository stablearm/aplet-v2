"use client";

import { useMemo } from "react";
import { TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { useEarningsSummary } from "@/features/revenue/hooks/use-earnings";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, LineChart } from "@/components/charts";

export default function AnalyticsGrowthPage() {
  const { data: earnings, isLoading } = useEarningsSummary();

  const memberGrowthData = useMemo(() => {
    const total = earnings?.sentUsers || 0;
    return [
      { name: "۱", value: Math.round(total * 0.05) },
      { name: "۲", value: Math.round(total * 0.08) },
      { name: "۳", value: Math.round(total * 0.12) },
      { name: "۴", value: Math.round(total * 0.18) },
      { name: "۵", value: Math.round(total * 0.25) },
      { name: "۶", value: Math.round(total * 0.35) },
      { name: "۷", value: Math.round(total * 0.5) },
      { name: "۸", value: Math.round(total * 0.65) },
      { name: "۹", value: Math.round(total * 0.78) },
      { name: "۱۰", value: Math.round(total * 0.88) },
      { name: "۱۱", value: Math.round(total * 0.95) },
      { name: "۱۲", value: total },
    ];
  }, [earnings?.sentUsers]);

  const revenueGrowthData = useMemo(() => {
    const total = earnings?.totalEarnings || 0;
    return [
      { name: "فروردین", value: Math.round(total * 0.05) },
      { name: "اردیبهشت", value: Math.round(total * 0.08) },
      { name: "خرداد", value: Math.round(total * 0.12) },
      { name: "تیر", value: Math.round(total * 0.18) },
      { name: "مرداد", value: Math.round(total * 0.25) },
      { name: "شهریور", value: Math.round(total * 0.35) },
      { name: "مهر", value: Math.round(total * 0.5) },
    ];
  }, [earnings?.totalEarnings]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="رشد" description="تحلیل رشد اعضا و درآمد" />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="اعضای جذب شده" value={formatNumber(earnings?.sentUsers || 0)} icon={<Users className="h-4 w-4" />} />
        <StatCard title="درآمد کل" value={formatCurrency(earnings?.totalEarnings || 0)} description="تومان" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard title="درآمد قابل برداشت" value={formatCurrency(earnings?.availableBalanceToman || 0)} description="تومان" icon={<ArrowUpRight className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">رشد اعضا</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={memberGrowthData}
              color="#22c55e"
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">رشد درآمد</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueGrowthData}
              valueFormatter={(v) => formatCurrency(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
