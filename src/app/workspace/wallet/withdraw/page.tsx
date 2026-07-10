"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useWithdraw } from "@/features/revenue/hooks/use-earnings";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { WithdrawalType } from "@/types";

export default function WalletWithdrawPage() {
  const router = useRouter();
  const withdrawMutation = useWithdraw();
  const [type, setType] = useState<WithdrawalType>("ton_coin");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await withdrawMutation.mutateAsync({ type, address });
      setSuccess(true);
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message || "خطا در برداشت");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="برداشت درآمد" description="انتقال وجه به کارت بانکی یا کیف پول TON" actions={<Button variant="ghost" onClick={() => router.push("/workspace/wallet")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      <Card dir="rtl" className="max-w-lg">
        <CardHeader>
          <CardTitle className="text-base">درخواست برداشت</CardTitle>
          <CardDescription>حداقل برداشت با کارت: ۱,۰۰۰,۰۰۰ تومان</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <div className="rounded-md bg-success/10 p-3 text-sm text-success">درخواست برداشت ثبت شد.</div>
              <Button variant="outline" onClick={() => router.push("/workspace/wallet")}>بازگشت</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="rounded-md bg-danger/10 p-3 text-sm text-danger">{error}</div>}
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع برداشت</label>
                <div className="flex gap-2">
                  <Button type="button" variant={type === "ton_coin" ? "default" : "outline"} onClick={() => setType("ton_coin")}>TON</Button>
                  <Button type="button" variant={type === "rial" ? "default" : "outline"} onClick={() => setType("rial")}>کارت بانکی</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{type === "ton_coin" ? "آدرس TON" : "شماره کارت"}</label>
                <Input placeholder={type === "ton_coin" ? "EQ..." : "شماره ۱۶ رقمی کارت"} value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={!address || withdrawMutation.isPending}>
                {withdrawMutation.isPending ? "در حال ارسال..." : "ثبت درخواست برداشت"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
