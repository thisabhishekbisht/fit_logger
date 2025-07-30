import React from 'react';

interface Activity {
  type: string;
  duration: number;
  date: string;
  notes?: string;
}

interface Props {
  activities: Activity[];
  onDelete: (index: number) => void;
}

const ActivityHistory: React.FC<Props> = ({ activities, onDelete }) => {
  return (
    <div style={styles.listContainer}>
      <h2 style={styles.heading}>Today's Activities</h2>

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
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityHistory;

const styles = {
  listContainer: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center' as const,
    color: '#333',
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
  deleteButton: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};
