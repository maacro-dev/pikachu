import { supabase } from "../supabase";
import { parseDistrict, parseDistrictArray, type District, } from "../schemas/district.schema";


export async function getAll(): Promise<District[]> {
  const { data, error } = await supabase
    .from("district_view")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return parseDistrictArray(data);
}

export async function getAllAdmin(): Promise<District[]> {
  const { data, error } = await supabase
    .from("district_view")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return parseDistrictArray(data);
}


export async function getSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("district_view")
    .select("slug");

  if (error) throw error;

  return (data ?? [])
    .map((d) => d.slug)
    .filter(Boolean) as string[];
}

export async function getBySlug(slug: string): Promise<District> {
  const { data, error } = await supabase
    .from("district_view")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return parseDistrict(data);
}

export async function getFilters(): Promise<Array<{ label: string; value: string }>> {
  const { data, error } = await supabase
    .from("district_view")
    .select("slug, name, display_order")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return (data ?? [])
    .filter((d) => d.slug && d.name)
    .map((d) => ({
      label: d.name as string,
      value: d.slug as string,
    }));
}
