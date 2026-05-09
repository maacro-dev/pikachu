import { supabase } from "../supabase";
import { parseFoodArray, type Food } from "../schemas/food.schema";

export async function getAllByMunicipalityId(
  municipalityId: string
): Promise<Food[]> {
  const { data, error } = await supabase
    .from("food_view")
    .select("*")
    .eq("municipality_id", municipalityId);

  if (error) throw error;
  return parseFoodArray(data);
}

export async function getAll(): Promise<Food[]> {
  const { data, error } = await supabase
    .from("food_view")
    .select("*");

  if (error) throw error;
  return parseFoodArray(data);
}
