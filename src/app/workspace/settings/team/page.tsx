"use client";

import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function SettingsTeamPage() {
  return (
    <Card dir="rtl">
      <CardContent className="p-6">
        <EmptyState
          icon={<Users className="h-6 w-6" />}
          title="مدیریت تیم"
          description="قابلیت افزودن اعضای تیم به زودی اضافه خواهد شد."
        />
      </CardContent>
    </Card>
  );
}
