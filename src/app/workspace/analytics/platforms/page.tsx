"use client";

import { useMemo } from "react";
import { Radio } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlatforms } from "@/features/platforms/hooks/use-platforms";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, PieChart } from "@/components/charts";

export default function AnalyticsPlatformsPage() {
  const { data: platforms, isLoading } = usePlatforms();

  const platformPerformanceData = useMemo(() => {
    if (!platforms) return [];
    return platforms.slice(0, 7).map((p) => ({
      name: `@${p.channelUsername}`.length > 12 ? `@${p.channelUsername}`.substring(0, 12) + "..." : `@${p.channelUsername}`,
      value: p.totalUsersAddedByPlatform,
    }));
  }, [platforms]);

  const platformStatusData = useMemo(() => {
    if (!platforms) return [];
    const connected = platforms.filter((p) => p.webhookStatus === "set").length;
    const pending = platforms.length - connected;
    return [
      { name: "متصل", value: connected },
      { name: "در انتظار", value: pending },
    ];
  }, [platforms]);

  const totalMembers = platforms?.reduce((sum, p) => sum + p.totalUsersAddedByPlatform, 0) || 0;

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
      <PageHeader title="تحلیل پلتفرم‌ها" description="آمار و عملکرد پلتفرم‌ها" />

      <div className="grid gap-4 md:grid-cols-2">
        <Card dir="rtl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">تعداد پلتفرم‌ها</p>
            <p className="text-2xl font-bold">{formatNumber(platforms?.length || 0)}</p>
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
            <CardTitle className="text-base">عملکرد پلتفرم‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={platformPerformanceData}
              color="#22c55e"
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">وضعیت اتصال</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={platformStatusData}
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
