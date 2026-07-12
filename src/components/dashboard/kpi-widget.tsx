import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendIndicator } from "@/components/shared/trend-indicator";
import { type LucideIcon } from "lucide-react";

interface KPIWidgetProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  loading?: boolean;
  className?: string;
  accentColor?: string;
}

export function KPIWidget({ label, value, unit, icon: Icon, trend, loading, className, accentColor = "#5B5FEF" }: KPIWidgetProps) {
  if (loading) {
    return (
      <div className={cn("rounded-2xl border border-border/30 bg-gradient-to-br from-surface to-surface-elevated p-5 shadow-sm", className)}>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-3 w-20 skeleton-shimmer" />
          <Skeleton className="h-10 w-10 rounded-xl skeleton-shimmer" />
        </div>
        <Skeleton className="h-10 w-32 mb-2 skeleton-shimmer" />
        <Skeleton className="h-3 w-16 skeleton-shimmer" />
      </div>
    );
  }

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl border border-border/40 bg-surface p-4 sm:p-5 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#5B5FEF]/[0.08] hover:border-[#5B5FEF]/25 hover:-translate-y-1",
      className
    )}>
      {/* Decorative gradient orb */}
      <div
        className="absolute -top-12 -left-12 h-24 w-24 rounded-full opacity-[0.08] blur-2xl transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-125 dark:opacity-[0.07] dark:group-hover:opacity-[0.12]"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-[11px] sm:text-[12px] font-semibold text-text-tertiary/80 uppercase tracking-wide">{label}</p>
          {Icon && (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
              style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl sm:text-[32px] font-extrabold text-text-primary tracking-tight leading-none">{value}</span>
          {unit && <span className="text-xs sm:text-[13px] font-semibold text-text-tertiary/70">{unit}</span>}
        </div>

        {trend && (
          <div className="mt-3">
            <TrendIndicator
              value={trend.value}
              isPositive={trend.isPositive}
              label={trend.label}
            />
          </div>
        )}
      </div>
    </div>
  );
}
