"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignTabsProps {
  campaignId: string;
}

export function CampaignTabs({ campaignId }: CampaignTabsProps) {
  const pathname = usePathname();
  const basePath = `/workspace/campaigns/${campaignId}`;

  const tabs = [
    { value: "overview", label: "overview", href: basePath },
    { value: "members", label: "اعضا", href: `${basePath}/members` },
    { value: "analytics", label: "تحلیل‌ها", href: `${basePath}/analytics` },
  ];

  const currentValue = pathname === basePath ? "overview" : pathname.includes("/members") ? "members" : "analytics";

  return (
    <Tabs defaultValue={currentValue} dir="rtl">
      <TabsList>
        {tabs.map((tab) => (
          <Link key={tab.value} href={tab.href}>
            <TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
