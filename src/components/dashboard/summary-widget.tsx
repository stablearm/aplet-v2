import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface SummaryWidgetProps {
  title: string;
  items: SummaryItem[];
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function SummaryWidget({ title, items, action, className }: SummaryWidgetProps) {
  return (
    <div className={cn(
      "group relative rounded-2xl border border-border/40 bg-gradient-to-br from-white via-white to-[#F8FAFC] p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#5B5FEF]/15 overflow-hidden dark:from-surface dark:via-surface dark:to-surface-elevated",
      className
    )}>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] sm:text-[15px] font-bold text-text-primary">{title}</h3>
          {action && (
            <Link
              href={action.href}
              className="flex items-center gap-1 text-[11px] sm:text-[12px] font-semibold text-[#5B5FEF] hover:text-[#4F52E5] transition-all duration-200 hover:gap-1.5"
            >
              {action.label}
              <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>
          )}
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between py-3 px-3 rounded-xl transition-all duration-200",
                item.highlight
                  ? "bg-gradient-to-l from-[#5B5FEF]/10 to-[#5B5FEF]/5 border border-[#5B5FEF]/10 dark:from-[#5B5FEF]/8 dark:to-[#5B5FEF]/3"
                  : "hover:bg-[#F1F5F9] dark:hover:bg-muted/30"
              )}
            >
              <span className="text-[12px] sm:text-[13px] text-text-secondary truncate pr-1">{item.label}</span>
              <span className={cn(
                "text-[12px] sm:text-[13px] font-bold shrink-0",
                item.highlight ? "text-[#5B5FEF]" : "text-text-primary"
              )}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
