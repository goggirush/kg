import React from 'react';
import styles from './Toggle.module.scss';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return (
    <label className={styles.toggleWrapper}>
      <span>{label}</span>
      <div className={styles.toggle}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.slider} />
      </div>
    </label>
  );
};

export default Toggle;
