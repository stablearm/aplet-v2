"use client";

import { useParams } from "next/navigation";
import { Megaphone } from "lucide-react";
import { usePlatform } from "@/features/platforms/hooks/use-platforms";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlatformCampaignsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: platform, isLoading } = usePlatform(id);

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
      <PageHeader
        title="کمپین‌های متصل"
        description={`کمپین‌های فعال در @${platform?.channelUsername || ""}`}
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<Megaphone className="h-6 w-6" />}
            title="کمپین‌های متصل"
            description="کمپین‌هایی که از این پلتفرم استفاده می‌کنند در اینجا نمایش داده می‌شوند."
          />
        </CardContent>
      </Card>
    </div>
  );
}
