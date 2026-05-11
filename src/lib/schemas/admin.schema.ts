import * as z from "astro/zod";
import { normalizedDistrictArraySchema, normalizedDistrictSchema } from "./district.schema";
import { municipalitySchema, normalizedMunicipalityArraySchema, normalizedMunicipalitySchema } from "./municipality.schema";
import { attractionSchema } from "./attraction.schema";
import { foodSchema } from "./food.schema";
import { festivalSchema } from "./festival.schema";
import { eventSchema } from "./event.schema";


export const adminDataSchema = z.object({
  districts: normalizedDistrictArraySchema,
  municipalities: normalizedMunicipalityArraySchema,

  attractions: z.array(attractionSchema),
  foods: z.array(foodSchema),
  festivals: z.array(festivalSchema),
  events: z.array(eventSchema),

  loading: z.boolean(),
  error: z.any().nullable(),
});

export type AdminData = z.infer<typeof adminDataSchema>


export function parseAdminDataSchema(data: unknown): AdminData {
  return adminDataSchema.parse(data);
}
