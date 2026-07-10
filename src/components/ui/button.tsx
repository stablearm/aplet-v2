import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-lg shadow-[#5B5FEF]/30 hover:shadow-xl hover:shadow-[#5B5FEF]/40 hover:scale-[1.02]",
        destructive:
          "bg-gradient-to-l from-danger to-red-600 text-white shadow-lg shadow-danger/30 hover:shadow-xl hover:shadow-danger/40",
        outline:
          "border border-[#CBD5E1] bg-white text-text-primary hover:bg-[#F8FAFC] hover:border-[#5B5FEF]/40 hover:shadow-md dark:border-border/60 dark:bg-surface dark:hover:bg-muted/80",
        secondary:
          "bg-[#F1F5F9] text-text-primary hover:bg-[#E2E8F0] hover:shadow-md dark:bg-muted/80 dark:hover:bg-muted",
        ghost:
          "text-text-secondary hover:bg-[#F1F5F9] hover:text-text-primary dark:hover:bg-muted/60",
        link:
          "text-[#5B5FEF] underline-offset-4 hover:underline",
        accent:
          "bg-gradient-to-l from-[#3B82F6] to-[#10B981] text-white shadow-lg shadow-[#3B82F6]/30 hover:shadow-xl hover:shadow-[#3B82F6]/40",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-11 rounded-xl px-7 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
