import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", className)} dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-tight leading-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-[13px] sm:text-sm text-text-tertiary/70">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
