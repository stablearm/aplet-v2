"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Plus, ExternalLink, Bot as BotIcon, Cpu } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { useContentBots } from "@/features/bots/hooks/use-bots";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { SectionGuide } from "@/components/shared/section-guide";
import type { ContentBot } from "@/types";

export default function BotsPage() {
  const { data: bots, isLoading } = useContentBots();

  const columns = useMemo<ColumnDef<ContentBot>[]>(
    () => [
      {
        accessorKey: "channelUsername",
        header: "کانال",
        cell: ({ row }) => (
          <Link
            href={`/workspace/bots/${row.original.id}`}
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
        accessorKey: "status",
        header: "وضعیت",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "active" ? "success" : row.original.status === "paused" ? "warning" : "secondary"}>
            {row.original.status === "active" ? "فعال" : row.original.status === "paused" ? "متوقف" : "غیرفعال"}
          </Badge>
        ),
      },
      {
        accessorKey: "totalPosts",
        header: "پست‌ها",
        cell: ({ row }) => (
          <span className="text-sm">{row.original.totalPosts}</span>
        ),
      },
      {
        accessorKey: "successfulPosts",
        header: "موفق",
        cell: ({ row }) => (
          <span className="text-sm text-success">{row.original.successfulPosts}</span>
        ),
      },
      {
        accessorKey: "failedPosts",
        header: "ناموفق",
        cell: ({ row }) => (
          <span className="text-sm text-danger">{row.original.failedPosts}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link href={`/workspace/bots/${row.original.id}`}>
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
      title="بات‌های محتوا"
      description="مدیریت بات‌های هوشمند محتوا"
      actions={
        <Link href="/workspace/bots/new">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            اتصال بات
          </Button>
        </Link>
      }
    >
      {(!bots || bots.length === 0) && !isLoading && (
        <SectionGuide
          icon={Cpu}
          title="بات محتوا چیست؟"
          description="بات محتوا یک ربات تلگرامی هوشمند است که به کانال شما متصل می‌شود و به صورت خودکار محتوای منظم و با کیفیت منتشر می‌کند."
          steps={[
            "نام کانال تلگرامی خود را وارد کنید",
            "توکن بات را از BotFather دریافت و وارد کنید",
            "موضوعات محتوایی را انتخاب کنید",
            "بات شما آماده انتشار محتواست",
          ]}
          ctaLabel="اتصال بات"
          ctaHref="/workspace/bots/new"
        />
      )}

      <DataTable
        columns={columns}
        data={bots || []}
        isLoading={isLoading}
        searchKey="channelUsername"
        searchPlaceholder="جستجوی بات..."
        emptyTitle="هنوز باتی ندارید"
        emptyDescription="اولین بات محتوا را متصل کنید."
      />
    </PageLayout>
  );
}
