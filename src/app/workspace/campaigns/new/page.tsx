"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCampaign, useCampaignPricing } from "@/features/campaigns/hooks/use-campaigns";
import { createCampaignSchema, type CreateCampaignForm } from "@/features/campaigns/schemas/campaign";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramLinkPrompt } from "@/components/telegram-link-prompt";
import { useProfile } from "@/features/settings/hooks/use-settings";

export default function CreateCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createMutation = useCreateCampaign();
  const { data: pricing } = useCampaignPricing();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCampaignForm>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      targetSubscriberCount: 5000,
    },
  });

  // Pre-fill from URL query params (from hero order card)
  useEffect(() => {
    const ch = searchParams.get("channel");
    const members = searchParams.get("members");
    if (ch) setValue("channelUsername", ch);
    if (members) {
      const n = parseInt(members, 10);
      if (!isNaN(n)) setValue("targetSubscriberCount", n);
    }
  }, [searchParams, setValue]);

  const targetCount = watch("targetSubscriberCount");
  const totalCost = targetCount * (pricing?.totalPerMember || 500);
  const isTelegramLinked = !!profile?.telegramId;

  const onSubmit = async (data: CreateCampaignForm) => {
    setError(null);

    try {
      const response = await createMutation.mutateAsync(data);
      if (response.status === "active") {
        router.push(`/workspace/campaigns/${response.id}`);
      } else {
        setError(response.message || "کمپین ایجاد شد اما فعال نشد. لطفاً موجودی کیف پول را بررسی کنید.");
      }
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message || "خطا در ایجاد کمپین");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="ایجاد کمپین" description="کمپین جدید عضوگیری ایجاد کنید" />

      {/* Telegram Link Prompt */}
      {!profileLoading && !isTelegramLinked && (
        <TelegramLinkPrompt compact />
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="text-base">اطلاعات کمپین</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-danger/10 p-3 text-sm text-danger">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">نام کمپین</label>
                  <Input placeholder="مثال: تبلیغات تابستان" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-danger">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">نام کانال تلگرام</label>
                  <Input placeholder="mychannel" {...register("channelUsername")} />
                  {errors.channelUsername && (
                    <p className="text-xs text-danger">{errors.channelUsername.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    یا لینک عمومی کانال را وارد کنید (مثال: https://t.me/mychannel)
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">تعداد عضو هدف</label>
                  <Input
                    type="number"
                    min={1000}
                    max={100000}
                    step={1000}
                    {...register("targetSubscriberCount", { valueAsNumber: true })}
                  />
                  {errors.targetSubscriberCount && (
                    <p className="text-xs text-danger">
                      {errors.targetSubscriberCount.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    حداقل ۱,۰۰۰ و حداکثر ۱۰۰,۰۰۰ عضو
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "در حال ایجاد..." : "ایجاد کمپین"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="text-base">خلاصه هزینه</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">هزینه هر عضو</span>
                <span>{(pricing?.totalPerMember || 500).toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">تعداد عضو</span>
                <span>{(targetCount || 0).toLocaleString("fa-IR")}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>هزینه کل</span>
                  <span>{totalCost.toLocaleString("fa-IR")} تومان</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
