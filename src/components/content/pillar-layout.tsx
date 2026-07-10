import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, BookOpen, Calendar, List } from "lucide-react";

interface PillarLayoutProps {
  title: string;
  description: string;
  author?: string;
  publishedAt?: string;
  readingTime?: number;
  tags?: string[];
  breadcrumbs?: Array<{ label: string; href: string }>;
  chapters: Array<{ id: string; title: string }>;
  clusterArticles?: Array<{ title: string; href: string; description?: string }>;
  children: React.ReactNode;
}

export function PillarLayout({
  title,
  description,
  author,
  publishedAt,
  readingTime,
  tags,
  breadcrumbs,
  chapters,
  clusterArticles,
  children,
}: PillarLayoutProps) {
  return (
    <>
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/7 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <div className="container relative mx-auto px-4 pt-28 pb-16 max-w-6xl">
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

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <BookOpen className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">راهنمای جامع</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-text-primary mb-5 leading-[1.25] tracking-tight max-w-3xl">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-8">
            {description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-text-tertiary mb-8">
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

          {/* Chapter pills */}
          {chapters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chapters.map((ch) => (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-surface/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-[#5B5FEF]/30 hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200"
                >
                  {ch.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
          {/* Main Content */}
          <div className="min-w-0">
            {/* Key Takeaways */}
            {chapters.length > 0 && (
              <div className="rounded-2xl border border-[#5B5FEF]/15 bg-gradient-to-br from-[#5B5FEF]/5 to-[#3B82F6]/3 p-6 mb-10">
                <h2 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                  <List className="h-4 w-4 text-[#5B5FEF]" />
                  نکات کلیدی
                </h2>
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  {chapters.slice(0, 6).map((ch, i) => (
                    <li key={ch.id} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B5FEF]/10 text-[10px] font-bold text-[#5B5FEF] mt-0.5">
                        {i + 1}
                      </span>
                      <a href={`#${ch.id}`} className="hover:text-[#5B5FEF] transition-colors leading-relaxed">{ch.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content */}
            <div className="prose-custom">
              {children}
            </div>

            {/* CTA */}
            <div className="mt-16 relative rounded-3xl bg-gradient-to-l from-[#5B5FEF] via-[#4F52E5] to-[#3B82F6] p-10 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="relative text-xl font-extrabold text-white mb-3">آماده اجرای این راهنما هستید؟</h2>
              <p className="relative text-white/80 text-sm mb-8 max-w-md mx-auto leading-relaxed">همین الان در آپلت ثبت‌نام کنید و ابزارهای حرفه‌ای مدیریت تلگرام را دریافت کنید.</p>
              <Link
                href="/register"
                className="relative inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-[#5B5FEF] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200"
              >
                شروع رایگان
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* TOC */}
              <div className="rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <h3 className="font-bold text-text-primary mb-3 text-sm flex items-center gap-2">
                  <List className="h-4 w-4 text-[#5B5FEF]" />
                  فهرست مطالب
                </h3>
                <nav className="space-y-0.5">
                  {chapters.map((ch) => (
                    <a
                      key={ch.id}
                      href={`#${ch.id}`}
                      className="block text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors py-1.5 px-2 rounded-lg hover:bg-[#5B5FEF]/5"
                    >
                      {ch.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Cluster Articles */}
              {clusterArticles && clusterArticles.length > 0 && (
                <div className="rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                  <h3 className="font-bold text-text-primary mb-3 text-sm">مقاله‌های مرتبط</h3>
                  <nav className="space-y-2">
                    {clusterArticles.map((article) => (
                      <Link
                        key={article.href}
                        href={article.href}
                        className="group block rounded-xl border border-border/30 bg-surface-elevated/50 p-3 hover:border-[#5B5FEF]/25 hover:bg-[#5B5FEF]/5 transition-all"
                      >
                        <p className="text-xs font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors leading-relaxed">{article.title}</p>
                        {article.description && (
                          <p className="text-[10px] text-text-tertiary mt-1 line-clamp-2">{article.description}</p>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              {/* Product CTA */}
              <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-surface to-surface-elevated p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15">
                    <BookOpen className="h-4 w-4 text-[#5B5FEF]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">آپلت</p>
                    <p className="text-[10px] text-text-tertiary">ابزار مدیریت کسب و کار تلگرام</p>
                  </div>
                </div>
                <Link
                  href="/register"
                  className="block w-full text-center h-9 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-xs font-bold text-white shadow-md shadow-[#5B5FEF]/20 hover:shadow-lg hover:shadow-[#5B5FEF]/30 hover:scale-[1.02] transition-all duration-200 leading-9"
                >
                  شروع رایگان
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
