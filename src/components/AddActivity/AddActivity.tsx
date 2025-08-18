import React, { useState } from 'react';
import styles from './AddActivity.module.css';

interface ActivityFormData {
  type: string;
  duration: number;
  date: string;
  notes: string;
}

interface Props {
  onAdd: (activity: Omit<ActivityFormData, 'notes'> & { notes?: string }) => void;
  isLoading?: boolean;
}

const AddActivity: React.FC<Props> = ({ onAdd, isLoading = false }) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    type: '',
    duration: 0,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<ActivityFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ActivityFormData> = {};

    if (!formData.type.trim()) {
      newErrors.type = 'Activity type is required';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd({
        type: formData.type.trim(),
        duration: formData.duration,
        date: formData.date,
        notes: formData.notes.trim() || undefined,
      });
      
      // Reset form
      setFormData({
        type: '',
        duration: 0,
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: keyof ActivityFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Add Activity</h2>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Activity Type (e.g., Running, Swimming)"
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className={`${styles.input} ${errors.type ? styles.error : ''}`}
          disabled={isLoading}
        />
        {errors.type && <span className={styles.errorText}>{errors.type}</span>}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={formData.duration || ''}
          onChange={(e) => handleInputChange('duration', Number(e.target.value))}
          className={`${styles.input} ${errors.duration ? styles.error : ''}`}
          min="1"
          disabled={isLoading}
        />
        {errors.duration && <span className={styles.errorText}>{errors.duration}</span>}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className={`${styles.input} ${errors.date ? styles.error : ''}`}
          max={new Date().toISOString().split('T')[0]}
          disabled={isLoading}
        />
        {errors.date && <span className={styles.errorText}>{errors.date}</span>}
      </div>

      <div className={styles.inputGroup}>
        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className={styles.textarea}
          rows={3}
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Log Activity'}
      </button>
    </form>
  );
};

export default AddActivity;
