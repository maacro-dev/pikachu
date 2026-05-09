import * as z from "astro/zod"

const slugSchema = z.object({
  slug: z.string(),
});
const slugArraySchema = z.array(slugSchema)

export type Slug = z.infer<typeof slugSchema>

export function parseSlugs(v: unknown): Slug[] {
  return slugArraySchema.parse(v);
}
