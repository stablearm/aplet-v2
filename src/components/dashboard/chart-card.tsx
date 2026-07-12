import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, action, children, className }: ChartCardProps) {
  return (
    <div className={cn(
      "group relative rounded-2xl border border-border/40 bg-surface p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#5B5FEF]/15 overflow-hidden",
      className
    )}>
      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] sm:text-base font-bold text-text-primary">{title}</h3>
            {subtitle && <p className="text-[11px] sm:text-[12px] text-text-tertiary mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}
