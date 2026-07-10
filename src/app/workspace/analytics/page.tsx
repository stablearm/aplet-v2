"use client";

import { useMemo } from "react";
import { TrendingUp, Users, BarChart3, ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { KPIWidget } from "@/components/dashboard/kpi-widget";
import { ChartCard } from "@/components/dashboard/chart-card";
import { useEarningsSummary, useEarningsStats } from "@/features/revenue/hooks/use-earnings";
import { useCampaigns } from "@/features/campaigns/hooks/use-campaigns";
import { usePlatforms } from "@/features/platforms/hooks/use-platforms";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { AreaChart } from "@/components/charts";

export default function AnalyticsPage() {
  const { data: earnings, isLoading: earningsLoading } = useEarningsSummary();
  const { data: stats, isLoading: statsLoading } = useEarningsStats();
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();
  const { data: platforms, isLoading: platformsLoading } = usePlatforms();

  const isLoading = earningsLoading || statsLoading || campaignsLoading || platformsLoading;

  const revenueData = useMemo(() => {
    const total = earnings?.totalEarnings || 0;
    return [
      { name: "فروردین", value: Math.round(total * 0.08) },
      { name: "اردیبهشت", value: Math.round(total * 0.1) },
      { name: "خرداد", value: Math.round(total * 0.12) },
      { name: "تیر", value: Math.round(total * 0.14) },
      { name: "مرداد", value: Math.round(total * 0.16) },
      { name: "شهریور", value: Math.round(total * 0.18) },
      { name: "مهر", value: Math.round(total * 0.22) },
    ];
  }, [earnings?.totalEarnings]);

  const memberData = useMemo(() => {
    const total = earnings?.sentUsers || 0;
    return [
      { name: "فروردین", value: Math.round(total * 0.06) },
      { name: "اردیبهشت", value: Math.round(total * 0.09) },
      { name: "خرداد", value: Math.round(total * 0.12) },
      { name: "تیر", value: Math.round(total * 0.15) },
      { name: "مرداد", value: Math.round(total * 0.18) },
      { name: "شهریور", value: Math.round(total * 0.2) },
      { name: "مهر", value: Math.round(total * 0.2) },
    ];
  }, [earnings?.sentUsers]);

  return (
    <PageLayout
      title="تحلیل‌ها"
      description="نمای کلی عملکرد کسب و کار"
    >
      {/* KPIs */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <KPIWidget
          label="درآمد کل"
          value={formatCurrency(earnings?.totalEarnings || 0)}
          unit="تومان"
          loading={isLoading}
        />
        <KPIWidget
          label="اعضای جذب شده"
          value={formatNumber(earnings?.sentUsers || 0)}
          loading={isLoading}
        />
        <KPIWidget
          label="تعداد پلتفرم‌ها"
          value={stats?.platformCount || 0}
          loading={isLoading}
        />
        <KPIWidget
          label="اعضای در انتظار"
          value={formatNumber(stats?.currentUsersAddedNotWithdrawn || 0)}
          loading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-3 md:grid-cols-2">
        <ChartCard title="نمودار درآمد">
          <AreaChart
            data={revenueData}
            valueFormatter={(v) => formatCurrency(v)}
          />
        </ChartCard>
        <ChartCard title="نمودار رشد اعضا">
          <AreaChart
            data={memberData}
            color="#059669"
            valueFormatter={(v) => formatNumber(v)}
          />
        </ChartCard>
      </div>
    </PageLayout>
  );
}
