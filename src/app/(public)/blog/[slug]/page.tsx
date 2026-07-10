import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDXContent, getBlogPostBySlug, getAllBlogPosts, estimateReadingTime } from "@/lib/mdx";
import { generateArticleMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleLayout } from "@/components/content/article-layout";
import { RelatedArticles } from "@/components/content/related-articles";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return generateArticleMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${post.meta.slug}/`,
    author: post.meta.author,
    publishedAt: post.meta.publishedAt,
    updatedAt: post.meta.updatedAt,
    tags: post.meta.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const { content: compiledContent } = await compileMDXContent(post.content);
  const readingTime = estimateReadingTime(post.content);

  // Find related posts by shared tags
  const allPosts = getAllBlogPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.meta.slug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => post.meta.tags.includes(t)).length +
        (p.category === post.meta.category ? 2 : 0),
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Static related content (guides, tools, glossary)
  const staticRelated = [
    { title: "راهنمای جامع بازاریابی تلگرام", href: "/guides/complete-telegram-marketing/", description: "جامع‌ترین راهنما برای بازاریابی در تلگرام", type: "guide" as const },
    { title: "ابزارهای رایگان", href: "/tools/", description: "ماشین حساب‌ها و ابزارهای تحلیلی", type: "tool" as const },
    { title: "واژه‌نامه تلگرام", href: "/glossary/", description: "فرهنگ لغت اصطلاحات تلگرام", type: "glossary" as const },
  ];

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.meta.title,
          description: post.meta.description,
          path: `/blog/${post.meta.slug}/`,
          author: post.meta.author,
          publishedAt: post.meta.publishedAt,
          updatedAt: post.meta.updatedAt,
        })}
      />
      <ArticleLayout
        title={post.meta.title}
        description={post.meta.description}
        author={post.meta.author}
        publishedAt={post.meta.publishedAt}
        readingTime={readingTime}
        tags={post.meta.tags}
        breadcrumbs={[
          { label: "بلاگ", href: "/blog" },
          { label: post.meta.title, href: `/blog/${post.meta.slug}/` },
        ]}
        relatedContent={[
          ...related.map((r) => ({ title: r.title, href: `/blog/${r.slug}/`, description: r.description })),
          ...staticRelated,
        ]}
      >
        {compiledContent}
      </ArticleLayout>

      {/* Related posts section */}
      {related.length > 0 && (
        <div className="container mx-auto px-4 max-w-4xl pb-12">
          <RelatedArticles
            title="مقاله‌های مرتبط"
            articles={related.map((r) => ({
              title: r.title,
              href: `/blog/${r.slug}/`,
              description: r.description,
              type: "blog" as const,
            }))}
          />
        </div>
      )}
    </>
  );
}
