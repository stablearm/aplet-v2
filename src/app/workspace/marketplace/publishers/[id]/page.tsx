"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketplacePublisherPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <PageHeader
        title="پروفایل ناشر"
        description="اطلاعات ناشر"
        actions={
          <Button variant="ghost" onClick={() => router.push("/workspace/marketplace")}>
            <ArrowRight className="ml-2 h-4 w-4" />
            بازگشت
          </Button>
        }
      />

      <Card dir="rtl">
        <CardHeader>
          <CardTitle className="text-base">اطلاعات ناشر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">پروفایل ناشر به زودی اضافه خواهد شد.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
