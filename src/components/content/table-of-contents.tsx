"use client";

import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="hidden lg:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-text-primary mb-3"
      >
        <List className="h-4 w-4" />
        فهرست مطالب
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <nav className={`space-y-1 ${isOpen ? "" : "max-h-0 overflow-hidden lg:max-h-none lg:overflow-visible"}`}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm py-1 transition-colors ${
              item.level === 3 ? "pr-4" : ""
            } ${
              activeId === item.id
                ? "text-[#5B5FEF] font-medium"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
