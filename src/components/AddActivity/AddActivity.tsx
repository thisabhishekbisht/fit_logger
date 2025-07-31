import React, { useState } from 'react';
import styles from './AddActivity.module.css'; // 💡 import the CSS module

type Activity = {
  name: string;
  duration: number;
  notes: string;
  date: string;
};

interface Props {
  onAdd: (activity: Activity) => void;
}

const AddActivity: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || duration <= 0) return alert("Please enter valid activity and duration");

    onAdd({ name, duration, notes, date });

    setName('');
    setDuration(0);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Activity (e.g., Running)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className={styles.input}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={styles.input}
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>Add Activity</button>
    </form>
  );
};

export default AddActivity;
