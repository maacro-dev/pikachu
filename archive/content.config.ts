import { defineCollection } from "astro:content";
import { z } from "astro/zod"
import { glob } from "astro/loaders";


const districts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/districts" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string(),
    gettingThere: z.array(z.string()).optional().default([]),
    quickFacts: z.array(
      z.object({
        icon: z.string(),
        label: z.string(),
        value: z.string(),
      })
    ).optional().default([]),

    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
    ).optional().default([]),

    order: z.number().default(1),
  }),
});

const municipalities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/municipalities" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    district: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});


const attractions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/attractions" }),
  schema: z.object({
    name: z.string(),
    district: z.string(),
    municipality: z.string().optional(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
  }),
});


const food = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/food" }),
  schema: z.object({
    name: z.string(),
    district: z.string(),
    municipality: z.string().optional(),
    description: z.string(),
    image: z.string(),
    type: z.enum(["dish", "snack", "drink", "restaurant"]).default("dish"),

  }),
});

const festivals = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/festivals" }),
  schema: z.object({
    name: z.string(),
    district: z.string(),
    municipality: z.string().optional(),
    date: z.coerce.date(),
    month: z.number().min(1).max(12),
    description: z.string(),
    image: z.string(),
  }),
});


const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    district: z.string(),
    municipality: z.string().optional(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().default(false),
    venue: z.string().optional(),
  }),
});

export const collections = {
  districts,
  attractions,
  food,
  festivals,
  events,
  municipalities,
};
