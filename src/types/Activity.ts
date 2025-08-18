export interface Activity {
  id: string;
  type: string;
  duration: number;
  date: string;
  notes?: string;
  createdAt: string;
  // Optional enhancements
  tags?: string[];
  distanceKm?: number; // for running/cycling
  calories?: number;   // computed from METs & weight
  location?: { lat: number; lon: number };
  weather?: { tempC: number; code: number };
  airQualityPm25?: number; // µg/m3
}
