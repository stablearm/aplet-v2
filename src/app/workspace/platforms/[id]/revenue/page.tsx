"use client";

import { useParams } from "next/navigation";
import { TrendingUp } from "lucide-react";
import { usePlatform } from "@/features/platforms/hooks/use-platforms";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlatformRevenuePage() {
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
        title="درآمد پلتفرم"
        description={`درآمد حاصل از @${platform?.channelUsername || ""}`}
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<TrendingUp className="h-6 w-6" />}
            title="داده‌های درآمد"
            description="اطلاعات درآمد این پلتفرم به زودی نمایش داده خواهد شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
