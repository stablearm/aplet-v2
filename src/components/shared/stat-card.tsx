"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  loading = false,
  className,
}: StatCardProps) {
  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20 skeleton-shimmer" />
            <Skeleton className="h-8 w-8 rounded-lg skeleton-shimmer" />
          </div>
          <Skeleton className="mt-3 h-7 w-24 skeleton-shimmer" />
          <Skeleton className="mt-1.5 h-3 w-16 skeleton-shimmer" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">{title}</p>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-xl font-bold text-text-primary tracking-tight">{value}</p>
          {description && (
            <span className="text-xs font-medium text-text-tertiary">{description}</span>
          )}
        </div>
        {trend && (
          <div className="mt-2 flex items-center gap-1.5">
            {trend.isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-danger" />
            )}
            <span
              className={cn(
                "text-xs font-semibold",
                trend.isPositive ? "text-success" : "text-danger"
              )}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
