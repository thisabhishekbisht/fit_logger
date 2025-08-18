
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Fitness Tracker';
  }, []);
  
  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.heading}
      >
        🏋️ Welcome to FitTrack
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className={styles.subtext}
      >
        Track your daily fitness activities easily!
      </motion.p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className={styles.button}
        onClick={() => navigate('/log')}
      >
        + Add Activity
      </motion.button>
    </div>
  );
};

export default Home;
