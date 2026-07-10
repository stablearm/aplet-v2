"use client";

import { useParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useCampaign } from "@/features/campaigns/hooks/use-campaigns";
import { CampaignTabs } from "@/features/campaigns/components/campaign-tabs";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";

export default function CampaignMembersPage() {
  const params = useParams();
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
        title="اعضای جذب شده"
        description={`لیست اعضای جذب شده در کمپین ${campaign?.name || ""}`}
      />

      <Card dir="rtl">
        <CardContent className="p-6">
          <EmptyState
            icon={<UserPlus className="h-6 w-6" />}
            title="لیست اعضای جذب شده"
            description="اعضایی که از طریق این کمپین جذب شده‌اند در اینجا نمایش داده می‌شوند. اطلاعات دقیق‌تر به زودی اضافه خواهد شد."
          />
        </CardContent>
      </Card>
    </div>
  );
}
