"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Pause, Play, Trash2, Settings, FileText, BarChart3 } from "lucide-react";
import { useContentBot, useToggleBotStatus, useDeleteContentBot } from "@/features/bots/hooks/use-bots";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const topicLabels: Record<string, string> = {
  politics: "سیاسی", international: "بین‌المللی", economics: "اقتصادی",
  cryptocurrency: "ارز دیجیتال", technology: "فناوری", science: "علمی", social: "اجتماعی",
};

export default function BotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: bot, isLoading } = useContentBot(id);
  const toggleMutation = useToggleBotStatus();
  const deleteMutation = useDeleteContentBot();

  const handleDelete = () => {
    if (confirm("آیا از غیرفعال کردن این بات اطمینان دارید؟")) {
      deleteMutation.mutate(id, { onSuccess: () => router.push("/workspace/bots") });
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><div className="grid gap-6 md:grid-cols-3"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div></div>;
  if (!bot) return <div className="text-center py-12"><p className="text-muted-foreground">بات یافت نشد.</p><Button variant="outline" className="mt-4" onClick={() => router.push("/workspace/bots")}>بازگشت</Button></div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`@${bot.channelUsername}`}
        description={`بات: @${bot.botUsername}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toggleMutation.mutate(id)} disabled={toggleMutation.isPending}>
              {bot.status === "active" ? <><Pause className="ml-2 h-4 w-4" /> توقف</> : <><Play className="ml-2 h-4 w-4" /> ادامه</>}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 className="ml-2 h-4 w-4" /> غیرفعال
            </Button>
          </div>
        }
      />

      {/* Status */}
      <Card dir="rtl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Badge variant={bot.status === "active" ? "success" : bot.status === "paused" ? "warning" : "secondary"}>
              {bot.status === "active" ? "فعال" : bot.status === "paused" ? "متوقف" : "غیرفعال"}
            </Badge>
            <span className="text-sm text-muted-foreground">اشتراک: {bot.subscriptionType === "one_month" ? "۱ ماه" : bot.subscriptionType === "three_months" ? "۳ ماه" : bot.subscriptionType === "six_months" ? "۶ ماه" : "۱۲ ماه"}</span>
            <span className="text-sm text-muted-foreground">انقضا: {new Date(bot.subscriptionExpiresAt).toLocaleDateString("fa-IR")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Topics */}
      <Card dir="rtl">
        <CardHeader><CardTitle className="text-base">موضوعات محتوا</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {bot.selectedTopics.map((topic) => (
              <Badge key={topic} variant="secondary">{topicLabels[topic] || topic}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card dir="rtl"><CardContent className="p-6"><p className="text-sm text-muted-foreground">کل پست‌ها</p><p className="text-2xl font-bold">{bot.totalPosts}</p></CardContent></Card>
        <Card dir="rtl"><CardContent className="p-6"><p className="text-sm text-muted-foreground">پست‌های موفق</p><p className="text-2xl font-bold text-success">{bot.successfulPosts}</p></CardContent></Card>
        <Card dir="rtl"><CardContent className="p-6"><p className="text-sm text-muted-foreground">پست‌های ناموفق</p><p className="text-2xl font-bold text-danger">{bot.failedPosts}</p></CardContent></Card>
        <Card dir="rtl"><CardContent className="p-6"><p className="text-sm text-muted-foreground">آخرین پست</p><p className="text-sm font-medium">{bot.lastPostTime ? new Date(bot.lastPostTime).toLocaleDateString("fa-IR") : "—"}</p></CardContent></Card>
      </div>

      {/* Content Settings */}
      {bot.contentSettings && (
        <Card dir="rtl">
          <CardHeader><CardTitle className="text-base">تنظیمات محتوا</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">بازه بررسی فید</span><span>{bot.contentSettings.feedCheckInterval} دقیقه</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">بازه انتشار</span><span>{bot.contentSettings.postInterval} دقیقه</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">حداکثر پست روزانه</span><span>{bot.contentSettings.maxPostsPerDay}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">بررسی تکرار</span><span>{bot.contentSettings.enableDuplicateCheck ? "فعال" : "غیرفعال"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">حداقل طول پست</span><span>{bot.contentSettings.minPostLength} کاراکتر</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">حداکثر طول پست</span><span>{bot.contentSettings.maxPostLength} کاراکتر</span></div>
          </CardContent>
        </Card>
      )}

      {/* Signature */}
      <Card dir="rtl">
        <CardHeader><CardTitle className="text-base">امضای پست</CardTitle></CardHeader>
        <CardContent><p className="text-sm">{bot.postSignature}</p></CardContent>
      </Card>

      {/* Post Limits */}
      {bot.postRateLimits && (
        <Card dir="rtl">
          <CardHeader><CardTitle className="text-base">محدودیت انتشار (هر ۶ ساعت)</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-4 gap-4">
            <div className="text-center"><p className="text-sm text-muted-foreground">۰۰-۰۶</p><p className="text-lg font-bold">{bot.postRateLimits.slot1}</p></div>
            <div className="text-center"><p className="text-sm text-muted-foreground">۰۶-۱۲</p><p className="text-lg font-bold">{bot.postRateLimits.slot2}</p></div>
            <div className="text-center"><p className="text-sm text-muted-foreground">۱۲-۱۸</p><p className="text-lg font-bold">{bot.postRateLimits.slot3}</p></div>
            <div className="text-center"><p className="text-sm text-muted-foreground">۱۸-۲۴</p><p className="text-lg font-bold">{bot.postRateLimits.slot4}</p></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
