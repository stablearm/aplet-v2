"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";

const themes = ["light", "dark", "system"] as const;
const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function ThemeToggle({ className, size = "icon" }: ThemeToggleProps) {
  const { theme, setTheme } = useUIStore();

  const cycleTheme = () => {
    const idx = themes.indexOf(theme);
    setTheme(themes[(idx + 1) % themes.length]);
  };

  const Icon = icons[theme];

  return (
    <Button
      size={size}
      variant="ghost"
      onClick={cycleTheme}
      className={className ?? "h-9 w-9 rounded-xl"}
      title={`Current: ${theme}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
