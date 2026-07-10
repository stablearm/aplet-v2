"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime?: number;
  tags: string[];
  featured?: boolean;
  category?: string;
}

const POSTS_PER_PAGE = 8;

export function BlogList({ allPosts }: { allPosts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const featured = allPosts.filter((p) => p.featured);
  const nonFeatured = allPosts.filter((p) => !p.featured);
  const isFirstPage = currentPage === 1;
  const paginatedPosts = nonFeatured.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      {/* Featured Posts - only on first page */}
      {isFirstPage && featured.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-[#5B5FEF] mb-6 uppercase tracking-wider">ویژه</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group relative rounded-3xl border border-[#5B5FEF]/15 bg-gradient-to-br from-surface via-surface to-[#5B5FEF]/3 p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-[#5B5FEF]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#5B5FEF]">
                      ویژه
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {new Date(post.publishedAt).toLocaleDateString("fa-IR", { month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-3 leading-relaxed">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2.5 py-0.5 text-[10px] font-medium text-text-tertiary">
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-[#5B5FEF] font-semibold">
                      مطالعه
                      <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section>
        {isFirstPage && featured.length > 0 && (
          <h2 className="text-sm font-semibold text-text-tertiary mb-6 uppercase tracking-wider">همه مقالات</h2>
        )}
        <div className="space-y-4">
          {paginatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block rounded-2xl border border-border/40 bg-surface p-6 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-text-tertiary">
                      {new Date(post.publishedAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1 text-xs text-text-tertiary">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} دقیقه
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-2 leading-relaxed">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-surface-elevated px-2.5 py-0.5 text-[10px] font-medium text-text-tertiary">
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowLeft className="h-5 w-5 text-text-tertiary group-hover:text-[#5B5FEF] transition-colors shrink-0 mt-4 group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <Pagination
        totalItems={nonFeatured.length}
        itemsPerPage={POSTS_PER_PAGE}
        onPageChange={setCurrentPage}
        className="mt-12"
      />
    </>
  );
}
