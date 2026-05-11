import { supabase } from "../supabase";
import { uploadMedia, deleteMedia, extractStoragePath } from "../storage";

function toJsonOrNull(obj: object | null): string | null {
  if (!obj) return null;
  if ("url" in obj && !obj.url) return null;
  return JSON.stringify(obj);
}

interface MediaPayload {
  url: string;
  alt?: string;
  caption?: string;
  file?: File;
}

interface GalleryPayload extends MediaPayload {
  order?: number;
}

export type GenericContentType = "attractions" | "foods" | "festivals" | "events";

const DB_TABLE: Record<GenericContentType | "district" | "municipality", string> = {
  district: "district",
  municipality: "municipality",
  attractions: "attraction",
  foods: "food",
  festivals: "festival",
  events: "event",
};

type ViewTables = "district_view" | "municipality_view" | "attraction_view" | "food_view" | "festival_view" | "event_view"
type ViewTableIds = "district_id" | "municipality_id" | "attraction_id" | "food_id" | "festival_id" | "event_id"

const VIEW_TABLE: Record<GenericContentType | "district" | "municipality", ViewTables> = {
  district: "district_view",
  municipality: "municipality_view",
  attractions: "attraction_view",
  foods: "food_view",
  festivals: "festival_view",
  events: "event_view",
};

const ENTITY_ID_COL: Record<GenericContentType | "district" | "municipality", ViewTableIds> = {
  district: "district_id",
  municipality: "municipality_id",
  attractions: "attraction_id",
  foods: "food_id",
  festivals: "festival_id",
  events: "event_id",
};

// ── Shared helpers ─────────────────────────────────────────────────────────────

async function resolveMediaUrl(
  media: MediaPayload,
  folder: string
): Promise<{ url: string; alt?: string; caption?: string }> {
  if (media.file) {
    const { url } = await uploadMedia(media.file, folder);
    return { url, alt: media.alt, caption: media.caption };
  }
  return { url: media.url, alt: media.alt, caption: media.caption };
}

async function resolveMedia(
  main: MediaPayload | null,
  gallery: GalleryPayload[],
  folder: string
) {
  const resolvedMain =
    main && (main.url || main.file)
      ? await resolveMediaUrl(main, folder)
      : null;

  const validGallery = (gallery ?? []).filter(
    (img) => img && (img.file || (typeof img.url === "string" && img.url.trim() !== ""))
  );

  const resolvedGallery = await Promise.all(
    validGallery.map((img, i) =>
      resolveMediaUrl(img, folder).then((r) => ({
        ...r,
        order: img.order ?? i + 1,
      }))
    )
  );

  return {
    resolvedMain,
    resolvedGallery: resolvedGallery.filter((g) => g.url),
  };
}

async function cleanupStorageForEntity(
  viewTable: ViewTables,
  idCol: string,
  entityId: string
) {
  const { data } = await supabase
    .from(viewTable)
    .select("hero_image, gallery")
    .eq(idCol, entityId)
    .single();

  if (!data) return;

  const paths = [
    data.hero_image ? extractStoragePath(data.hero_image) : null,
    ...((data.gallery as any[]) ?? []).map((g: any) => extractStoragePath(g.url)),
  ].filter(Boolean) as string[];

  if (paths.length) {
    await Promise.allSettled(paths.map((p) => deleteMedia(p)));
  }
}

// ── District ───────────────────────────────────────────────────────────────────

interface DistrictPayload {
  name: string;
  slug: string;
  short_description: string;
  body: string;
  tags: string[];
  tagline: string;
  getting_there_steps: string[];
  display_order: number;
  quick_facts: { icon: string; label: string; value: string }[];
  status: "draft" | "published";
  main_image: MediaPayload | null;
  gallery_images: GalleryPayload[];
}

export async function createDistrict(payload: DistrictPayload) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    "districts"
  );

  const { data, error } = await supabase.rpc("create_district", {
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_tagline: payload.tagline,
    p_getting_there_steps: payload.getting_there_steps,
    p_display_order: payload.display_order,
    p_quick_facts: payload.quick_facts,
    p_status: payload.status,
    p_main_image: resolvedMain ? resolvedMain : null,
    p_gallery_images: resolvedGallery,
  });

  if (error) throw error;
  return data;
}

export async function updateDistrict(
  contentId: string,
  districtId: string,
  payload: DistrictPayload
) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    "districts"
  );

  const { error } = await supabase.rpc("update_district", {
    p_content_id: contentId,
    p_district_id: districtId,
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_tagline: payload.tagline,
    p_getting_there_steps: payload.getting_there_steps,
    p_display_order: payload.display_order,
    p_quick_facts: payload.quick_facts,
    p_status: payload.status,
    p_main_image: resolvedMain,
    p_gallery_images: resolvedGallery.filter((g) => g.url)
  });

  if (error) throw error;
}

export async function deleteDistrict(districtId: string) {
  await cleanupStorageForEntity("district_view", "district_id", districtId);

  const { error } = await supabase
    .from("district")
    .delete()
    .eq("id", districtId);

  if (error) throw error;
}

// ── Municipality ───────────────────────────────────────────────────────────────

interface MunicipalityPayload {
  district_id: string;
  name: string;
  slug: string;
  short_description: string;
  body: string;
  tags: string[];
  status: "draft" | "published";
  main_image: MediaPayload | null;
  gallery_images: GalleryPayload[];
}

export async function createMunicipality(payload: MunicipalityPayload) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    "municipalities"
  );

  const { data, error } = await supabase.rpc("create_municipality", {
    p_district_id: payload.district_id,
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_status: payload.status,
    p_main_image: resolvedMain ?? null,
    p_gallery_images: resolvedGallery,
  });

  if (error) throw error;
  return data;
}

export async function updateMunicipality(
  contentId: string,
  municipalityId: string,
  payload: MunicipalityPayload
) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    "municipalities"
  );

  const { error } = await supabase.rpc("update_municipality", {
    p_content_id: contentId,
    p_district_id: payload.district_id,
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_status: payload.status,
    p_main_image: resolvedMain ?? null,
    p_gallery_images: resolvedGallery.filter((g) => g.url),
  });

  if (error) throw error;
}

export async function deleteMunicipality(municipalityId: string) {
  await cleanupStorageForEntity("municipality_view", "municipality_id", municipalityId);

  const { error } = await supabase
    .from("municipality")
    .delete()
    .eq("id", municipalityId);

  if (error) throw error;
}


interface BaseContentPayload {
  municipality_id: string;
  name: string;
  slug: string;
  short_description: string;
  body: string;
  tags: string[];
  status: "draft" | "published";
  main_image: MediaPayload | null;
  gallery_images: GalleryPayload[];
  food_type?: string;
  date?: string;
  end_date?: string;
  venue?: string;
}

function buildTypeExtras(type: GenericContentType, payload: BaseContentPayload) {
  const extras: Record<string, any> = {};
  if (type === "foods") extras.p_food_type = payload.food_type;
  if (type === "festivals" || type === "events") extras.p_date = payload.date ?? null;
  if (type === "events") {
    extras.p_end_date = payload.end_date || null;
    extras.p_venue = payload.venue || null;
  }
  return extras;
}

export async function createContent(type: GenericContentType, payload: BaseContentPayload) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    type
  );

  // @ts-ignore
  const { data, error } = await supabase.rpc(`create_${DB_TABLE[type]}`, {
    p_municipality_id: payload.municipality_id,
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_status: payload.status,
    p_main_image: resolvedMain ?? null,
    p_gallery_images: resolvedGallery,
    ...buildTypeExtras(type, payload),
  });

  if (error) throw error;
  return data;
}

export async function updateContent(
  type: GenericContentType,
  contentId: string,
  entityId: string,
  payload: BaseContentPayload
) {
  const { resolvedMain, resolvedGallery } = await resolveMedia(
    payload.main_image,
    payload.gallery_images,
    type
  );

  // @ts-ignore
  const { error } = await supabase.rpc(`update_${DB_TABLE[type]}`, {
    p_content_id: contentId,
    p_municipality_id: payload.municipality_id,
    p_name: payload.name,
    p_slug: payload.slug,
    p_short_description: payload.short_description,
    p_body: payload.body,
    p_tags: payload.tags,
    p_status: payload.status,
    p_main_image: resolvedMain ?? null,
    p_gallery_images: resolvedGallery,
    ...buildTypeExtras(type, payload),
  });

  if (error) throw error;
}

export async function deleteContent(type: GenericContentType, entityId: string) {
  await cleanupStorageForEntity(
    VIEW_TABLE[type],
    ENTITY_ID_COL[type],
    entityId
  );

  const { error } = await supabase
    // @ts-ignore
    .from(DB_TABLE[type])
    .delete()
    // @ts-ignore
    .eq("id", entityId);

  if (error) throw error;
}
