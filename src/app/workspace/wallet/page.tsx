"use client";

import Link from "next/link";
import { Wallet, ArrowUpRight, ArrowDownRight, Copy, Check, CreditCard, Banknote, ExternalLink, Clock, ArrowDownToLine, Coins } from "lucide-react";
import { useWallet, useWalletDepositAddress, useCheckDeposit } from "@/features/wallet/hooks/use-wallet";
import { PageLayout } from "@/components/layout/page-layout";
import { KPIWidget } from "@/components/dashboard/kpi-widget";
import { ChartCard } from "@/components/dashboard/chart-card";
import { SummaryWidget } from "@/components/dashboard/summary-widget";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { SectionGuide } from "@/components/shared/section-guide";
import { useState } from "react";

const walletActions = [
  {
    label: "افزایش موجودی",
    description: "واریز به کیف پول",
    href: "/workspace/wallet/deposit",
    icon: ArrowDownToLine,
    color: "#10B981",
  },
  {
    label: "برداشت وجه",
    description: "انتقال به حساب بانکی",
    href: "/workspace/wallet/withdraw",
    icon: ArrowUpRight,
    color: "#F59E0B",
  },
  {
    label: "تراکنش‌ها",
    description: "تاریخچه تراکنش‌ها",
    href: "/workspace/wallet/transactions",
    icon: CreditCard,
    color: "#3B82F6",
  },
  {
    label: "تاریخچه",
    description: "تاریخچه برداشت",
    href: "/workspace/wallet/history",
    icon: Clock,
    color: "#8B5CF6",
  },
];

export default function WalletPage() {
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: depositAddress } = useWalletDepositAddress();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (depositAddress?.walletAddress) {
      navigator.clipboard.writeText(depositAddress.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PageLayout
      title="کیف پول"
      description="مدیریت موجودی و تراکنش‌ها"
      actions={
        <div className="flex gap-2">
          <Link href="/workspace/wallet/deposit">
            <Button size="sm" className="gap-1.5 shadow-md shadow-[#5B5FEF]/20 hover:shadow-lg hover:shadow-[#5B5FEF]/30 transition-all duration-300">
              <ArrowDownRight className="h-4 w-4" />
              افزایش موجودی
            </Button>
          </Link>
          <Link href="/workspace/wallet/withdraw">
            <Button size="sm" variant="outline" className="gap-1.5">
              <ArrowUpRight className="h-4 w-4" />
              برداشت
            </Button>
          </Link>
        </div>
      }
    >
      {/* Guide */}
      {(!wallet || (wallet.tomanBalance === 0 && wallet.tonBalance === 0)) && !walletLoading && (
        <SectionGuide
          icon={Coins}
          title="کیف پول شما"
          description="کیف پول شما برای دریافت درآمد و مدیریت تراکنش‌ها استفاده می‌شود. درآمد شما از کمپین‌ها در اینجا ذخیره می‌شود."
          steps={[
            "درآمد شما از جذب اعضای کانال‌ها در اینجا نمایش داده می‌شود",
            "می‌توانید موجودی را به تومان یا TON برداشت کنید",
            "حداقل برداشت ۱,۰۰۰,۰۰۰ تومان است",
          ]}
        />
      )}

      {/* Balance Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <KPIWidget
          label="موجودی تومان"
          value={formatCurrency(wallet?.tomanBalance || 0)}
          unit="تومان"
          icon={Wallet}
          accentColor="#5B5FEF"
          loading={walletLoading}
        />
        <KPIWidget
          label="موجودی TON"
          value={wallet?.tonBalance || 0}
          unit="TON"
          icon={Wallet}
          accentColor="#3B82F6"
          loading={walletLoading}
        />
        <KPIWidget
          label="موجودی دلار"
          value={formatCurrency(wallet?.usdBalance || 0)}
          unit="USD"
          icon={Wallet}
          accentColor="#10B981"
          loading={walletLoading}
        />
      </div>

      {/* Deposit Address */}
      {depositAddress?.walletAddress && (
        <Card className="overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <p className="text-[13px] font-semibold text-text-primary">آدرس واریز TON</p>
                </div>
                <p className="text-[12px] sm:text-[13px] font-mono text-text-tertiary break-all" dir="ltr">
                  {depositAddress.walletAddress}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1.5 shrink-0">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    <span>کپی شد</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>کپی آدرس</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ChartCard title="دسترسی سریع">
          <div className="grid gap-3 grid-cols-2">
            {walletActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="group/action relative flex flex-col items-center gap-2.5 rounded-xl border border-border/30 bg-gradient-to-b from-surface to-surface-elevated/50 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[color:var(--action-color)]/30"
                  style={{ "--action-color": action.color } as React.CSSProperties}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover/action:scale-110 group-hover/action:shadow-md"
                    style={{ backgroundColor: `${action.color}12`, color: action.color }}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <span className="text-[12px] font-semibold text-text-primary block">{action.label}</span>
                    <span className="text-[10px] text-text-tertiary/60 block mt-0.5">{action.description}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ChartCard>

        <SummaryWidget
          title="لینک‌های مفید"
          items={[
            { label: "تاریخچه تراکنش‌ها", value: "" },
            { label: "تاریخچه برداشت", value: "" },
          ]}
        />
      </div>
    </PageLayout>
  );
}
