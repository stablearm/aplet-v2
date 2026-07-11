import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllGuides, getAllGlossaryTerms, getAllResources } from "@/lib/mdx";

const SITE_URL = "https://aplet.ir";

const staticPages = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
  { url: `${SITE_URL}/features/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  { url: `${SITE_URL}/pricing/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  { url: `${SITE_URL}/how-it-works/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: `${SITE_URL}/publishers/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  { url: `${SITE_URL}/advertisers/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  { url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  { url: `${SITE_URL}/guides/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  { url: `${SITE_URL}/glossary/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: `${SITE_URL}/resources/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  { url: `${SITE_URL}/tools/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: `${SITE_URL}/faq/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.5 },
  { url: `${SITE_URL}/contact/`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.5 },
  { url: `${SITE_URL}/terms/`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  { url: `${SITE_URL}/privacy/`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
];

const telegramHubs = [
  "telegram-ads",
  "telegram-marketing",
  "telegram-growth",
  "telegram-bot",
  "telegram-channel",
  "telegram-monetization",
  "telegram-analytics",
  "telegram-automation",
  "telegram-member-service",
];

const toolPages = [
  "tools/cpm-calculator",
  "tools/roi-calculator",
  "tools/engagement-calculator",
  "tools/growth-calculator",
  "tools/income-calculator",
  "tools/post-frequency-calculator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const hubPages = telegramHubs.map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolPageUrls = toolPages.map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic content pages
  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guides = getAllGuides().map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const glossaryTerms = getAllGlossaryTerms().map((term) => ({
    url: `${SITE_URL}/glossary/${term.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const resources = getAllResources().map((resource) => ({
    url: `${SITE_URL}/resources/${resource.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...hubPages,
    ...toolPageUrls,
    ...blogPosts,
    ...guides,
    ...glossaryTerms,
    ...resources,
  ];
}
