import * as z from "astro/zod";
import { baseContentSchema, quickFactSchema } from "./shared.schema";

export const districtSchema = baseContentSchema.extend({
  district_id: z.uuid(),
  content_id: z.uuid(),

  tagline: z.string(),
  display_order: z.number(),

  getting_there_steps: z.array(z.string()).optional().default([]),
  quick_facts: z.array(quickFactSchema).optional().default([]),
});

export const normalizedDistrictSchema = districtSchema.transform((d) => {
  return {
    id: d.district_id,
    content_id: d.content_id,
    name: d.name,
    slug: d.slug,
    short_description: d.short_description,
    body: d.body ?? null,
    status: d.status,
    tags: d.tags ?? null,
    tagline: d.tagline,
    display_order: d.display_order,
    getting_there_steps: d.getting_there_steps ?? [],
    quick_facts: (d.quick_facts ?? []).reduce<Record<string, any>>((acc, fact: any) => {
      acc[fact.key] = fact.value;
      return acc;
    }, {}),
    main_image: d.hero_image
      ? {
        url: d.hero_image,
        alt: d.hero_alt ?? null,
      }
      : null,
    gallery_images: d.gallery ?? [],
  };
});


export const districtArraySchema = z.array(districtSchema);

export const normalizedDistrictArraySchema = z.array(normalizedDistrictSchema);

export type District = z.infer<typeof districtSchema>;

export type NormalizedDistrict = z.infer<typeof normalizedDistrictSchema>;

export function parseDistrict(data: unknown): District {
  return districtSchema.parse(data);
}

export function parseDistrictArray(data: unknown): Array<District> {
  return districtArraySchema.parse(data);
}

export function parseNormalizedDistrictArray(data: unknown): Array<NormalizedDistrict> {
  return normalizedDistrictArraySchema.parse(data);
}

