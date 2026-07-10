import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGlossaryBySlug, getAllGlossaryTerms, compileMDXContent } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/content/article-layout";
import { RelatedArticles } from "@/components/content/related-articles";

export async function generateStaticParams() {
  const terms = getAllGlossaryTerms();
  return terms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryBySlug(slug);
  if (!term) return {};
  return generatePageMetadata({
    title: term.meta.term,
    description: term.meta.shortDefinition,
    path: `/glossary/${term.meta.slug}/`,
  });
}

// Map glossary categories to related hub pages
const categoryHubs: Record<string, Array<{ title: string; href: string; description: string }>> = {
  advertising: [
    { title: "تبلیغات تلگرام", href: "/telegram-ads/", description: "راهنمای تبلیغات در تلگرام" },
    { title: "راهنمای تبلیغات", href: "/guides/complete-telegram-advertising/", description: "جامع‌ترین راهنما برای تبلیغات" },
  ],
  marketing: [
    { title: "بازاریابی تلگرام", href: "/telegram-marketing/", description: "راهنمای بازاریابی در تلگرام" },
    { title: "راهنمای بازاریابی", href: "/guides/complete-telegram-marketing/", description: "جامع‌ترین راهنما برای بازاریابی" },
  ],
  platform: [
    { title: "کانال تلگرام", href: "/telegram-channel/", description: "مدیریت حرفه‌ای کانال" },
    { title: "بات تلگرام", href: "/telegram-bot/", description: "راهنمای بات‌های تلگرام" },
  ],
  growth: [
    { title: "رشد تلگرام", href: "/telegram-growth/", description: "روش‌های رشد کانال" },
    { title: "افزایش عضو", href: "/telegram-member-service/", description: "جذب اعضای واقعی" },
  ],
};

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getGlossaryBySlug(slug);
  if (!term) notFound();

  const { content: compiledContent } = await compileMDXContent(term.content);

  // Get related terms
  const allTerms = getAllGlossaryTerms();
  const related = term.meta.relatedTerms
    .map((t) => allTerms.find((at) => at.term === t))
    .filter(Boolean)
    .slice(0, 4);

  // Get related hub pages based on category
  const hubs = categoryHubs[term.meta.category] || [];

  // Static related content
  const staticRelated = [
    { title: "واژه‌نامه تلگرام", href: "/glossary/", description: "تمام اصطلاحات تلگرام", type: "glossary" as const },
    { title: "ابزارهای رایگان", href: "/tools/", description: "ماشین حساب‌ها و ابزارها", type: "tool" as const },
  ];

  return (
    <>
      <ArticleLayout
        title={term.meta.term}
        description={term.meta.shortDefinition}
        breadcrumbs={[
          { label: "واژه‌نامه", href: "/glossary" },
          { label: term.meta.term, href: `/glossary/${term.meta.slug}/` },
        ]}
        relatedContent={[
          ...related.map((r) => ({
            title: r!.term,
            href: `/glossary/${r!.slug}/`,
            description: r!.shortDefinition,
          })),
          ...hubs.map((h) => ({ title: h.title, href: h.href, description: h.description })),
        ]}
      >
        {compiledContent}
      </ArticleLayout>

      {/* Related terms */}
      {related.length > 0 && (
        <div className="container mx-auto px-4 max-w-4xl pb-12">
          <RelatedArticles
            title="واژه‌های مرتبط"
            articles={related.map((r) => ({
              title: r!.term,
              href: `/glossary/${r!.slug}/`,
              description: r!.shortDefinition,
              type: "glossary" as const,
            }))}
          />
        </div>
      )}

      {/* Related hub pages */}
      {hubs.length > 0 && (
        <div className="container mx-auto px-4 max-w-4xl pb-12">
          <RelatedArticles
            title="موضوعات مرتبط"
            articles={hubs.map((h) => ({
              title: h.title,
              href: h.href,
              description: h.description,
              type: "guide" as const,
            }))}
            columns={2}
          />
        </div>
      )}
    </>
  );
}
