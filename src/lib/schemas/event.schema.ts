import * as z from "astro/zod";
import { baseContentSchema } from "./shared.schema";

export const eventSchema = baseContentSchema.extend({
  event_id: z.uuid(),
  content_id: z.uuid(),
  municipality_id: z.uuid(),
  district_id: z.uuid(),

  date: z.string(),
  end_date: z.string().nullable(),
  venue: z.string().nullable(),

  municipality_slug: z.string(),
  municipality_name: z.string(),

  district_slug: z.string(),
  district_name: z.string(),
});

export const eventArraySchema = z.array(eventSchema);

export type Event = z.infer<typeof eventSchema>;

export function parseEvent(data: unknown): Event {
  return eventSchema.parse(data);
}

export function parseEventArray(data: unknown): Array<Event> {
  return eventArraySchema.parse(data);
}
