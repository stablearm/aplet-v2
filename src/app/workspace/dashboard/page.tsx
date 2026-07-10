"use client";

import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Megaphone,
  Radio,
  Bot,
  Store,
  Plus,
  ArrowUpRight,
  Zap,
  CreditCard,
} from "lucide-react";
import { KPIWidget } from "@/components/dashboard/kpi-widget";
import { ChartCard } from "@/components/dashboard/chart-card";
import { SummaryWidget } from "@/components/dashboard/summary-widget";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { TelegramLinkPrompt } from "@/components/telegram-link-prompt";
import { useWalletBalance } from "@/features/wallet/hooks/use-wallet";
import { useEarningsSummary } from "@/features/revenue/hooks/use-earnings";
import { useCampaigns } from "@/features/campaigns/hooks/use-campaigns";
import { usePlatforms } from "@/features/platforms/hooks/use-platforms";
import { useProfile } from "@/features/settings/hooks/use-settings";
import { useAuthStore } from "@/store/auth-store";
import { formatCurrency, formatNumber } from "@/lib/utils";

const quickActions = [
  {
    label: "کمپین جدید",
    description: "ایجاد کمپین عضوگیری",
    href: "/workspace/campaigns/new",
    icon: Megaphone,
    color: "#5B5FEF",
  },
  {
    label: "پلتفرم جدید",
    description: "اتصال کانال تلگرام",
    href: "/workspace/platforms/new",
    icon: Radio,
    color: "#3B82F6",
  },
  {
    label: "اتصال بات",
    description: "ربات محتوایی بسازید",
    href: "/workspace/bots/new",
    icon: Bot,
    color: "#10B981",
  },
  {
    label: "افزایش موجودی",
    description: "شارژ کیف پول",
    href: "/workspace/wallet/deposit",
    icon: Wallet,
    color: "#F59E0B",
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: wallet, isLoading: walletLoading } = useWalletBalance();
  const { data: earnings, isLoading: earningsLoading } = useEarningsSummary();
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns();
  const { data: platforms, isLoading: platformsLoading } = usePlatforms();
  const { data: profile, isLoading: profileLoading } = useProfile();

  const isLoading = walletLoading || earningsLoading || campaignsLoading || platformsLoading;

  const activeCampaigns = campaigns?.filter((c) => c.status === "active") || [];
  const isTelegramLinked = !!profile?.telegramId;

  return (
    <PageLayout
      title={`سلام ${user?.firstName || ""}`}
      description="نمای کلی کسب و کار شما"
      actions={
        <Link href="/workspace/campaigns/new">
          <Button size="sm" className="gap-1.5 shadow-md shadow-[#5B5FEF]/20 hover:shadow-lg hover:shadow-[#5B5FEF]/30 transition-all duration-300">
            <Plus className="h-4 w-4" />
            ایجاد کمپین
          </Button>
        </Link>
      }
    >
      {/* Telegram Link Prompt */}
      {!profileLoading && !isTelegramLinked && (
        <TelegramLinkPrompt compact />
      )}

      {/* KPIs */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <KPIWidget
          label="موجودی کیف پول"
          value={formatCurrency(wallet?.tomanBalance || 0)}
          unit="تومان"
          icon={Wallet}
          accentColor="#5B5FEF"
          loading={isLoading}
        />
        <KPIWidget
          label="درآمد کل"
          value={formatCurrency(earnings?.totalEarnings || 0)}
          unit="تومان"
          icon={TrendingUp}
          accentColor="#10B981"
          trend={{ value: 12, isPositive: true }}
          loading={isLoading}
        />
        <KPIWidget
          label="کمپین فعال"
          value={activeCampaigns.length}
          icon={Megaphone}
          accentColor="#3B82F6"
          loading={isLoading}
        />
        <KPIWidget
          label="پلتفرم‌ها"
          value={platforms?.length || 0}
          icon={Radio}
          accentColor="#8B5CF6"
          loading={isLoading}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-3 overflow-hidden">
        <div className="lg:col-span-2 space-y-4 min-w-0">
          {/* Active Campaigns */}
          {activeCampaigns.length > 0 && (
            <ChartCard title="کمپین‌های فعال" subtitle={`${activeCampaigns.length} کمپین در حال اجرا`}>
              <div className="space-y-3">
                {activeCampaigns.slice(0, 3).map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/workspace/campaigns/${campaign.id}`}
                    className="group/item relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/30 bg-gradient-to-l from-transparent to-transparent p-4 transition-all duration-300 hover:bg-gradient-to-l hover:from-[#5B5FEF]/[0.03] hover:to-transparent hover:shadow-md hover:border-[#5B5FEF]/20 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/10 text-[#5B5FEF] transition-all duration-300 group-hover/item:scale-105 group-hover/item:shadow-md group-hover/item:shadow-[#5B5FEF]/20">
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-text-primary truncate">{campaign.name}</p>
                        <p className="text-[11px] text-text-tertiary mt-0.5 truncate">{campaign.targetChannelUsername}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <div className="text-left">
                        <p className="text-[12px] sm:text-[13px] font-bold text-text-primary">
                          {campaign.currentSubscriberCount.toLocaleString("fa-IR")} / {campaign.targetSubscriberCount.toLocaleString("fa-IR")}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-text-tertiary mt-0.5">{campaign.progress}%</p>
                      </div>
                      <div className="relative h-2.5 w-20 sm:w-28 rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-[#5B5FEF] via-[#4F52E5] to-[#3B82F6] transition-all duration-700 ease-out"
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ChartCard>
          )}

          {/* Quick Actions */}
          <ChartCard title="دسترسی سریع">
            <div className="grid gap-3 grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className="group/action relative flex flex-col items-center gap-3 rounded-2xl border border-border/30 bg-gradient-to-b from-surface to-surface-elevated/50 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[color:var(--action-color)]/30"
                    style={{ "--action-color": action.color } as React.CSSProperties}
                  >
                    {/* Subtle glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 30%, ${action.color}08, transparent 70%)` }}
                    />

                    <div
                      className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover/action:scale-110 group-hover/action:shadow-lg group-hover/action:rotate-3"
                      style={{ backgroundColor: `${action.color}12`, color: action.color }}
                    >
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="relative text-center">
                      <span className="text-[12px] sm:text-[13px] font-semibold text-text-primary block">{action.label}</span>
                      <span className="text-[10px] sm:text-[11px] text-text-tertiary/60 block mt-0.5 hidden sm:block">{action.description}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Sidebar Summaries */}
        <div className="space-y-4 min-w-0">
          <SummaryWidget
            title="خلاصه درآمد"
            items={[
              { label: "موجودی قابل برداشت", value: `${formatCurrency(earnings?.availableBalanceToman || 0)} تومان`, highlight: true },
              { label: "موجودی TON", value: `${earnings?.availableBalanceTon || 0} TON` },
              { label: "اعضای جذب شده", value: formatNumber(earnings?.sentUsers || 0) },
            ]}
            action={{ label: "مشاهده", href: "/workspace/revenue" }}
          />
          <SummaryWidget
            title="خلاصه کمپین‌ها"
            items={[
              { label: "کمپین فعال", value: activeCampaigns.length, highlight: true },
              { label: "کل کمپین‌ها", value: campaigns?.length || 0 },
              { label: "اعضای جذب شده", value: formatNumber(campaigns?.reduce((sum, c) => sum + c.currentSubscriberCount, 0) || 0) },
            ]}
            action={{ label: "مشاهده", href: "/workspace/campaigns" }}
          />
        </div>
      </div>
    </PageLayout>
  );
}
