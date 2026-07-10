"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Megaphone, Radio, Bot, Wallet, Store, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchResult {
  id: string;
  title: string;
  type: "campaign" | "platform" | "bot" | "wallet" | "marketplace";
  href: string;
}

const staticResults: SearchResult[] = [
  { id: "1", title: "کمپین‌ها", type: "campaign", href: "/workspace/campaigns" },
  { id: "2", title: "پلتفرم‌ها", type: "platform", href: "/workspace/platforms" },
  { id: "3", title: "بات‌های محتوا", type: "bot", href: "/workspace/bots" },
  { id: "4", title: "کیف پول", type: "wallet", href: "/workspace/wallet" },
  { id: "5", title: "مارکت‌پلیس", type: "marketplace", href: "/workspace/marketplace" },
  { id: "6", title: "داشبورد", type: "campaign", href: "/workspace/dashboard" },
  { id: "7", title: "درآمد", type: "wallet", href: "/workspace/revenue" },
  { id: "8", title: "تحلیل‌ها", type: "campaign", href: "/workspace/analytics" },
  { id: "9", title: "اشتراک", type: "wallet", href: "/workspace/subscription" },
  { id: "10", title: "تنظیمات", type: "wallet", href: "/workspace/settings" },
];

const typeIcons: Record<string, React.ReactNode> = {
  campaign: <Megaphone className="h-4 w-4" />,
  platform: <Radio className="h-4 w-4" />,
  bot: <Bot className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
  marketplace: <Store className="h-4 w-4" />,
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredResults = staticResults.filter(
    (r) => r.title.includes(query) || query === ""
  );

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-lg" dir="rtl">
        <div className="flex items-center border-b border-border/50 px-4">
          <Search className="h-4 w-4 text-text-tertiary ml-2" />
          <Input
            placeholder="جستجو..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 shadow-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="ml-2 p-1 rounded-lg hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-text-tertiary" />
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredResults.length > 0 ? (
            <div className="space-y-1">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.href)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors"
                >
                  <div className="text-text-tertiary">{typeIcons[result.type]}</div>
                  <span className="font-medium text-text-primary">{result.title}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-text-tertiary">
              نتیجه‌ای یافت نشد.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
