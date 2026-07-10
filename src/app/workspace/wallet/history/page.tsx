"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEarningsTransactions } from "@/features/revenue/hooks/use-earnings";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function WalletHistoryPage() {
  const router = useRouter();
  const { data: transactions, isLoading } = useEarningsTransactions();

  return (
    <div className="space-y-6">
      <PageHeader title="تاریخچه تسویه" description="سابقه برداشت‌ها" actions={<Button variant="ghost" onClick={() => router.push("/workspace/wallet")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : transactions && transactions.length > 0 ? (
        <Card dir="rtl">
          <CardContent className="p-0">
            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{tx.type === "ton_coin" ? "TON" : "کارت بانکی"}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{tx.address}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{tx.amount}</p>
                    <Badge variant={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "destructive"} className="text-xs">{tx.status === "completed" ? "تکمیل" : tx.status === "pending" ? "در انتظار" : "ناموفق"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card dir="rtl"><CardContent className="p-6 text-center text-muted-foreground">سابقه برداشتی وجود ندارد.</CardContent></Card>
      )}
    </div>
  );
}
