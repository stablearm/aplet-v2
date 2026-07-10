"use client";

import { ArrowRight, Copy, Check, RefreshCw } from "lucide-react";
import { useWalletDepositAddress, useCheckDeposit } from "@/features/wallet/hooks/use-wallet";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WalletDepositPage() {
  const router = useRouter();
  const { data: depositData, isLoading } = useWalletDepositAddress();
  const checkDepositMutation = useCheckDeposit();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (depositData?.walletAddress) {
      navigator.clipboard.writeText(depositData.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="افزایش موجودی" description="واریز TON به کیف پول" actions={<Button variant="ghost" onClick={() => router.push("/workspace/wallet")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">آدرس کیف پول TON</CardTitle>
          <CardDescription>مبلغ TON را به آدرس زیر واریز کنید.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? <Skeleton className="h-12 w-full" /> : (
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md bg-muted p-3 text-sm font-mono break-all" dir="ltr">{depositData?.walletAddress || "آدرس موجود نیست"}</code>
              <Button size="icon" variant="ghost" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
          <div className="rounded-md bg-warning/10 p-3 text-sm text-warning">
            حداقل مبلغ واریز: ۰.۱ TON. پس از واریز، دکمه &quot;بررسی واریز&quot; را بزنید.
          </div>
          <Button onClick={() => checkDepositMutation.mutate()} disabled={checkDepositMutation.isPending}>
            <RefreshCw className={`ml-2 h-4 w-4 ${checkDepositMutation.isPending ? "animate-spin" : ""}`} />
            بررسی واریز
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
