
import { useQuery } from "@tanstack/react-query";
import { fetchExercises } from "../../../api/exercises";
import type { Exercise } from "../type";


export function useExercises() {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });
}
