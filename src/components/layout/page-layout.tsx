import { cn } from "@/lib/utils";
import { PageHeader } from "./page-header";
import { Breadcrumb } from "./breadcrumb";

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  actions,
  breadcrumbs,
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <PageHeader title={title} description={description} actions={actions} />
      {children}
    </div>
  );
}
