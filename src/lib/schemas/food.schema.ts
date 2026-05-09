import * as z from "astro/zod";
import { baseContentSchema } from "./shared.schema";

export const foodSchema = baseContentSchema.extend({
  food_id: z.uuid(),
  content_id: z.uuid(),
  municipality_id: z.uuid(),
  district_id: z.uuid(),

  food_type: z.enum(["local", "street", "restaurant", "seafood", "dessert"]),

  municipality_slug: z.string(),
  municipality_name: z.string(),

  district_slug: z.string(),
  district_name: z.string(),
});

export const foodArraySchema = z.array(foodSchema);

export type Food = z.infer<typeof foodSchema>;

export function parseFood(data: unknown): Food {
  return foodSchema.parse(data);
}

export function parseFoodArray(data: unknown): Array<Food> {
  return foodArraySchema.parse(data);
}
