import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getResourceBySlug, getAllResources, compileMDXContent } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/content/article-layout";

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return generatePageMetadata({
    title: resource.meta.title,
    description: resource.meta.description,
    path: `/resources/${resource.meta.slug}/`,
  });
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const { content: compiledContent } = await compileMDXContent(resource.content);

  return (
    <ArticleLayout
      title={resource.meta.title}
      description={resource.meta.description}
      breadcrumbs={[
        { label: "منابع", href: "/resources" },
        { label: resource.meta.title, href: `/resources/${resource.meta.slug}/` },
      ]}
    >
      {compiledContent}

      {resource.meta.items.length > 0 && (
        <div className="mt-8 space-y-4">
          {resource.meta.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-text-primary mb-1">{item.name}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs text-[#5B5FEF] font-medium hover:underline"
                  >
                    مشاهده
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ArticleLayout>
  );
}
