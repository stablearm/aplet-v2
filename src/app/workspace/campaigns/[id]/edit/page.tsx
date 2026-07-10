"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Save } from "lucide-react";
import { useCampaign } from "@/features/campaigns/hooks/use-campaigns";
import { CampaignTabs } from "@/features/campaigns/components/campaign-tabs";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function CampaignEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: campaign, isLoading } = useCampaign(id);

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
      <CampaignTabs campaignId={id} />
      <PageHeader
        title="ویرایش کمپین"
        description={`ویرایش اطلاعات کمپین ${campaign?.name || ""}`}
        actions={
          <Button disabled>
            <Save className="ml-2 h-4 w-4" />
            ذخیره تغییرات
          </Button>
        }
      />

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">اطلاعات کمپین</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">نام کمپین</label>
            <Input defaultValue={campaign?.name} disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">کانال هدف</label>
            <Input defaultValue={campaign?.targetChannelUsername} disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">تعداد اعضای هدف</label>
            <Input defaultValue={campaign?.targetSubscriberCount} disabled />
          </div>
          <p className="text-sm text-muted-foreground">
            قابلیت ویرایش کمپین به زودی اضافه خواهد شد.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
