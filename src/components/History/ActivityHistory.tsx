import React from 'react';
import styles from './ActivityHistory.module.css';


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
    <div className={styles.listContainer}>
      <h2 className={styles.heading}>Today's Activities</h2>

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