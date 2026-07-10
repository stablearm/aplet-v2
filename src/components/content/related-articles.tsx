import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, HelpCircle, Package } from "lucide-react";

interface RelatedArticle {
  title: string;
  href: string;
  description?: string;
  type?: "blog" | "guide" | "glossary" | "resource" | "tool";
}

interface RelatedArticlesProps {
  title?: string;
  articles: RelatedArticle[];
  columns?: 2 | 3 | 4;
}

const typeIcons = {
  blog: FileText,
  guide: BookOpen,
  glossary: HelpCircle,
  resource: Package,
  tool: BookOpen,
};

const typeLabels = {
  blog: "مقاله",
  guide: "راهنما",
  glossary: "واژه",
  resource: "منبع",
  tool: "ابزار",
};

export function RelatedArticles({
  title = "مقاله‌های مرتبط",
  articles,
  columns = 3,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className="mt-12 pt-8 border-t border-border/50">
      <h2 className="text-xl font-extrabold text-text-primary mb-6">{title}</h2>
      <div className={`grid gap-4 ${gridClass}`}>
        {articles.map((article) => {
          const Icon = typeIcons[article.type || "blog"];
          return (
            <Link
              key={article.href}
              href={article.href}
              className="group block rounded-2xl border border-border/50 bg-surface p-5 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B5FEF]/10 text-[#5B5FEF] shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-[#5B5FEF] uppercase">
                    {typeLabels[article.type || "blog"]}
                  </span>
                  <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors text-sm mt-1 line-clamp-2">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{article.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#5B5FEF] font-medium mt-3">
                مطالعه
                <ArrowLeft className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
