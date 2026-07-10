"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsNotificationsPage() {
  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-base">کانال‌های اعلان</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-text-primary">اعلان‌های تلگرام</p>
            <p className="text-[12px] text-text-tertiary">دریافت اعلان از طریق ربات تلگرام</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-text-primary">اعلان‌های ایمیل</p>
            <p className="text-[12px] text-text-tertiary">دریافت اعلان از طریق ایمیل</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-text-primary">اعلان‌های مالی</p>
            <p className="text-[12px] text-text-tertiary">اعلان واریز و برداشت</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-text-primary">اعلان‌های کمپین</p>
            <p className="text-[12px] text-text-tertiary">اعلان وضعیت کمپین‌ها</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
