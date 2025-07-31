import React, { useEffect, useState } from 'react';
import styles from './ActivityLogger.module.css'; // ⬅️ Import the CSS Module

interface Activity {
  type: string;
  duration: number;
  date: string;
  notes?: string;
}

const ActivityLogger: React.FC = () => {
      useEffect(() => {
      document.title = 'Log Activity';
    }, []);
const [activities, setActivities] = useState<Activity[]>(() => {
  const saved = localStorage.getItem('activities');
  return saved ? JSON.parse(saved) : [];
});

  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('activities');
    if (saved) {
      setActivities(JSON.parse(saved));
    }
  }, []);

  // ✅ Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = () => {
    if (!type || !duration || !date) return;

    const newActivity: Activity = {
      type,
      duration: Number(duration),
      date,
      notes,
    };

    setActivities([newActivity, ...activities]);

    // Clear form
    setType('');
    setDuration('');
    setDate('');
    setNotes('');
  };

  const handleDelete = (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
  };

  return (
    <div className={styles.container}>
      {/* Form */}
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Add Activity</h2>
        <input
          className={styles.input}
          placeholder="Activity Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Duration (mins)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          max={new Date().toISOString().split("T")[0]} // Restrict to today
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className={{ ...styles.input, height: '60px' }}
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button className={styles.button} onClick={handleAddActivity}>
          Log Activity
        </button>
      </div>

      {/* List */}
      <div className={styles.listContainer}>
        <h2 className={styles.heading}>Activity History</h2>
        {activities.length === 0 ? (
          <div className={styles.emptyCard}>
            <p className={styles.emptyText}>No activities logged yet.</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className={styles.activityCard}>
              <strong>{activity.type}</strong> - {activity.duration} mins
              <br />
              {activity.notes && <em>Notes: {activity.notes}</em>}
              <br />
              <small>{activity.date}</small>
              <br />
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLogger;
