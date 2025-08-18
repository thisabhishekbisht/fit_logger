import React, { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import AddActivity from '../../components/AddActivity/AddActivity';
import styles from './ActivityLogger.module.css';
import { fetchAirQuality, fetchHolidays, fetchWeather } from '../../utils/api';
import { useSettings } from '../../hooks/useSettings';
import { estimateCaloriesKcal } from '../../utils/calories';

const ActivityLogger: React.FC = () => {
  useEffect(() => {
    document.title = 'Log Activity';
  }, []);

  const { activities, isLoading, error, addActivity, deleteActivity, clearError, lastDeleted, undoDelete, exportJson, importJson } = useLocalStorage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'duration'>('date');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const filtered = useMemo(() => {
    let list = activities.slice();
    if (typeFilter !== 'all') list = list.filter(a => a.type.toLowerCase() === typeFilter);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(a =>
        a.type.toLowerCase().includes(q) ||
        (a.notes?.toLowerCase().includes(q) ?? false) ||
        (a.tags?.some(t => t.toLowerCase().includes(q)) ?? false)
      );
    }
    if (from) list = list.filter(a => a.date >= from);
    if (to) list = list.filter(a => a.date <= to);
    list.sort((a, b) => sortBy === 'date' ? b.date.localeCompare(a.date) : b.duration - a.duration);
    return list;
  }, [activities, typeFilter, query, sortBy, from, to]);

  const weeklyData = useMemo(() => {
    const map = new Map<string, number>();
    activities.forEach(a => {
      const d = new Date(a.date);
      const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      map.set(key, (map.get(key) || 0) + a.duration);
    });
    return Array.from(map.entries()).map(([date, minutes]) => ({ date, minutes }));
  }, [activities]);

  const [goal, setGoal] = useState<number>(150); // minutes/week
  const { settings } = useSettings();

  const [todayHoliday, setTodayHoliday] = useState<string | null>(null);
  // Preload today holiday name (if any)
  useEffect(() => {
    const todayISO = new Date().toISOString().split('T')[0];
    const y = new Date().getFullYear();
    fetchHolidays(settings.countryCode, y)
      .then(list => {
        const hit = list.find(h => h.date === todayISO);
        setTodayHoliday(hit ? hit.name : null);
      })
      .catch(() => setTodayHoliday(null));
  }, [settings.countryCode]);

  // Helper: promisified geolocation
  const getPosition = () => new Promise<GeolocationPosition>((resolve, reject) => {
    if (!('geolocation' in navigator)) return reject(new Error('geo_unavailable'));
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
  });

  const handleAddWithEnrichment = async (data: any) => {
    // Compute calories
    const calories = estimateCaloriesKcal(
      data.type,
      Number(data.duration) || 0,
      settings.weightKg,
      typeof data.distanceKm === 'number' ? data.distanceKm : undefined
    );

    let location: { lat: number; lon: number } | undefined;
    let weather: { tempC: number; code: number } | undefined;
    let airQualityPm25: number | undefined;
    try {
      const pos = await getPosition();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      location = { lat, lon };
      try {
        const w = await fetchWeather(lat, lon, data.date);
        weather = w;
      } catch {}
      try {
        const aq = await fetchAirQuality(lat, lon);
        if (!Number.isNaN(aq.pm25)) airQualityPm25 = aq.pm25;
      } catch {}
    } catch {
      // geolocation denied or failed; proceed without
    }

    addActivity({ ...data, calories, location, weather, airQualityPm25 });
  };

  return (
    <div className={styles.container}>
      {/* Error Display */}
      {error && (
        <div className={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={clearError} className={styles.errorClose}>
            ×
          </button>
        </div>
      )}

      {/* Form */}
      <div className={styles.formContainer}>
        <AddActivity onAdd={handleAddWithEnrichment} isLoading={isLoading} />
      </div>

      {/* Quick actions */}
      <div className={styles.listContainer} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <button className={styles.toolbarButton} title="Undo last delete" onClick={() => undoDelete()} disabled={!lastDeleted}>↩ Undo</button>
          <button className={styles.toolbarButton} title="Export JSON" onClick={() => {
            const data = exportJson();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'activities.json'; a.click();
            URL.revokeObjectURL(url);
          }}>⬇ Export</button>
          <label className={styles.toolbarButton} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            ⬆ Import
            <input className={styles.fileInput} type="file" accept="application/json" onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              f.text().then(txt => importJson(txt));
            }} />
          </label>
          <div style={{ color: '#fff', display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
            Weekly goal (mins):
            <input className={styles.input} type="number" min={0} value={goal} onChange={e => setGoal(Number(e.target.value) || 0)} style={{ maxWidth: 120 }} />
            <span style={{ fontWeight: 700 }}>{Math.min(100, Math.round((activities.reduce((s,a)=>s+a.duration,0)/goal)*100 || 0))}%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.listContainer} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <input className={styles.input} placeholder="Search type, notes, tags" value={query} onChange={e => setQuery(e.target.value)} />
          <select className={styles.input} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            {Array.from(new Set(activities.map(a => a.type.toLowerCase()))).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select className={styles.input} value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
            <option value="date">Sort by Date</option>
            <option value="duration">Sort by Duration</option>
          </select>
          <input className={styles.input} type="date" value={from} onChange={e => setFrom(e.target.value)} max={to || undefined} placeholder="From" />
          <input className={styles.input} type="date" value={to} onChange={e => setTo(e.target.value)} min={from || undefined} placeholder="To" />
        </div>
      </div>

      {/* Charts */}
      <div className={styles.listContainer} style={{ marginBottom: '1rem' }}>
        <h2 className={styles.heading}>Weekly Minutes{todayHoliday ? ` • ${todayHoliday}` : ''}</h2>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={weeklyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="date" stroke="#eee" />
              <YAxis stroke="#eee" />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="#e0e7ff" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity List */}
      <div className={styles.listContainer}>
        <h2 className={styles.heading}>Activity History</h2>
        
        {isLoading ? (
          <div className={styles.loadingCard}>
            <p>Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className={styles.emptyCard}>
            <p className={styles.emptyText}>No activities logged yet.</p>
            <p className={styles.emptySubtext}>Start by adding your first activity above!</p>
          </div>
        ) : (
          <div className={styles.activitiesGrid}>
            {filtered.map((activity) => (
              <div key={activity.id} className={styles.activityCard}>
                <div className={styles.activityHeader}>
                  <h3 className={styles.activityType}>{activity.type}</h3>
                  <span className={styles.duration}>{activity.duration} mins</span>
                </div>
                
                {activity.notes && (
                  <p className={styles.notes}>{activity.notes}</p>
                )}

                {activity.tags && activity.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {activity.tags.map(tag => (
                      <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '12px' }}>#{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className={styles.activityFooter}>
                  <span className={styles.date}>{formatDate(activity.date)}</span>
                  {typeof activity.airQualityPm25 === 'number' && (
                    <span className={styles.date} title="PM2.5 μg/m³">AQ: {Math.round(activity.airQualityPm25)}</span>
                  )}
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteActivity(activity.id)}
                    title="Delete activity"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogger;
