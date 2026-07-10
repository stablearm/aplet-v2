"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ApletLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function ApletLogo({ className, variant }: ApletLogoProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const src = (variant === "dark" || (variant === undefined && isDark))
    ? "/brand/aplet-logo-dark.svg"
    : "/brand/aplet-logo-light.svg";

  return (
    <img
      src={src}
      alt="Aplet"
      className={cn("h-auto w-auto", className)}
    />
  );
}
