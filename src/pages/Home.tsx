import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.heading}
      >
        🏋️ Welcome to FitTrack
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={styles.subtext}
      >
        Track your daily fitness activities easily!
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={styles.button}
      >
        + Add Activity
      </motion.button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f7f7f7',
    padding: '1rem',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  button: {
    fontSize: '1rem',
    padding: '0.8rem 1.4rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
  },
};

export default Home;
