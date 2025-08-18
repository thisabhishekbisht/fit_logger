import React, { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AddActivity from '../../components/AddActivity/AddActivity';
import styles from './ActivityLogger.module.css';

const ActivityLogger: React.FC = () => {
  useEffect(() => {
    document.title = 'Log Activity';
  }, []);

  const { activities, isLoading, error, addActivity, deleteActivity, clearError } = useLocalStorage();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
        <AddActivity onAdd={addActivity} isLoading={isLoading} />
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
            {activities.map((activity) => (
              <div key={activity.id} className={styles.activityCard}>
                <div className={styles.activityHeader}>
                  <h3 className={styles.activityType}>{activity.type}</h3>
                  <span className={styles.duration}>{activity.duration} mins</span>
                </div>
                
                {activity.notes && (
                  <p className={styles.notes}>{activity.notes}</p>
                )}
                
                <div className={styles.activityFooter}>
                  <span className={styles.date}>{formatDate(activity.date)}</span>
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
