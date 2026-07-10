"use client";

import { Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";

export default function SettingsApiPage() {
  return (
    <Card dir="rtl">
      <CardContent className="p-6">
        <EmptyState
          icon={<Key className="h-6 w-6" />}
          title="مدیریت API"
          description="قابلیت مدیریت کلیدهای API به زودی اضافه خواهد شد."
        />
      </CardContent>
    </Card>
  );
}
