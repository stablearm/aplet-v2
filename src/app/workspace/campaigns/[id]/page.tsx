"use client";

import { useParams, useRouter } from "next/navigation";
import { Pause, Play, XCircle, Copy, Check, ExternalLink } from "lucide-react";
import { useCampaign, usePauseCampaign, useResumeCampaign, useCancelCampaign } from "@/features/campaigns/hooks/use-campaigns";
import { CampaignTabs } from "@/features/campaigns/components/campaign-tabs";
import { PageLayout } from "@/components/layout/page-layout";
import { KPIWidget } from "@/components/dashboard/kpi-widget";
import { SummaryWidget } from "@/components/dashboard/summary-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import type { CampaignStatus } from "@/types";

const statusLabels: Record<CampaignStatus, string> = {
  active: "فعال",
  paused: "متوقف",
  completed: "تمام شده",
  cancelled: "لغو شده",
  pending_payment: "در انتظار پرداخت",
};

const statusVariants: Record<CampaignStatus, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  active: "success",
  paused: "warning",
  completed: "secondary",
  cancelled: "destructive",
  pending_payment: "warning",
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: campaign, isLoading } = useCampaign(id);
  const pauseMutation = usePauseCampaign();
  const resumeMutation = useResumeCampaign();
  const cancelMutation = useCancelCampaign();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (campaign?.inviteLink) {
      navigator.clipboard.writeText(campaign.inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-text-tertiary">کمپین یافت نشد.</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/workspace/campaigns")}>
          بازگشت به لیست
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CampaignTabs campaignId={id} />

      <PageLayout
        title={campaign.name}
        description={campaign.targetChannelUsername}
        actions={
          <div className="flex gap-2">
            {campaign.status === "active" && (
              <Button variant="outline" size="sm" onClick={() => pauseMutation.mutate(campaign.id)} disabled={pauseMutation.isPending}>
                <Pause className="h-4 w-4" /> توقف
              </Button>
            )}
            {campaign.status === "paused" && (
              <Button variant="outline" size="sm" onClick={() => resumeMutation.mutate(campaign.id)} disabled={resumeMutation.isPending}>
                <Play className="h-4 w-4" /> ادامه
              </Button>
            )}
            {(campaign.status === "active" || campaign.status === "paused") && (
              <Button variant="destructive" size="sm" onClick={() => { if (confirm("آیا از لغو کمپین اطمینان دارید؟")) cancelMutation.mutate(campaign.id); }} disabled={cancelMutation.isPending}>
                <XCircle className="h-4 w-4" /> لغو
              </Button>
            )}
          </div>
        }
      >
        {/* Status Banner */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
          <div className="flex items-center gap-3">
            <Badge variant={statusVariants[campaign.status]}>{statusLabels[campaign.status]}</Badge>
            <span className="text-xs text-text-tertiary">شناسه: {campaign.orderId}</span>
          </div>
          {campaign.inviteLink && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="mr-1 text-xs">{copied ? "کپی شد" : "کپی لینک"}</span>
              </Button>
              <a href={campaign.inviteLink} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="h-7 w-7"><ExternalLink className="h-3.5 w-3.5" /></Button>
              </a>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-tertiary">پیشرفت</span>
            <span className="text-xs font-medium text-text-primary">{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-1.5" />
          <p className="mt-2 text-xs text-text-tertiary">
            {campaign.currentSubscriberCount.toLocaleString("fa-IR")} از {campaign.targetSubscriberCount.toLocaleString("fa-IR")} عضو
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <KPIWidget label="اعضای جذب شده" value={campaign.currentSubscriberCount.toLocaleString("fa-IR")} />
          <KPIWidget label="هدف" value={campaign.targetSubscriberCount.toLocaleString("fa-IR")} />
          <KPIWidget label="نرخ پیشرفت" value={`${campaign.progress}%`} />
          <KPIWidget label="هزینه کل" value={`${campaign.totalCost.toLocaleString("fa-IR")}`} unit="تومان" />
        </div>

        {/* Details */}
        <div className="grid gap-3 md:grid-cols-3">
          <SummaryWidget
            title="اطلاعات مالی"
            items={[
              { label: "هزینه کل", value: `${campaign.totalCost.toLocaleString("fa-IR")} تومان` },
              ...(campaign.costPer1000 ? [{ label: "هزینه هر ۱۰۰۰ عضو", value: `${campaign.costPer1000.toLocaleString("fa-IR")} تومان` }] : []),
            ]}
          />
          <SummaryWidget
            title="اطلاعات کانال"
            items={[
              { label: "نام کانال", value: campaign.channelTitle },
              { label: "نام کاربری", value: campaign.targetChannelUsername },
            ]}
          />
          <SummaryWidget
            title="زمان‌بندی"
            items={[
              { label: "تاریخ شروع", value: new Date(campaign.createdAt).toLocaleDateString("fa-IR") },
              { label: "تاریخ پایان", value: new Date(campaign.expiresAt).toLocaleDateString("fa-IR") },
            ]}
          />
        </div>
      </PageLayout>
    </div>
  );
}
