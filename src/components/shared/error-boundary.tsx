import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "خطا در بارگذاری",
  message = "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn("border-danger/20", className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/10 text-danger mb-4">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold text-text-primary">{title}</h3>
        <p className="mt-1.5 text-sm text-text-secondary max-w-[300px]">{message}</p>
        {onRetry && (
          <Button size="sm" variant="outline" className="mt-5" onClick={onRetry}>
            <RefreshCw className="ml-1.5 h-3.5 w-3.5" />
            تلاش مجدد
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
