import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  value: number;
  isPositive?: boolean;
  label?: string;
  className?: string;
}

export function TrendIndicator({ value, isPositive, label, className }: TrendIndicatorProps) {
  const direction = isPositive === undefined ? "neutral" : isPositive ? "up" : "down";

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-semibold",
          direction === "up" && "bg-success/10 text-success",
          direction === "down" && "bg-danger/10 text-danger",
          direction === "neutral" && "bg-muted text-text-tertiary"
        )}
      >
        {direction === "up" && <TrendingUp className="h-3 w-3" />}
        {direction === "down" && <TrendingDown className="h-3 w-3" />}
        {direction === "neutral" && <Minus className="h-3 w-3" />}
        {direction === "up" ? "+" : ""}{value}%
      </span>
      {label && (
        <span className="text-[11px] text-text-tertiary/70">{label}</span>
      )}
    </div>
  );
}
