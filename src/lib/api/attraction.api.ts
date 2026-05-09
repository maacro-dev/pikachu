
import { supabase } from "../supabase";

import { parseAttractionArray, type Attraction, } from "../schemas/attraction.schema";

export async function getAllByMunicipalityId(
  municipalityId: string
): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from("attraction_view")
    .select("*")
    .eq("municipality_id", municipalityId);

  if (error) throw error;
  return parseAttractionArray(data);
}

export async function getAll(): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from("attraction_view")
    .select("*");

  if (error) throw error;
  return parseAttractionArray(data);
}

export async function getFeatured(limit = 3): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from("attraction_view")
    .select("*")
    .eq("featured", true)
    .limit(limit);

  if (error) throw error;
  return parseAttractionArray(data);
}
