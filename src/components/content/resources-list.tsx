"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";

interface Resource {
  slug: string;
  title: string;
  description: string;
}

const RESOURCES_PER_PAGE = 8;

export function ResourcesList({ allResources }: { allResources: Resource[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedResources = allResources.slice((currentPage - 1) * RESOURCES_PER_PAGE, currentPage * RESOURCES_PER_PAGE);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {paginatedResources.map((resource) => (
          <Link
            key={resource.slug}
            href={`/resources/${resource.slug}/`}
            className="group relative rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/25 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FEF]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] mb-5 group-hover:scale-110 transition-transform duration-300">
                <Package className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-extrabold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-3 leading-relaxed">
                {resource.title}
              </h2>
              <p className="text-sm text-text-secondary line-clamp-2 mb-5 leading-relaxed">
                {resource.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#5B5FEF] font-semibold">
                مشاهده منابع
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        totalItems={allResources.length}
        itemsPerPage={RESOURCES_PER_PAGE}
        onPageChange={setCurrentPage}
        className="mt-12"
      />
    </>
  );
}
