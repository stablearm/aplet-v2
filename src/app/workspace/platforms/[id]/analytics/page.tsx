"use client";

import { useParams } from "next/navigation";
import { BarChart3, Users, TrendingUp, Activity } from "lucide-react";
import { usePlatform } from "@/features/platforms/hooks/use-platforms";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";

export default function PlatformAnalyticsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: platform, isLoading } = usePlatform(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="تحلیل پلتفرم"
        description={`آمار و تحلیل @${platform?.channelUsername || ""}`}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="اعضای جذب شده" value={formatNumber(platform?.totalUsersAddedByPlatform || 0)} icon={<Users className="h-4 w-4" />} />
        <StatCard title="سهم فالو" value={formatNumber(platform?.followQuota || 0)} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard title="تعداد ادمین‌ها" value={formatNumber(platform?.admins?.length || 0)} icon={<Activity className="h-4 w-4" />} />
        <StatCard title="وضعیت وب‌هوک" value={platform?.webhookStatus === "set" ? "متصل" : "در انتظار"} icon={<BarChart3 className="h-4 w-4" />} />
      </div>

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">نمودار رشد اعضا</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">نمودار به زودی اضافه خواهد شد</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
