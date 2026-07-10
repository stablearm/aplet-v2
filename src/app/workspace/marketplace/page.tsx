"use client";

import { useState } from "react";
import { Store, Search, Filter, Users, Eye, Calendar } from "lucide-react";
import { useMarketplaceChannels, useMarketplaceGroups } from "@/features/marketplace/hooks/use-marketplace";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionGuide } from "@/components/shared/section-guide";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"channels" | "groups">("channels");
  const { data: channels, isLoading: channelsLoading } = useMarketplaceChannels();
  const { data: groups, isLoading: groupsLoading } = useMarketplaceGroups();

  const listings = activeTab === "channels" ? channels : groups;
  const isLoading = activeTab === "channels" ? channelsLoading : groupsLoading;

  return (
    <div className="space-y-6">
      <PageHeader title="مارکت‌پلیس" description="خرید و فروش کانال‌های تلگرام" />

      {/* Guide */}
      <SectionGuide
        icon={Store}
        title="مارکت‌پلیس چیست؟"
        description="در مارکت‌پلیس می‌توانید کانال‌ها و گروه‌های تلگرامی را برای خرید و فروش پیدا کنید. اگر کانال دارید، می‌توانید آن را برای فروش لیست کنید."
        steps={[
          "کانال یا گروه مورد نظر خود را جستجو کنید",
          "اطلاعات کانال شامل اعضا، بازدید و قیمت را بررسی کنید",
          "کانال را خریداری یا کانال خود را برای فروش لیست کنید",
        ]}
      />

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "channels" ? "default" : "outline"}
          onClick={() => setActiveTab("channels")}
        >
          کانال‌ها
        </Button>
        <Button
          variant={activeTab === "groups" ? "default" : "outline"}
          onClick={() => setActiveTab("groups")}
        >
          گروه‌ها
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="جستجوی کانال..." className="pr-10" />
        </div>
        <Button variant="outline">
          <Filter className="ml-2 h-4 w-4" />
          فیلتر
        </Button>
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:border-primary transition-colors cursor-pointer" dir="rtl">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">@{listing.username}</h3>
                  <Badge variant={listing.type === "channel" ? "default" : "secondary"}>
                    {listing.type === "channel" ? "کانال" : "گروه"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {listing.description || "توضیحات موجود نیست"}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {listing.memberCount.toLocaleString("fa-IR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {listing.averageViewCount.toLocaleString("fa-IR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {listing.creationYear}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {listing.price.toLocaleString("fa-IR")} تومان
                  </span>
                  <Button size="sm">خرید</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Store className="h-6 w-6" />}
          title="موردی یافت نشد"
          description="در حال حاضر آگهی‌ای در مارکت‌پلیس وجود ندارد."
        />
      )}
    </div>
  );
}
