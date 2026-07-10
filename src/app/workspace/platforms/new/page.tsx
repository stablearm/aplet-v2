"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePlatform } from "@/features/platforms/hooks/use-platforms";
import { useProfile } from "@/features/settings/hooks/use-settings";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramLinkPrompt } from "@/components/telegram-link-prompt";

const createPlatformSchema = z.object({
  channelUsername: z.string().optional(),
  publicLink: z.string().optional(),
  botToken: z.string().min(1, "توکن بات الزامی است"),
  followQuota: z.number().min(1).max(5),
}).refine((d) => d.channelUsername || d.publicLink, { message: "نام کانال یا لینک را وارد کنید", path: ["channelUsername"] });

type CreatePlatformForm = z.infer<typeof createPlatformSchema>;

export default function CreatePlatformPage() {
  const router = useRouter();
  const createMutation = useCreatePlatform();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePlatformForm>({ resolver: zodResolver(createPlatformSchema), defaultValues: { followQuota: 3 } });

  const isTelegramLinked = !!profile?.telegramId;

  const onSubmit = async (data: CreatePlatformForm) => {
    setError(null);
    try {
      await createMutation.mutateAsync(data);
      router.push("/workspace/platforms");
    } catch (err) {
      setError((err as { message?: string }).message || "خطا در ایجاد پلتفرم");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="افزودن پلتفرم" description="کانال تلگرام جدید متصل کنید" actions={<Button variant="ghost" onClick={() => router.push("/workspace/platforms")}><ArrowRight className="ml-2 h-4 w-4" /> بازگشت</Button>} />

      {/* Telegram Link Prompt */}
      {!profileLoading && !isTelegramLinked && (
        <TelegramLinkPrompt compact />
      )}

      <Card dir="rtl" className="max-w-lg">
        <CardHeader><CardTitle className="text-base">اطلاعات پلتفرم</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="rounded-md bg-danger/10 p-3 text-sm text-danger">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium">نام کانال تلگرام</label>
              <Input placeholder="mychannel" {...register("channelUsername")} />
              {errors.channelUsername && <p className="text-xs text-danger">{errors.channelUsername.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">توکن بات تلگرام</label>
              <Input placeholder="1234567890:ABCDef..." {...register("botToken")} dir="ltr" />
              <p className="text-xs text-muted-foreground">توکن را از @BotFather دریافت کنید.</p>
              {errors.botToken && <p className="text-xs text-danger">{errors.botToken.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">سهم فالو (۱-۵)</label>
              <Input type="number" min={1} max={5} {...register("followQuota", { valueAsNumber: true })} />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "در حال ایجاد..." : "ایجاد پلتفرم"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
