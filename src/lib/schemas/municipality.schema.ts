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

export const municipalityArraySchema = z.array(municipalitySchema);

export type Municipality = z.infer<typeof municipalitySchema>;

export function parseMunicipality(data: unknown): Municipality {
  return municipalitySchema.parse(data);
}

export function parseMunicipalityArray(data: unknown): Array<Municipality> {
  return municipalityArraySchema.parse(data);
}
