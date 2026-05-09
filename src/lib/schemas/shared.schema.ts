import * as z from "astro/zod";

export const galleryItemSchema = z.object({
  url: z.string(),
  alt: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  order: z.number().optional().nullable(),
});

export const quickFactSchema = z.object({
  icon: z.string(),
  label: z.string(),
  value: z.string(),
});

export const baseContentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  short_description: z.string(),
  body: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  featured: z.boolean().catch(false),
  status: z.enum(["draft", "published"]),
  published_at: z.string().nullable(),
  hero_image: z.string(),
  hero_alt: z.string().nullable(),
  gallery: z.array(galleryItemSchema).optional().default([]),
});
