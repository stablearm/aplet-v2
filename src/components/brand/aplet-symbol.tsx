import { cn } from "@/lib/utils";

interface ApletSymbolProps {
  className?: string;
  variant?: "light" | "dark";
  size?: number;
}

export function ApletSymbol({ className, variant = "light", size = 40 }: ApletSymbolProps) {
  return (
    <img
      src={variant === "dark" ? "/brand/aplet-symbol-dark.svg" : "/brand/aplet-symbol.svg"}
      alt="Aplet"
      style={{ height: size, width: 'auto' }}
      className={cn("shrink-0", className)}
    />
  );
}
