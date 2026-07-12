import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1.5 text-sm text-text-secondary", className)} dir="rtl">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronLeft className="h-3.5 w-3.5 text-text-tertiary" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-text-primary transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
