"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";

interface Guide {
  slug: string;
  title: string;
  description: string;
}

const GUIDES_PER_PAGE = 6;

export function GuidesList({ allGuides }: { allGuides: Guide[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedGuides = allGuides.slice((currentPage - 1) * GUIDES_PER_PAGE, currentPage * GUIDES_PER_PAGE);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {paginatedGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="group relative rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/25 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FEF]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center rounded-full bg-[#5B5FEF]/8 px-2.5 py-0.5 text-[10px] font-bold text-[#5B5FEF]">
                  راهنمای جامع
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-3 leading-relaxed">
                {guide.title}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-3 mb-5 leading-relaxed">
                {guide.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#5B5FEF] font-semibold">
                مطالعه راهنما
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        totalItems={allGuides.length}
        itemsPerPage={GUIDES_PER_PAGE}
        onPageChange={setCurrentPage}
        className="mt-12"
      />
    </>
  );
}
