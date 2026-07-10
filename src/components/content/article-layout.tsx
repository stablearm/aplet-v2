import Link from "next/link";
import { Clock, Tag, ArrowRight, ArrowLeft, BookOpen, Calendar } from "lucide-react";

interface ArticleLayoutProps {
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  readingTime?: number;
  tags?: string[];
  breadcrumbs?: Array<{ label: string; href: string }>;
  children: React.ReactNode;
  relatedContent?: Array<{ title: string; href: string; description?: string }>;
}

export function ArticleLayout({
  title,
  description,
  author,
  publishedAt,
  readingTime,
  tags,
  breadcrumbs,
  children,
  relatedContent,
}: ArticleLayoutProps) {
  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-radial from-[#3B82F6]/4 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="container relative mx-auto px-4 pt-28 pb-16 max-w-4xl">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-sm text-text-tertiary mb-8">
              <Link href="/" className="hover:text-[#5B5FEF] transition-colors">خانه</Link>
              {breadcrumbs.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-border">/</span>
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={item.href} className="hover:text-[#5B5FEF] transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-text-secondary font-medium">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#5B5FEF]/8 border border-[#5B5FEF]/15 px-3 py-1 text-xs font-semibold text-[#5B5FEF]">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-text-primary mb-5 leading-[1.25] tracking-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-8">
              {description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-text-tertiary">
            {author && (
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15">
                  <BookOpen className="h-3.5 w-3.5 text-[#5B5FEF]" />
                </span>
                <span className="font-medium text-text-secondary">{author}</span>
              </span>
            )}
            {publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishedAt}>
                  {new Date(publishedAt).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </span>
            )}
            {readingTime && (
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} دقیقه مطالعه
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose-custom">
          {children}
        </div>

        {/* Related Content */}
        {relatedContent && relatedContent.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border/30">
            <h2 className="text-xl font-extrabold text-text-primary mb-6">مقاله‌های مرتبط</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedContent.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border/40 bg-gradient-to-br from-surface to-surface-elevated p-5 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-2 text-sm leading-relaxed">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{item.description}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-[#5B5FEF] mt-3 font-semibold">
                    مطالعه
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 relative rounded-3xl bg-gradient-to-l from-[#5B5FEF] via-[#4F52E5] to-[#3B82F6] p-10 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-xl font-extrabold text-white mb-3">آماده شروع هستید؟</h2>
          <p className="relative text-white/80 text-sm mb-8 max-w-md mx-auto leading-relaxed">همین الان رایگان ثبت‌نام کنید و کسب و کار تلگرامی خود را متحول کنید.</p>
          <Link
            href="/register"
            className="relative inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-[#5B5FEF] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200"
          >
            شروع رایگان
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </article>
    </>
  );
}
