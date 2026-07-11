import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSanitize from "rehype-sanitize";
import type { ZodSchema } from "zod";
import { blogSchema, guideSchema, glossarySchema, resourceSchema } from "@/content/schema";
import type { BlogPost, Guide, GlossaryTerm, Resource } from "@/content/schema";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function getContentFiles(type: string): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function readContentFile(type: string, filename: string) {
  const filePath = path.join(CONTENT_DIR, type, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data, content, filePath };
}

function parseContent<T>(type: string, filename: string, schema: ZodSchema<T>): T {
  const { data } = readContentFile(type, filename);
  return schema.parse(data);
}

// Blog posts
export function getAllBlogPosts(): BlogPost[] {
  const files = getContentFiles("blog");
  return files
    .map((f) => {
      try {
        return parseContent("blog", f, blogSchema);
      } catch {
        return null;
      }
    })
    .filter((item): item is BlogPost => item !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPostBySlug(slug: string): { meta: BlogPost; content: string } | null {
  const files = getContentFiles("blog");
  const file = files.find((f) => {
    try {
      const meta = parseContent("blog", f, blogSchema);
      return meta.slug === slug;
    } catch {
      return false;
    }
  });
  if (!file) return null;
  const { data, content } = readContentFile("blog", file);
  return { meta: blogSchema.parse(data), content };
}

// Guides
export function getAllGuides(): Guide[] {
  const files = getContentFiles("guides");
  return files
    .map((f) => {
      try {
        return parseContent("guides", f, guideSchema);
      } catch {
        return null;
      }
    })
    .filter((item): item is Guide => item !== null)
    .sort((a, b) => a.order - b.order);
}

export function getGuideBySlug(slug: string): { meta: Guide; content: string } | null {
  const files = getContentFiles("guides");
  const file = files.find((f) => {
    try {
      const meta = parseContent("guides", f, guideSchema);
      return meta.slug === slug;
    } catch {
      return false;
    }
  });
  if (!file) return null;
  const { data, content } = readContentFile("guides", file);
  return { meta: guideSchema.parse(data), content };
}

// Glossary
export function getAllGlossaryTerms(): GlossaryTerm[] {
  const files = getContentFiles("glossary");
  return files
    .map((f) => {
      try {
        return parseContent("glossary", f, glossarySchema);
      } catch {
        return null;
      }
    })
    .filter((item): item is GlossaryTerm => item !== null)
    .sort((a, b) => a.term.localeCompare(b.term, "fa"));
}

export function getGlossaryBySlug(slug: string): { meta: GlossaryTerm; content: string } | null {
  const files = getContentFiles("glossary");
  const file = files.find((f) => {
    try {
      const meta = parseContent("glossary", f, glossarySchema);
      return meta.slug === slug;
    } catch {
      return false;
    }
  });
  if (!file) return null;
  const { data, content } = readContentFile("glossary", file);
  return { meta: glossarySchema.parse(data), content };
}

// Resources
export function getAllResources(): Resource[] {
  const files = getContentFiles("resources");
  return files
    .map((f) => {
      try {
        return parseContent("resources", f, resourceSchema);
      } catch {
        return null;
      }
    })
    .filter((item): item is Resource => item !== null);
}

export function getResourceBySlug(slug: string): { meta: Resource; content: string } | null {
  const files = getContentFiles("resources");
  const file = files.find((f) => {
    try {
      const meta = parseContent("resources", f, resourceSchema);
      return meta.slug === slug;
    } catch {
      return false;
    }
  });
  if (!file) return null;
  const { data, content } = readContentFile("resources", file);
  return { meta: resourceSchema.parse(data), content };
}

// MDX compilation
export async function compileMDXContent(source: string) {
  const result = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [rehypeSanitize, rehypeSlug, rehypeAutolinkHeadings, rehypeUnwrapImages],
      },
    },
  });
  return result;
}

// Reading time estimation
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Related content
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllBlogPosts();
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      ...p,
      relevance: p.tags.filter((t) => post.tags.includes(t)).length +
        (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}
