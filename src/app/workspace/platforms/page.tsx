"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Plus, ExternalLink, Users, Radio } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { usePlatforms } from "@/features/platforms/hooks/use-platforms";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { SectionGuide } from "@/components/shared/section-guide";
import type { Platform } from "@/types";

export default function PlatformsPage() {
  const { data: platforms, isLoading } = usePlatforms();

  const columns = useMemo<ColumnDef<Platform>[]>(
    () => [
      {
        accessorKey: "channelUsername",
        header: "کانال",
        cell: ({ row }) => (
          <Link
            href={`/workspace/platforms/${row.original.id}`}
            className="font-medium text-text-primary hover:text-primary transition-colors"
          >
            @{row.original.channelUsername}
          </Link>
        ),
      },
      {
        accessorKey: "botUsername",
        header: "بات",
        cell: ({ row }) => (
          <span className="text-text-secondary" dir="ltr">@{row.original.botUsername}</span>
        ),
      },
      {
        accessorKey: "webhookStatus",
        header: "وضعیت اتصال",
        cell: ({ row }) => (
          <Badge variant={row.original.webhookStatus === "set" ? "success" : "warning"}>
            {row.original.webhookStatus === "set" ? "متصل" : "در انتظار"}
          </Badge>
        ),
      },
      {
        accessorKey: "followQuota",
        header: "سهم فالو",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.followQuota}</span>
        ),
      },
      {
        accessorKey: "totalUsersAddedByPlatform",
        header: "اعضای جذب شده",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-text-tertiary" />
            <span className="text-sm">{row.original.totalUsersAddedByPlatform.toLocaleString("fa-IR")}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link href={`/workspace/platforms/${row.original.id}`}>
            <Button size="icon" variant="ghost" className="h-7 w-7">
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <PageLayout
      title="پلتفرم‌ها"
      description="مدیریت کانال‌ها و گروه‌های تلگرامی"
      actions={
        <Link href="/workspace/platforms/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            افزودن پلتفرم
          </Button>
        </Link>
      }
    >
      {(!platforms || platforms.length === 0) && !isLoading && (
        <SectionGuide
          icon={Radio}
          title="پلتفرم چیست؟"
          description="پلتفرم همان کانال یا گروه تلگرامی شماست. با ثبت پلتفرم، کانال خود را به سیستم متصل می‌کنید و می‌توانید از طریق کمپین‌های عضوگیری درآمد کسب کنید."
          steps={[
            "کانال یا گروه تلگرامی خود را ثبت کنید",
            "بات محتوا را به کانال متصل کنید",
            "سهم فالو و تنظیمات را مشخص کنید",
            "آماده دریافت کمپین و کسب درآمد شوید",
          ]}
          ctaLabel="افزودن پلتفرم"
          ctaHref="/workspace/platforms/new"
        />
      )}

      <DataTable
        columns={columns}
        data={platforms || []}
        isLoading={isLoading}
        searchKey="channelUsername"
        searchPlaceholder="جستجوی پلتفرم..."
        emptyTitle="هنوز پلتفرمی ندارید"
        emptyDescription="اولین پلتفرم خود را اضافه کنید."
      />
    </PageLayout>
  );
}
