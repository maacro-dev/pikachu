import * as z from "astro/zod";
import { baseContentSchema } from "./shared.schema";

export const festivalSchema = baseContentSchema.extend({
  festival_id: z.uuid(),
  content_id: z.uuid(),
  municipality_id: z.uuid(),
  district_id: z.uuid(),

  date: z.string(),

  municipality_slug: z.string(),
  municipality_name: z.string(),

  district_slug: z.string(),
  district_name: z.string(),
});

export const festivalArraySchema = z.array(festivalSchema);

export type Festival = z.infer<typeof festivalSchema>;

export function parseFestival(data: unknown): Festival {
  return festivalSchema.parse(data);
}

export function parseFestivalArray(data: unknown): Array<Festival> {
  return festivalArraySchema.parse(data);
}
