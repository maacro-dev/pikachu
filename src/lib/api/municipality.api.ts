
import { supabase } from "../supabase";

import { parseMunicipality, parseMunicipalityArray, type Municipality, } from "../schemas/municipality.schema";


export async function getAll(): Promise<Municipality[]> {
  const { data, error } = await supabase
    .from("municipality_view")
    .select("*");

  if (error) throw error;
  return parseMunicipalityArray(data);
}

export async function getAllByDistrictId(districtId: string): Promise<Municipality[]> {
  const { data, error } = await supabase
    .from("municipality_view")
    .select("*")
    .eq("district_id", districtId);

  if (error) throw error;
  return parseMunicipalityArray(data);
}

export async function getBySlug(slug: string): Promise<Municipality> {
  const { data, error } = await supabase
    .from("municipality_view")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return parseMunicipality(data);
}

export async function getSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("municipality_view")
    .select("slug");

  if (error) throw error;

  return (data ?? [])
    .map((m) => m.slug)
    .filter(Boolean) as string[];
}
