import { supabase } from "../supabase";

import { parseFestivalArray, type Festival } from "../schemas/festival.schema";


export async function getAll(): Promise<Festival[]> {
  const { data, error } = await supabase
    .from("festival_view")
    .select("*");

  if (error) throw error;
  return parseFestivalArray(data);
}


export async function getAllByMunicipalityId(municipalityId: string): Promise<Festival[]> {
  const { data, error } = await supabase
    .from("festival_view")
    .select("*")
    .eq("municipality_id", municipalityId);

  if (error) throw error;
  return parseFestivalArray(data);
}
