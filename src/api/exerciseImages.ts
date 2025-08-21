import { http } from "../lib/http";

export interface ExerciseImage {
  id: number;
  exercise: number;
  image: string;
  is_main: boolean;
}

export async function fetchExerciseImages(exerciseIds: number[]): Promise<Record<number, string>> {
  if (exerciseIds.length === 0) return {};
  // Fetch all images (limit high for demo)
  const { data } = await http.get(`/exerciseimage/?limit=200`);
  const images: Record<number, string> = {};
  (data.results as ExerciseImage[]).forEach(img => {
    if (exerciseIds.includes(img.exercise) && (!images[img.exercise] || img.is_main)) {
      images[img.exercise] = img.image;
    }
  });
  return images;
}
