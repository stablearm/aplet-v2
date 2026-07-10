"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useContentBot } from "@/features/bots/hooks/use-bots";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function BotContentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: bot, isLoading } = useContentBot(id);

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64" /></div>;
  if (!bot) return <div className="text-center py-12"><p className="text-muted-foreground">بات یافت نشد.</p><Button variant="outline" className="mt-4" onClick={() => router.push("/workspace/bots")}>بازگشت</Button></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="محتوای قفل شده" description={`@${bot.channelUsername}`} actions={<Button variant="ghost" onClick={() => router.push(`/workspace/bots/${id}`)}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />
      <Card dir="rtl">
        <CardHeader><CardTitle className="text-base">فیدهای محتوا</CardTitle></CardHeader>
        <CardContent>
          {bot.feedSources && bot.feedSources.length > 0 ? (
            <div className="space-y-2">
              {bot.feedSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-mono" dir="ltr">{source.url}</span>
                  <span className="text-xs text-muted-foreground">{source.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">فیدی تنظیم نشده است.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
