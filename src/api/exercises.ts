


import { http } from "../lib/http";
import type { Exercise } from "../features/exercises/type";

export async function fetchExercises(): Promise<Exercise[]> {
  const { data } = await http.get("/exercise/?language=2&limit=20");
  return (data as { results: any[] }).results.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    muscles: item.muscles ?? [],
    equipment: item.equipment ?? [],
  })) as Exercise[];
}