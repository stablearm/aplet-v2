import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-text-secondary max-w-[300px] leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="mt-5">
          {action.href ? (
            <Link href={action.href}>
              <Button size="sm">{action.label}</Button>
            </Link>
          ) : (
            <Button size="sm" onClick={action.onClick}>{action.label}</Button>
          )}
        </div>
      )}
    </div>
  );
}
