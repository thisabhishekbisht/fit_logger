export function estimateMetFromType(type: string, distanceKm?: number, durationMin?: number): number {
  const t = type.toLowerCase();
  let speedKmh: number | undefined;
  if (distanceKm != null && durationMin && durationMin > 0) {
    speedKmh = (distanceKm / durationMin) * 60;
  }

  if (t.includes('run')) {
    // Running MET by speed
    const v = speedKmh ?? 8; // default ~8 km/h
    if (v < 8) return 7.0;
    if (v < 9.7) return 8.3;
    if (v < 11.3) return 9.8;
    if (v < 12.9) return 11.0;
    return 12.5;
  }
  if (t.includes('walk')) return 3.5;
  if (t.includes('cycle') || t.includes('bike')) return 8.0;
  if (t.includes('swim')) return 6.0;
  if (t.includes('yoga')) return 3.0;
  if (t.includes('strength') || t.includes('weights')) return 6.0;
  if (t.includes('hiit')) return 10.0;
  return 5.5; // default moderate
}

export function estimateCaloriesKcal(type: string, durationMin: number, weightKg: number, distanceKm?: number): number {
  const met = estimateMetFromType(type, distanceKm, durationMin);
  const hours = Math.max(0, durationMin) / 60;
  const kcal = met * weightKg * hours;
  return Math.round(kcal);
}


