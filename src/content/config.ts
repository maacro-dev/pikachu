import { defineCollection, z, reference } from "astro:content";

const districts = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string(),
    galleryImages: z.array(z.string()).optional().default([]),
    order: z.number().default(1),
  }),
});

const attractions = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    district: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
  }),
});

const food = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    district: z.string(),
    description: z.string(),
    image: z.string(),
    type: z.enum(["dish", "snack", "drink", "restaurant"]).default("dish"),
  }),
});

const festivals = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    district: z.string(),
    date: z.union([z.date(), z.string()]).transform((val: any) => {
      if (val instanceof Date) {
        return val.toISOString().slice(0, 10);
      }
      return val.replace(/^"|"$/g, '');
    }),
    month: z.number().min(1).max(12),
    description: z.string(),
    image: z.string(),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.union([z.date(), z.string()]).transform((val: any) => {
      if (val instanceof Date) {
        return val.toISOString().slice(0, 10);
      }
      return val.replace(/^"|"$/g, '');
    }),
    endDate: z.union([z.date(), z.string()]).transform((val: any) => {
      if (val instanceof Date) {
        return val.toISOString().slice(0, 10);
      }
      return val.replace(/^"|"$/g, '');
    }).optional(),
    district: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
    venue: z.string().optional(),
  }),
});

export const collections = { districts, attractions, food, festivals, events };
