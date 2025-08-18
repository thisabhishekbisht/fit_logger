import { useEffect, useState } from 'react';

export type DistanceUnit = 'km' | 'mi';

export interface SettingsState {
  weightKg: number;
  distanceUnit: DistanceUnit;
  weeklyGoalMinutes: number;
  countryCode: string; // ISO-2 e.g., US, IN
}

const STORAGE_KEY = 'settings';

const defaultSettings: SettingsState = {
  weightKg: 70,
  distanceUnit: 'km',
  weeklyGoalMinutes: 150,
  countryCode: 'US',
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const updateSettings = (updates: Partial<SettingsState>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const convertKmToDisplay = (km?: number) => {
    if (km == null) return undefined;
    if (settings.distanceUnit === 'km') return km;
    return km * 0.621371; // miles
  };

  const convertDisplayToKm = (value: number) => {
    if (settings.distanceUnit === 'km') return value;
    return value / 0.621371;
  };

  return { settings, updateSettings, convertKmToDisplay, convertDisplayToKm };
};


