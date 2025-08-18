import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden>🏋️</span>
          <span className={styles.title}>FitTrack</span>
        </div>

        <nav className={styles.nav} aria-label="Main">
          <Link className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`} to="/">Home</Link>
          <Link className={`${styles.navLink} ${isActive('/log') ? styles.active : ''}`} to="/log">Log</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.settingsBtn} onClick={onOpenSettings} aria-haspopup="dialog" aria-label="Open settings">⚙️</button>
        </div>
      </div>
    </header>
  );
};

export default Header;


