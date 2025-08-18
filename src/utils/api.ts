// Open-Meteo (no key): https://open-meteo.com/en/docs
export async function fetchWeather(lat: number, lon: number, dateISO: string) {
  // For historical/specific date, Open-Meteo archive needs paid plan; approximate with daily forecast today
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('weather_failed');
  const data = await res.json();
  const tempC = Number(data?.current?.temperature_2m ?? NaN);
  const code = Number(data?.current?.weather_code ?? NaN);
  return { tempC, code };
}

// OpenAQ (no key): https://docs.openaq.org/
export async function fetchAirQuality(lat: number, lon: number) {
  const url = `https://api.openaq.org/v2/measurements?parameter=pm25&coordinates=${lat},${lon}&radius=10000&limit=1&sort=desc`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('aq_failed');
  const data = await res.json();
  const pm25 = Number(data?.results?.[0]?.value ?? NaN);
  return { pm25 };
}

// Nager.Date (no key): https://date.nager.at/swagger
export async function fetchHolidays(countryCode: string, year: number) {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('holidays_failed');
  const data: Array<{ date: string; localName: string; name: string }>= await res.json();
  return data.map(h => ({ date: h.date, name: h.localName || h.name }));
}


