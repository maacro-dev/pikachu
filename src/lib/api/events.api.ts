import { supabase } from "../supabase";

import {
  parseEventArray,
  type Event,
} from "../schemas/event.schema";


export async function getAllByMunicipalityId(municipalityId: string): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event_view")
    .select("*")
    .eq("municipality_id", municipalityId);

  if (error) throw error;
  return parseEventArray(data);
}

export async function getAll(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event_view")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return parseEventArray(data);
}

export async function getFeatured(limit = 3): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event_view")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return parseEventArray(data);
}
