"use client";

import { TrendingUp, ArrowUpRight, Users, Wallet, CreditCard, CircleDollarSign } from "lucide-react";
import { useEarningsSummary, useEarningsStats } from "@/features/revenue/hooks/use-earnings";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionGuide } from "@/components/shared/section-guide";

export default function RevenuePage() {
  const { data: summary, isLoading: summaryLoading } = useEarningsSummary();
  const { data: stats, isLoading: statsLoading } = useEarningsStats();

  return (
    <div className="space-y-6">
      <PageHeader title="درآمد" description="پیگیری درآمد و برداشت" />

      {/* Guide */}
      {(!summary || summary.totalEarnings === 0) && !summaryLoading && (
        <SectionGuide
          icon={CircleDollarSign}
          title="نحوه کسب درآمد"
          description="شما با ثبت پلتفرم (کانال تلگرام) و جذب اعضای واقعی از طریق کمپین‌ها، به ازای هر عضو ۴۰۰ تومان درآمد کسب می‌کنید."
          steps={[
            "پلتفرم (کانال تلگرام) خود را ثبت کنید",
            "کمپین عضوگیری ایجاد کنید",
            "اعضای جذب شده درآمد شما را افزایش می‌دهند",
            "درآمد خود را برداشت کنید",
          ]}
        />
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="درآمد کل"
          value={summaryLoading ? "-" : `${(summary?.totalEarnings || 0).toLocaleString("fa-IR")}`}
          description="تومان"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={summaryLoading}
        />
        <StatCard
          title="اعضای جذب شده"
          value={summaryLoading ? "-" : `${(summary?.sentUsers || 0).toLocaleString("fa-IR")}`}
          icon={<Users className="h-4 w-4" />}
          loading={summaryLoading}
        />
        <StatCard
          title="موجودی قابل برداشت"
          value={summaryLoading ? "-" : `${(summary?.availableBalanceToman || 0).toLocaleString("fa-IR")}`}
          description="تومان"
          icon={<Wallet className="h-4 w-4" />}
          loading={summaryLoading}
        />
        <StatCard
          title="درآمد این ماه"
          value={summaryLoading ? "-" : `${(summary?.tomanEarnings || 0).toLocaleString("fa-IR")}`}
          description="تومان"
          icon={<CreditCard className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
          loading={summaryLoading}
        />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">آمار پلتفرم‌ها</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">تعداد پلتفرم‌ها</span>
              <span className="font-semibold">{stats?.platformCount || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">کل اعضای جذب شده</span>
              <span className="font-semibold">{(stats?.totalUsersAdded || 0).toLocaleString("fa-IR")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">اعضای در انتظار برداشت</span>
              <span className="font-semibold">{(stats?.currentUsersAddedNotWithdrawn || 0).toLocaleString("fa-IR")}</span>
            </div>
          </CardContent>
        </Card>

        <Card dir="rtl">
          <CardHeader>
            <CardTitle className="text-base">اطلاعات درآمد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">نرخ درآمد هر عضو</span>
              <span className="font-semibold">۴۰۰ تومان</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">وضعیت درآمدزایی</span>
              <span className={`font-semibold ${summary?.earningsEnabled ? "text-success" : "text-danger"}`}>
                {summary?.earningsEnabled ? "فعال" : "غیرفعال"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">حداقل برداشت (کارت)</span>
              <span className="font-semibold">۱,۰۰۰,۰۰۰ تومان</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
