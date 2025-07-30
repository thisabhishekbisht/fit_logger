import React, { useEffect, useState } from 'react';

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
    <div style={styles.container}>
      {/* Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add Activity</h2>
        <input
          style={styles.input}
          placeholder="Activity Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Duration (mins)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          style={styles.input}
          type="date"
          max={new Date().toISOString().split("T")[0]} // Restrict to today
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          style={{ ...styles.input, height: '60px' }}
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddActivity}>
          Log Activity
        </button>
      </div>

      {/* List */}
      <div style={styles.listContainer}>
        <h2 style={styles.heading}>Activity History</h2>
        {activities.length === 0 ? (
          <div style={styles.emptyCard}>
            <p style={styles.emptyText}>No activities logged yet.</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} style={styles.activityCard}>
              <strong>{activity.type}</strong> - {activity.duration} mins
              <br />
              {activity.notes && <em>Notes: {activity.notes}</em>}
              <br />
              <small>{activity.date}</small>
              <br />
              <button
                style={styles.deleteButton}
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginTop: '0.5rem',
    padding: '0.4rem 0.6rem',
    fontSize: '0.9rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  listContainer: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  emptyCard: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    textAlign: 'center' as const,
  },
  emptyText: {
    fontSize: '1rem',
    color: '#666',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
};
