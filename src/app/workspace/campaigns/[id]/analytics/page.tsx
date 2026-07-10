"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { useCampaign } from "@/features/campaigns/hooks/use-campaigns";
import { CampaignTabs } from "@/features/campaigns/components/campaign-tabs";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { AreaChart, PieChart } from "@/components/charts";

export default function CampaignAnalyticsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: campaign, isLoading } = useCampaign(id);

  const progressData = useMemo(() => {
    if (!campaign) return [];
    const current = campaign.currentSubscriberCount;
    const target = campaign.targetSubscriberCount;
    const steps = 7;
    return Array.from({ length: steps }, (_, i) => ({
      name: `${Math.round((i + 1) * (100 / steps))}%`,
      value: Math.round((current * (i + 1)) / steps),
    }));
  }, [campaign]);

  const statusData = useMemo(() => {
    if (!campaign) return [];
    return [
      { name: "جذب شده", value: campaign.currentSubscriberCount },
      { name: "باقیمانده", value: Math.max(0, campaign.targetSubscriberCount - campaign.currentSubscriberCount) },
    ];
  }, [campaign]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CampaignTabs campaignId={id} />
      <PageHeader
        title="تحلیل کمپین"
        description={`آمار و تحلیل کمپین ${campaign?.name || ""}`}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="اعضای جذب شده"
          value={formatNumber(campaign?.currentSubscriberCount || 0)}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="هدف"
          value={formatNumber(campaign?.targetSubscriberCount || 0)}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          title="نرخ پیشرفت"
          value={`${campaign?.progress || 0}%`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="هزینه کل"
          value={`${(campaign?.totalCost || 0).toLocaleString("fa-IR")}`}
          description="تومان"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">نمودار پیشرفت</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={progressData}
              color="#6366f1"
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">وضعیت کمپین</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={statusData}
              valueFormatter={(v) => formatNumber(v)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
