"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/lib/api";
import { setTokens } from "@/lib/api-client";
import { useAuthStore } from "@/store/auth-store";
import { useTelegramWebApp } from "@/hooks/use-telegram-webapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TelegramButton } from "@/components/telegram-button";
import { ApletSymbol } from "@/components/brand";

const registerSchema = z
  .object({
    email: z.string().email("ایمیل معتبر وارد کنید"),
    password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر است"),
    confirmPassword: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "apletbot";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { setUser } = useAuthStore();
  const { initData, isMiniApp, isReady } = useTelegramWebApp();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);

  const getRedirectPath = () => {
    if (returnTo) {
      try {
        const decoded = decodeURIComponent(returnTo);
        if (
          decoded.startsWith("/workspace") &&
          !decoded.includes("..") &&
          !decoded.includes("\0") &&
          !decoded.includes("//")
        ) {
          return decoded;
        }
      } catch { /* invalid encoding, fall through */ }
    }
    return "/workspace/dashboard";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  // Auto-register/login when inside Telegram Mini App
  useEffect(() => {
    if (!isReady || !isMiniApp || !initData) return;

    const autoRegister = async () => {
      setIsTelegramLoading(true);
      setError(null);
      try {
        const response = await authApi.telegramMiniApp({ initData });
        setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accessTokenExpires: response.accessTokenExpires,
          refreshTokenExpires: response.refreshTokenExpires,
        });
        setUser(response.user);
        router.push(getRedirectPath());
      } catch (err) {
        const apiError = err as { message?: string };
        setError(apiError.message || "خطا در ثبت نام با تلگرام. لطفاً دوباره تلاش کنید.");
        setIsTelegramLoading(false);
      }
    };

    autoRegister();
  }, [isReady, isMiniApp, initData, setUser, router]);

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setIsLoading(true);

    try {
      const { confirmPassword, ...submitData } = data;
      const response = await authApi.register(submitData);
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        accessTokenExpires: response.accessTokenExpires,
        refreshTokenExpires: response.refreshTokenExpires,
      });
      setUser(response.user);
      router.push(getRedirectPath());
    } catch (err) {
      const apiError = err as { message?: string };
      setError(apiError.message || "خطا در ثبت نام. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTelegramRegister = () => {
    window.open(`https://t.me/${BOT_USERNAME}?start=register`, "_blank");
  };

  // Inside Telegram Mini App: show only loading spinner during auto-auth
  if (isMiniApp && isReady && isTelegramLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0088cc] border-t-transparent mb-4" />
            <p className="text-sm text-muted-foreground">در حال ثبت نام با تلگرام...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ApletSymbol variant="light" size={48} />
          </div>
          <CardTitle className="text-2xl">ثبت نام در آپلت</CardTitle>
          <CardDescription>
            حساب کاربری خود را بسازید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div className="rounded-md bg-danger/10 p-3 text-sm text-danger">
                {error}
              </div>
            )}

            {!isMiniApp && (
              <>
                <TelegramButton
                  variant="login"
                  onClick={handleTelegramRegister}
                  isLoading={isTelegramLoading}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">یا</span>
                  </div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">نام</label>
                  <Input placeholder="نام" {...register("firstName")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">نام خانوادگی</label>
                  <Input placeholder="نام خانوادگی" {...register("lastName")} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ایمیل</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">رمز عبور</label>
                <Input
                  type="password"
                  placeholder="حداقل ۸ کاراکتر"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-danger">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">تکرار رمز عبور</label>
                <Input
                  type="password"
                  placeholder="تکرار رمز عبور"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                قبلاً ثبت نام کرده‌اید؟{" "}
                <Link href="/login" className="text-primary hover:underline">
                  وارد شوید
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
