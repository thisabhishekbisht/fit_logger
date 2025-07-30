import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Activity (e.g., Running)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        style={styles.input}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>Add Activity</button>
    </form>
  );
};
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical' as const,
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
};

export default AddActivity;
