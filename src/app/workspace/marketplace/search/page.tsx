"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useMarketplaceChannels, useMarketplaceGroups } from "@/features/marketplace/hooks/use-marketplace";
import { useDebounce } from "@/hooks/use-debounce";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

export default function MarketplaceSearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"channels" | "groups">("channels");
  const debouncedQuery = useDebounce(query, 300);

  const { data: channels, isLoading: channelsLoading } = useMarketplaceChannels({ page: 1, limit: 50 });
  const { data: groups, isLoading: groupsLoading } = useMarketplaceGroups({ page: 1, limit: 50 });

  const isLoading = channelsLoading || groupsLoading;
  const items = type === "channels" ? channels : groups;

  const filtered = debouncedQuery
    ? items?.filter(
        (item) =>
          item.username?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : items;

  return (
    <div className="space-y-6">
      <PageHeader
        title="جستجو"
        description="جستجو در پلتفرم‌ها و گروه‌ها"
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جستجو بر اساس نام یا نام کاربری..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
            dir="rtl"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={type === "channels" ? "default" : "outline"}
            onClick={() => setType("channels")}
          >
            کانال‌ها
          </Button>
          <Button
            variant={type === "groups" ? "default" : "outline"}
            onClick={() => setType("groups")}
          >
            گروه‌ها
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/workspace/marketplace/publishers/${item.id}`}>
              <Card dir="rtl" className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">@{item.username}</p>
                      <p className="text-sm text-muted-foreground" dir="ltr">@{item.username}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.category || "عمومی"}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatNumber(item.memberCount || 0)} عضو
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="h-6 w-6" />}
          title="نتیجه‌ای یافت نشد"
          description="با کلمات کلیدی دیگری جستجو کنید."
        />
      )}
    </div>
  );
}
