"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// TODO: Implement password change API endpoint
export default function SettingsSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.error("رمزهای عبور مطابقت ندارند");
      return;
    }
    // TODO: Call API endpoint when available
    toast.error("قابلیت تغییر رمز عبور هنوز پیاده‌سازی نشده است");
  };

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base">تغییر رمز عبور</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">رمز عبور فعلی</label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="رمز عبور فعلی"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">رمز عبور جدید</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="رمز عبور جدید"
            dir="ltr"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">تأیید رمز عبور جدید</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تأیید رمز عبور جدید"
            dir="ltr"
          />
        </div>
        <Button onClick={handleSubmit} disabled={!currentPassword || !newPassword || !confirmPassword} className="gap-1.5">
          <Save className="h-4 w-4" />
          ذخیره
        </Button>
      </CardContent>
    </Card>
  );
}
