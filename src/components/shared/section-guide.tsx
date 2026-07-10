"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowLeft, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SectionGuideProps {
  icon: LucideIcon;
  title: string;
  description: string;
  steps?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function SectionGuide({
  icon: Icon,
  title,
  description,
  steps,
  ctaLabel,
  ctaHref,
  className,
}: SectionGuideProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={`rounded-2xl border border-[#5B5FEF]/15 bg-gradient-to-br from-[#5B5FEF]/5 via-surface to-[#3B82F6]/3 p-5 mb-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-text-primary">{title}</h3>
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 p-1 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface-elevated transition-colors"
              aria-label="بستن"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">{description}</p>

          {steps && steps.length > 0 && (
            <div className="space-y-2 mb-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B5FEF]/10 text-[10px] font-bold text-[#5B5FEF] mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-xs text-text-secondary leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          )}

          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#5B5FEF]/20 hover:shadow-lg hover:shadow-[#5B5FEF]/30 hover:scale-[1.02] transition-all duration-200"
            >
              {ctaLabel}
              <ArrowLeft className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
