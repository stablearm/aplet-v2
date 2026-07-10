"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  page?: number;
  totalPages?: number;
  className?: string;
  onPageChange?: (page: number) => void;
}

export function Pagination({ totalItems, itemsPerPage, page: controlledPage, totalPages: controlledTotalPages, className, onPageChange }: PaginationProps) {
  const calculatedTotalPages = controlledTotalPages ?? Math.ceil((totalItems || 0) / (itemsPerPage || 1));
  const totalPages = calculatedTotalPages;
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;

  if (totalPages <= 1 || !Number.isFinite(totalPages)) return null;

  function goToPage(page: number) {
    const p = Math.max(1, Math.min(page, totalPages));
    if (controlledPage === undefined) {
      setInternalPage(p);
    }
    onPageChange?.(p);
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <>
      {/* Page info */}
      <div className="text-center text-xs text-text-tertiary mb-4">
        صفحه {currentPage} از {totalPages}
      </div>
      <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="صفحه‌بندی">
        {/* Previous */}
        {currentPage > 1 ? (
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-surface text-text-secondary hover:border-[#5B5FEF]/30 hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200 cursor-pointer"
            aria-label="صفحه قبل"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/20 bg-surface-elevated/50 text-text-tertiary/40">
            <ChevronRight className="h-4 w-4" />
          </span>
        )}

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="flex h-9 w-9 items-center justify-center text-text-tertiary text-sm">
              ...
            </span>
          ) : Number.isFinite(p) ? (
            <button
              key={String(p)}
              onClick={() => goToPage(p as number)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                p === currentPage
                  ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-md shadow-[#5B5FEF]/25"
                  : "border border-border/40 bg-surface text-text-secondary hover:border-[#5B5FEF]/30 hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5"
              }`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {String(p)}
            </button>
          ) : null
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-surface text-text-secondary hover:border-[#5B5FEF]/30 hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200 cursor-pointer"
            aria-label="صفحه بعد"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/20 bg-surface-elevated/50 text-text-tertiary/40">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </nav>
    </>
  );
}
