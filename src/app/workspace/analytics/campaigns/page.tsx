"use client";

import { useMemo } from "react";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCampaigns } from "@/features/campaigns/hooks/use-campaigns";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, PieChart } from "@/components/charts";

export default function AnalyticsCampaignsPage() {
  const { data: campaigns, isLoading } = useCampaigns();

  const campaignPerformanceData = useMemo(() => {
    if (!campaigns) return [];
    return campaigns.slice(0, 7).map((c) => ({
      name: c.name.length > 10 ? c.name.substring(0, 10) + "..." : c.name,
      value: c.currentSubscriberCount,
    }));
  }, [campaigns]);

  const campaignStatusData = useMemo(() => {
    if (!campaigns) return [];
    const statusCounts = campaigns.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusLabels: Record<string, string> = {
      active: "فعال",
      paused: "متوقف",
      completed: "تمام شده",
      cancelled: "لغو شده",
      pending_payment: "در انتظار",
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: statusLabels[status] || status,
      value: count,
    }));
  }, [campaigns]);

  const activeCampaigns = campaigns?.filter((c) => c.status === "active") || [];
  const totalMembers = campaigns?.reduce((sum, c) => sum + c.currentSubscriberCount, 0) || 0;

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
      <PageHeader title="تحلیل کمپین‌ها" description="آمار و عملکرد کمپین‌ها" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">کل کمپین‌ها</p>
            <p className="text-2xl font-bold">{formatNumber(campaigns?.length || 0)}</p>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">کمپین‌های فعال</p>
            <p className="text-2xl font-bold text-success">{formatNumber(activeCampaigns.length)}</p>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">اعضای جذب شده</p>
            <p className="text-2xl font-bold">{formatNumber(totalMembers)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">عملکرد کمپین‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={campaignPerformanceData}
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">وضعیت کمپین‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={campaignStatusData}
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
