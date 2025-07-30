import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    useEffect(() => {
    document.title = 'Fitness Tracker';
  }, []);

  const navigate = useNavigate();


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🏋️ Welcome to FitTrack</h1>
        <p style={styles.subtext}>Track your daily fitness activities easily!</p>
        <button style={styles.button} onClick={() => navigate('/log')}>
          + Add Activity
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
    padding: '1rem',
  },
  card: {
    padding: '3rem 2rem',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#333',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  button: {
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;