// components/CategoryProgressBar.tsx
import React from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  currentIndex: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ currentIndex, total }) => {
  const percentage = Math.round((currentIndex / total) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={styles.filled}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={styles.label}>
        Slide <strong>{currentIndex}</strong> of <strong>{total}</strong>
      </div>
    </div>
  );
};

export default ProgressBar;