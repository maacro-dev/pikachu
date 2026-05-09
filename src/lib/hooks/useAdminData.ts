import { useEffect, useState } from "react";
import { SupabaseAPI } from "../api/Supabase";

function normalizeContent(item: any, type: string) {
  return {
    id: item.content_id,
    name: item.name,
    slug: item.slug,
    short_description: item.short_description || "",
    body: item.body || "",
    status: item.status || "draft",
    featured: item.featured ?? false,
    type,
    tags: Array.isArray(item.tags) ? item.tags : [],
    main_image: item.hero_image
      ? { url: item.hero_image, alt: item.hero_alt || item.name }
      : null,
    gallery_images: Array.isArray(item.gallery) ? item.gallery : [],
    district_id: String(item.district_id || ""),
    municipality_id: String(item.municipality_id || ""),
    district_name: item.district_name || "",
    municipality_name: item.municipality_name || "",
    tagline: item.tagline || "",
    display_order: item.display_order ?? 0,
    date: item.date || "",
    end_date: item.end_date || "",
    venue: item.venue || "",
    food_type: item.food_type || "",
  };
}

export function useAdminData() {
  const [data, setData] = useState({
    districts: [] as any[],
    municipalities: [] as any[],
    attractions: [] as any[],
    foods: [] as any[],
    festivals: [] as any[],
    events: [] as any[],
    loading: true,
    error: null as any,
  });

  useEffect(() => {
    async function fetchAll() {
      try {
        const [
          districtsRaw,
          municipalitiesRaw,
          attractionsRaw,
          foodsRaw,
          festivalsRaw,
          eventsRaw,
        ] = await Promise.all([
          SupabaseAPI.districts.getAll(),
          SupabaseAPI.municipalities.getAll(),
          SupabaseAPI.attractions.getAll(),
          SupabaseAPI.foods.getAll(),
          SupabaseAPI.festivals.getAll(),
          SupabaseAPI.events.getAll(),
        ]);

        setData({
          districts: districtsRaw.map((d: any) => ({
            id: d.district_id,
            content_id: d.content_id,
            name: d.name,
            slug: d.slug,
            short_description: d.short_description || "",
            body: d.body || "",
            status: d.status || "draft",
            tags: Array.isArray(d.tags) ? d.tags : [],
            tagline: d.tagline || "",
            display_order: d.display_order ?? 1,
            getting_there_steps: Array.isArray(d.getting_there_steps)
              ? d.getting_there_steps
              : [],
            quick_facts: Array.isArray(d.quick_facts)
              ? Object.fromEntries(
                d.quick_facts.map((f: any) => [`${f.icon}:${f.label}`, f.value])
              )
              : {},
            main_image: d.hero_image
              ? { url: d.hero_image, alt: d.hero_alt || d.name }
              : null,
            gallery_images: Array.isArray(d.gallery) ? d.gallery : [],
          })),

          municipalities: municipalitiesRaw.map((m: any) => ({
            id: m.municipality_id,
            content_id: m.content_id,
            name: m.name,
            slug: m.slug,
            short_description: m.short_description || "",
            body: m.body || "",
            status: m.status || "draft",
            tags: Array.isArray(m.tags) ? m.tags : [],
            district_id: String(m.district_id || ""),
            main_image: m.hero_image
              ? { url: m.hero_image, alt: m.name }
              : null,
            gallery_images: Array.isArray(m.gallery) ? m.gallery : [],
          })),

          attractions: attractionsRaw.map((a: any) => normalizeContent(a, "attractions")),
          foods: (foodsRaw ?? []).map((f: any) => normalizeContent(f, "foods")),
          festivals: festivalsRaw.map((f: any) => normalizeContent(f, "festivals")),
          events: eventsRaw.map((e: any) => normalizeContent(e, "events")),
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
        setData((prev) => ({ ...prev, loading: false, error }));
      }
    }

    fetchAll();
  }, []);

  return data;
}
