"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Users, TrendingUp, Settings, Trash2, Plus } from "lucide-react";
import { usePlatform, useDeletePlatform, useAddAdmin, useRemoveAdmin } from "@/features/platforms/hooks/use-platforms";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function PlatformDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: platform, isLoading } = usePlatform(id);
  const deleteMutation = useDeletePlatform();
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const addAdminMutation = useAddAdmin();

  const handleDelete = () => {
    if (confirm("آیا از حذف این پلتفرم اطمینان دارید؟")) {
      deleteMutation.mutate(id, {
        onSuccess: () => router.push("/workspace/platforms"),
      });
    }
  };

  const handleAddAdmin = () => {
    if (adminId) {
      addAdminMutation.mutate(
        { id, data: { adminTelegramId: adminId, adminUsername: adminUsername || undefined } },
        { onSuccess: () => { setShowAddAdmin(false); setAdminId(""); setAdminUsername(""); } }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-3"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div>
      </div>
    );
  }

  if (!platform) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">پلتفرم یافت نشد.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/workspace/platforms")}>بازگشت</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`@${platform.channelUsername}`}
        description={`بات: @${platform.botUsername}`}
        actions={
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 className="ml-2 h-4 w-4" /> حذف
            </Button>
            <Button variant="ghost" onClick={() => router.push("/workspace/platforms")}>
              <ArrowRight className="ml-2 h-4 w-4" /> بازگشت
            </Button>
          </div>
        }
      />

      {/* Status */}
      <Card dir="rtl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Badge variant={platform.webhookStatus === "set" ? "success" : "warning"}>
              {platform.webhookStatus === "set" ? "متصل" : "در انتظار"}
            </Badge>
            <span className="text-sm text-muted-foreground">شناسه بات: {platform.botId}</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success"><Users className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">اعضای جذب شده</p>
                <p className="text-2xl font-bold">{platform.totalUsersAddedByPlatform.toLocaleString("fa-IR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><TrendingUp className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">سهم فالو</p>
                <p className="text-2xl font-bold">{platform.followQuota}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card dir="rtl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning"><Settings className="h-5 w-5" /></div>
              <div>
                <p className="text-sm text-muted-foreground">تعداد ادمین‌ها</p>
                <p className="text-2xl font-bold">{platform.admins?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admins */}
      <Card dir="rtl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">ادمین‌های بات</CardTitle>
            <Button size="sm" onClick={() => setShowAddAdmin(!showAddAdmin)}>
              <Plus className="ml-2 h-4 w-4" /> افزودن ادمین
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddAdmin && (
            <div className="flex gap-2">
              <input className="flex h-10 rounded-md border bg-background px-3 py-2 text-sm" placeholder="شناسه تلگرام" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
              <input className="flex h-10 rounded-md border bg-background px-3 py-2 text-sm" placeholder="نام کاربری (اختیاری)" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} />
              <Button size="sm" onClick={handleAddAdmin} disabled={!adminId || addAdminMutation.isPending}>ذخیره</Button>
            </div>
          )}
          {platform.admins && platform.admins.length > 0 ? (
            <div className="space-y-2">
              {platform.admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <span className="font-medium">@{admin.username || "نامشخص"}</span>
                    <span className="text-xs text-muted-foreground mr-2">({admin.telegramId})</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">ادمینی اضافه نشده است.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
