// components/CategoryProgressBar.tsx
import React from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  currentIndex: number;
  total: number;
}

const CourseProgressBar: React.FC<Props> = ({ percentage}) => {

  return (
    <div className={styles.courseWrapper}>
      <div className={styles.courseTrack}>
        <div
          className={styles.filled}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CourseProgressBar;