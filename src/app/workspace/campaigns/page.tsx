"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Plus, Pause, Play, XCircle, ExternalLink, Megaphone, Users, Target } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { useCampaigns, usePauseCampaign, useResumeCampaign, useCancelCampaign } from "@/features/campaigns/hooks/use-campaigns";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { SectionGuide } from "@/components/shared/section-guide";
import type { Campaign, CampaignStatus } from "@/types";

const statusLabels: Record<CampaignStatus, string> = {
  active: "فعال",
  paused: "متوقف",
  completed: "تمام شده",
  cancelled: "لغو شده",
  pending_payment: "در انتظار پرداخت",
};

const statusColors: Record<CampaignStatus, string> = {
  active: "bg-success/10 text-success border-success/20",
  paused: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-text-tertiary border-border/30",
  cancelled: "bg-danger/10 text-danger border-danger/20",
  pending_payment: "bg-warning/10 text-warning border-warning/20",
};

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useCampaigns();
  const pauseMutation = usePauseCampaign();
  const resumeMutation = useResumeCampaign();
  const cancelMutation = useCancelCampaign();

  const columns = useMemo<ColumnDef<Campaign>[]>(
    () => [
      {
        accessorKey: "name",
        header: "نام کمپین",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B5FEF]/10 text-[#5B5FEF] shrink-0">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <Link
                href={`/workspace/campaigns/${row.original.id}`}
                className="font-bold text-sm text-text-primary hover:text-[#5B5FEF] transition-colors block"
              >
                {row.original.name}
              </Link>
              {row.original.targetChannelUsername && (
                <span className="text-[11px] text-text-tertiary" dir="ltr">@{row.original.targetChannelUsername}</span>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => (
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusColors[row.original.status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${row.original.status === "active" ? "bg-success" : row.original.status === "paused" ? "bg-warning" : "bg-text-tertiary"}`} />
            {statusLabels[row.original.status]}
          </span>
        ),
      },
      {
        accessorKey: "progress",
        header: "پیشرفت",
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-text-primary">{row.original.progress}%</span>
              <span className="text-[10px] text-text-tertiary">
                {row.original.currentSubscriberCount.toLocaleString("fa-IR")} / {row.original.targetSubscriberCount.toLocaleString("fa-IR")}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] transition-all duration-500"
                style={{ width: `${Math.min(row.original.progress, 100)}%` }}
              />
            </div>
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const campaign = row.original;
          return (
            <div className="flex items-center gap-1 justify-end">
              {campaign.status === "active" && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-warning/10 hover:text-warning"
                  onClick={() => {
                    pauseMutation.mutate(campaign.id, {
                      onSuccess: () => toast.success("کمپین متوقف شد"),
                      onError: () => toast.error("خطا در توقف کمپین"),
                    });
                  }}
                >
                  <Pause className="h-4 w-4" />
                </Button>
              )}
              {campaign.status === "paused" && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-success/10 hover:text-success"
                  onClick={() => {
                    resumeMutation.mutate(campaign.id, {
                      onSuccess: () => toast.success("کمپین ادامه یافت"),
                      onError: () => toast.error("خطا در ادامه کمپین"),
                    });
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
              {(campaign.status === "active" || campaign.status === "paused") && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-danger/10 hover:text-danger"
                  onClick={() => {
                    if (confirm("آیا از لغو کمپین اطمینان دارید؟")) {
                      cancelMutation.mutate(campaign.id, {
                        onSuccess: () => toast.success("کمپین لغو شد"),
                        onError: () => toast.error("خطا در لغو کمپین"),
                      });
                    }
                  }}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
              <Link href={`/workspace/campaigns/${campaign.id}`}>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-[#5B5FEF]/10 hover:text-[#5B5FEF]">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          );
        },
      },
    ],
    [pauseMutation, resumeMutation, cancelMutation]
  );

  return (
    <PageLayout
      title="کمپین‌ها"
      description="مدیریت کمپین‌های عضوگیری"
      actions={
        <Link href="/workspace/campaigns/new">
          <Button size="sm" className="gap-1.5 shadow-md shadow-[#5B5FEF]/20 hover:shadow-lg hover:shadow-[#5B5FEF]/30 transition-all duration-200">
            <Plus className="h-4 w-4" />
            ایجاد کمپین
          </Button>
        </Link>
      }
    >
      {(!campaigns || campaigns.length === 0) && !isLoading && (
        <SectionGuide
          icon={Megaphone}
          title="کمپین عضوگیری چیست؟"
          description="کمپین عضوگیری ابزاری برای جذب مخاطبان هدفمند به کانال تلگرامی شماست. با ایجاد کمپین، اعضای واقعی و علاقه‌مند به موضوع کانال شما جذب می‌شوند."
          steps={[
            "نام کمپین و کانال هدف را مشخص کنید",
            "تعداد اعضای مورد نظر را تعیین کنید",
            "هزینه کمپین محاسبه و نمایش داده می‌شود",
            "کمپین شروع شده و پیشرفت را رصد کنید",
          ]}
          ctaLabel="ایجاد کمپین"
          ctaHref="/workspace/campaigns/new"
        />
      )}

      <DataTable
        columns={columns}
        data={campaigns || []}
        isLoading={isLoading}
        searchKey="name"
        searchPlaceholder="جستجوی کمپین..."
        emptyTitle="هنوز کمپینی ندارید"
        emptyDescription="با ایجاد اولین کمپین، جذب مخاطب هدفمند را شروع کنید."
      />
    </PageLayout>
  );
}
