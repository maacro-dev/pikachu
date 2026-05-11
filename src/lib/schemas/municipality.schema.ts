import * as z from "astro/zod";
import { baseContentSchema } from "./shared.schema";

export const municipalitySchema = baseContentSchema.extend({
  municipality_id: z.uuid(),
  content_id: z.uuid(),
  district_id: z.uuid(),

  district_content_id: z.uuid(),
  district_slug: z.string(),
  district_name: z.string(),
});

export const normalizedMunicipalitySchema = municipalitySchema.transform((m) => {
  return {
    id: m.municipality_id,
    content_id: m.content_id,

    name: m.name,
    slug: m.slug,
    short_description: m.short_description,
    body: m.body ?? null,
    status: m.status,
    tags: m.tags ?? null,

    district_id: m.district_id,

    main_image: m.hero_image
      ? {
          url: m.hero_image,
          alt: m.hero_alt ?? null,
        }
      : null,

    gallery_images: m.gallery ?? [],
  };
});

export const municipalityArraySchema = z.array(municipalitySchema);

export const normalizedMunicipalityArraySchema = z.array(normalizedMunicipalitySchema);

export type Municipality = z.infer<typeof municipalitySchema>;

export type NormalizedMunicipality = z.infer<typeof normalizedMunicipalitySchema>;

export function parseMunicipality(data: unknown): Municipality {
  return municipalitySchema.parse(data);
}

export function parseMunicipalityArray(data: unknown): Array<Municipality> {
  return municipalityArraySchema.parse(data);
}

export function parseNormalizedMunicipalityArray(data: unknown): Array<NormalizedMunicipality> {
  return normalizedMunicipalityArraySchema.parse(data);
}
