import * as z from "astro/zod";
import { baseContentSchema } from "./shared.schema";

export const attractionSchema = baseContentSchema.extend({
  attraction_id: z.uuid(),
  content_id: z.uuid(),
  municipality_id: z.uuid(),
  district_id: z.uuid(),

  municipality_slug: z.string(),
  municipality_name: z.string(),

  district_slug: z.string(),
  district_name: z.string(),
});

export const attractionArraySchema = z.array(attractionSchema);

export type Attraction = z.infer<typeof attractionSchema>;

export function parseAttraction(data: unknown): Attraction {
  return attractionSchema.parse(data);
}

export function parseAttractionArray(data: unknown): Array<Attraction> {
  return attractionArraySchema.parse(data);
}
