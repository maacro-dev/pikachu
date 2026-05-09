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

export const districtArraySchema = z.array(districtSchema);

export type District = z.infer<typeof districtSchema>;

export function parseDistrict(data: unknown): District {
  return districtSchema.parse(data);
}

export function parseDistrictArray(data: unknown): Array<District> {
  return districtArraySchema.parse(data);
}
