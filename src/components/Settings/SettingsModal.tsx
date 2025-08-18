import React from 'react';
import styles from './SettingsModal.module.css';
import { useSettings } from '../../hooks/useSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Settings">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Settings</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          <label className={styles.row}>
            <span>Weight (kg)</span>
            <input type="number" min={1} value={settings.weightKg}
              onChange={e => updateSettings({ weightKg: Number(e.target.value) || 0 })} />
          </label>

          <label className={styles.row}>
            <span>Distance Unit</span>
            <select value={settings.distanceUnit}
              onChange={e => updateSettings({ distanceUnit: e.target.value as any })}>
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </label>

          <label className={styles.row}>
            <span>Weekly Goal (mins)</span>
            <input type="number" min={0} value={settings.weeklyGoalMinutes}
              onChange={e => updateSettings({ weeklyGoalMinutes: Number(e.target.value) || 0 })} />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;


