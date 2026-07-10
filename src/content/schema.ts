import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  author: z.string().default("آپلت"),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().default("general"),
  featured: z.boolean().default(false),
  image: z.string().optional(),
});

export const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  icon: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().default("general"),
  pillar: z.string().optional(),
  order: z.number().default(0),
  image: z.string().optional(),
});

export const glossarySchema = z.object({
  term: z.string(),
  slug: z.string(),
  shortDefinition: z.string(),
  category: z.string().default("general"),
  relatedTerms: z.array(z.string()).default([]),
  image: z.string().optional(),
});

export const resourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  category: z.string().default("general"),
  items: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    icon: z.string().optional(),
  })).default([]),
  image: z.string().optional(),
});

export type BlogPost = z.infer<typeof blogSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type GlossaryTerm = z.infer<typeof glossarySchema>;
export type Resource = z.infer<typeof resourceSchema>;
