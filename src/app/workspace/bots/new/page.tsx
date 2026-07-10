"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContentBot } from "@/features/bots/hooks/use-bots";
import { useProfile } from "@/features/settings/hooks/use-settings";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TelegramLinkPrompt } from "@/components/telegram-link-prompt";
import type { ContentTopic, SubscriptionType } from "@/types";

const topics: { value: ContentTopic; label: string }[] = [
  { value: "politics", label: "سیاسی" },
  { value: "international", label: "بین‌المللی" },
  { value: "economics", label: "اقتصادی" },
  { value: "cryptocurrency", label: "ارز دیجیتال" },
  { value: "technology", label: "فناوری" },
  { value: "science", label: "علمی" },
  { value: "social", label: "اجتماعی" },
];

const subscriptionOptions: { value: SubscriptionType; label: string; price: string }[] = [
  { value: "one_month", label: "۱ ماه", price: "۴۸۰,۰۰۰ تومان" },
  { value: "three_months", label: "۳ ماه", price: "۱,۰۵۰,۰۰۰ تومان" },
  { value: "six_months", label: "۶ ماه", price: "۲,۱۰۰,۰۰۰ تومان" },
  { value: "one_year", label: "۱۲ ماه", price: "۳,۶۰۰,۰۰۰ تومان" },
];

const createBotSchema = z.object({
  channelUsername: z.string().min(1, "نام کانال الزامی است"),
  botToken: z.string().min(1, "توکن بات الزامی است"),
  selectedTopics: z.array(z.string()).min(1, "حداقل یک موضوع انتخاب کنید").max(2, "حداکثر ۲ موضوع"),
  postSignature: z.string().min(1, "امضای پست الزامی است"),
  subscriptionType: z.string().min(1, "اشتراک را انتخاب کنید"),
});

type CreateBotForm = z.infer<typeof createBotSchema>;

export default function CreateBotPage() {
  const router = useRouter();
  const createMutation = useCreateContentBot();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateBotForm>({
    resolver: zodResolver(createBotSchema),
    defaultValues: { selectedTopics: [] },
  });

  const isTelegramLinked = !!profile?.telegramId;

  const toggleTopic = (topic: string) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : selectedTopics.length < 2
        ? [...selectedTopics, topic]
        : selectedTopics;
    setSelectedTopics(newTopics);
    setValue("selectedTopics", newTopics);
  };

  const onSubmit = async (data: CreateBotForm) => {
    setError(null);
    try {
      const response = await createMutation.mutateAsync({
        ...data,
        selectedTopics: data.selectedTopics as ContentTopic[],
        subscriptionType: data.subscriptionType as SubscriptionType,
      });
      router.push(`/workspace/bots/${response.id}`);
    } catch (err) {
      setError((err as { message?: string }).message || "خطا در ایجاد بات");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="ایجاد بات محتوا" description="بات هوش مصنوعی جدید بسازید" actions={<Button variant="ghost" onClick={() => router.push("/workspace/bots")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      {/* Telegram Link Prompt */}
      {!profileLoading && !isTelegramLinked && (
        <TelegramLinkPrompt compact />
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card dir="rtl">
            <CardHeader><CardTitle className="text-base">اطلاعات بات</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <div className="rounded-md bg-danger/10 p-3 text-sm text-danger">{error}</div>}
                <div className="space-y-2">
                  <label className="text-sm font-medium">نام کانال تلگرام</label>
                  <Input placeholder="mychannel" {...register("channelUsername")} />
                  {errors.channelUsername && <p className="text-xs text-danger">{errors.channelUsername.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">توکن بات</label>
                  <Input placeholder="1234567890:ABCDef..." {...register("botToken")} dir="ltr" />
                  {errors.botToken && <p className="text-xs text-danger">{errors.botToken.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">موضوعات محتوا (حداکثر ۲)</label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <Badge key={topic.value} variant={selectedTopics.includes(topic.value) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTopic(topic.value)}>
                        {topic.label}
                      </Badge>
                    ))}
                  </div>
                  {errors.selectedTopics && <p className="text-xs text-danger">{errors.selectedTopics.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">امضای پست</label>
                  <Input placeholder="Powered by AI | @mychannel" {...register("postSignature")} />
                  {errors.postSignature && <p className="text-xs text-danger">{errors.postSignature.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">بسته اشتراک</label>
                  <div className="grid grid-cols-2 gap-2">
                    {subscriptionOptions.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer hover:border-primary">
                        <input type="radio" value={opt.value} {...register("subscriptionType")} className="accent-primary" />
                        <div><p className="text-sm font-medium">{opt.label}</p><p className="text-xs text-muted-foreground">{opt.price}</p></div>
                      </label>
                    ))}
                  </div>
                  {errors.subscriptionType && <p className="text-xs text-danger">{errors.subscriptionType.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "در حال ایجاد..." : "ایجاد بات"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card dir="rtl">
            <CardHeader><CardTitle className="text-base">راهنما</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>۱. بات را در کانال خود ادمین کنید.</p>
              <p>۲. توکن بات را از @BotFather کپی کنید.</p>
              <p>۳. موضوعات محتوا را انتخاب کنید.</p>
              <p>۴. بسته اشتراک مناسب را خریداری کنید.</p>
              <p className="text-xs">اولین بات: ۱ روز رایگان</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
