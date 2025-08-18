import { useState, useEffect } from 'react';
import type { Activity } from '../types/Activity';
import { estimateCaloriesKcal } from '../utils/calories';

const STORAGE_KEY = 'activities';

// Simple UUID generator that works in all browsers
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useLocalStorage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDeleted, setLastDeleted] = useState<Activity | null>(null);

  // Load activities from localStorage
  const loadActivities = (): Activity[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) {
        console.warn('Invalid data format in localStorage, resetting to empty array');
        return [];
      }
      
      return parsed;
    } catch (err) {
      console.error('Error loading activities from localStorage:', err);
      setError('Failed to load activities');
      return [];
    }
  };

  // Save activities to localStorage
  const saveActivities = (newActivities: Activity[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newActivities));
      setError(null);
    } catch (err) {
      console.error('Error saving activities to localStorage:', err);
      setError('Failed to save activities');
    }
  };

  // Initialize activities on mount
  useEffect(() => {
    const loadedActivities = loadActivities();
    setActivities(loadedActivities);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    if (!isLoading) {
      saveActivities(activities);
    }
  }, [activities, isLoading]);

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => {
      const toDelete = prev.find(a => a.id === id) || null;
      setLastDeleted(toDelete);
      return prev.filter(activity => activity.id !== id);
    });
  };

  const undoDelete = () => {
    if (!lastDeleted) return;
    setActivities(prev => [lastDeleted, ...prev]);
    setLastDeleted(null);
  };

  const editActivity = (id: string, updates: Partial<Activity>) => {
    setActivities(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const exportJson = (): string => JSON.stringify(activities, null, 2);

  const importJson = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) {
        setActivities(parsed);
        setError(null);
      } else {
        setError('Invalid import format');
      }
    } catch {
      setError('Invalid JSON');
    }
  };

  const clearError = () => setError(null);

  return {
    activities,
    isLoading,
    error,
    lastDeleted,
    addActivity,
    deleteActivity,
    undoDelete,
    editActivity,
    exportJson,
    importJson,
    clearError,
  };
};
