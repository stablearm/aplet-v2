"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useWalletTransactions } from "@/features/wallet/hooks/use-wallet";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WalletTransactionsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useWalletTransactions(page);

  return (
    <div className="space-y-6">
      <PageHeader title="تراکنش‌ها" description="تاریخچه تراکنش‌های مالی" actions={<Button variant="ghost" onClick={() => router.push("/workspace/wallet")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
      ) : data && data.transactions.length > 0 ? (
        <Card dir="rtl">
          <CardContent className="p-0">
            <div className="divide-y">
              {data.transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString("fa-IR")}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{tx.amount.toLocaleString("fa-IR")} تومان</p>
                    <p className="text-xs text-muted-foreground">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card dir="rtl"><CardContent className="p-6 text-center text-muted-foreground">تراکنشی یافت نشد.</CardContent></Card>
      )}

      {data && data.total > data.limit && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>قبلی</Button>
          <span className="flex items-center px-4 text-sm text-muted-foreground">صفحه {page} از {Math.ceil(data.total / data.limit)}</span>
          <Button variant="outline" disabled={page >= Math.ceil(data.total / data.limit)} onClick={() => setPage(page + 1)}>بعدی</Button>
        </div>
      )}
    </div>
  );
}
