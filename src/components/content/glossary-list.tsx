"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";

interface Term {
  slug: string;
  term: string;
  shortDefinition: string;
}

const TERMS_PER_PAGE = 20;

export function GlossaryList({ allTerms }: { allTerms: Term[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [letterFilter, setLetterFilter] = useState<string | null>(null);

  const filteredTerms = letterFilter
    ? allTerms.filter((t) => t.term[0] === letterFilter)
    : allTerms;

  const paginatedTerms = filteredTerms.slice((currentPage - 1) * TERMS_PER_PAGE, currentPage * TERMS_PER_PAGE);

  const grouped = paginatedTerms.reduce((acc, term) => {
    const letter = term.term[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof paginatedTerms>);

  const allLetters = [...new Set(allTerms.map((t) => t.term[0]))].sort();

  return (
    <>
      {/* Letter Navigation */}
      <div className="sticky top-20 z-10 mb-10 py-4 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setLetterFilter(null); setCurrentPage(1); }}
            className={`inline-flex h-9 items-center justify-center rounded-xl px-3 text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer ${
              !letterFilter
                ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-[#5B5FEF]/25"
                : "border border-border/40 bg-surface text-text-secondary hover:bg-[#5B5FEF]/10 hover:text-[#5B5FEF] hover:border-[#5B5FEF]/25"
            }`}
          >
            همه
          </button>
          {allLetters.map((l) => (
            <button
              key={l}
              onClick={() => { setLetterFilter(l); setCurrentPage(1); }}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer ${
                letterFilter === l
                  ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-[#5B5FEF]/25"
                  : "border border-border/40 bg-surface text-text-secondary hover:bg-[#5B5FEF]/10 hover:text-[#5B5FEF] hover:border-[#5B5FEF]/25"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-10">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b, "fa"))
          .map(([letter, letterTerms]) => (
            <div key={letter}>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF] to-[#3B82F6] text-white text-lg font-extrabold shadow-md shadow-[#5B5FEF]/20">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-border/50 to-transparent" />
                <span className="text-xs text-text-tertiary font-medium">{letterTerms.length} واژه</span>
              </div>
              <div className="grid gap-3">
                {letterTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}/`}
                    className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5B5FEF]/8 text-[#5B5FEF] group-hover:bg-[#5B5FEF]/15 transition-colors">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-1">
                        {term.term}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{term.shortDefinition}</p>
                    </div>
                    <ArrowLeft className="h-4 w-4 text-text-tertiary group-hover:text-[#5B5FEF] transition-colors shrink-0 mt-2 group-hover:-translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={filteredTerms.length}
        itemsPerPage={TERMS_PER_PAGE}
        onPageChange={setCurrentPage}
        className="mt-12"
      />
    </>
  );
}
