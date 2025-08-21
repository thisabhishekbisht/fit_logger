export interface Exercise {
  id: number;
  name: string;
  description?: string;
  muscles: number[];
  equipment: number[];
  imageUrl?: string;
}
