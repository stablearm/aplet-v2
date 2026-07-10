import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizes[size],
        className
      )}
    />
  );
}

export function PageLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-64 items-center justify-center", className)}>
      <LoadingSpinner size="lg" />
    </div>
  );
}
