"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { useProfile, useUpdateProfile } from "@/features/settings/hooks/use-settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
    }
  }, [profile]);

  if (isLoading) {
    return (
      <Card dir="rtl">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = () => {
    updateProfile.mutate(
      { firstName, lastName },
      {
        onSuccess: () => toast.success("پروفایل به‌روزرسانی شد"),
        onError: () => toast.error("خطا در به‌روزرسانی پروفایل"),
      }
    );
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base">اطلاعات شخصی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">نام</label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">نام خانوادگی</label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">ایمیل</label>
          <Input value={profile?.email || ""} disabled />
        </div>
        <Button size="sm" onClick={handleSubmit} loading={updateProfile.isPending} className="gap-1.5">
          <Save className="h-4 w-4" />
          ذخیره
        </Button>
      </CardContent>
    </Card>
  );
}
