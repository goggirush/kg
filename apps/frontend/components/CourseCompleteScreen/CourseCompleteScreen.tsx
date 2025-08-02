import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CourseCompleteScreen.module.scss';
import Button from '../Button/Button.tsx';

type Props = {
  courseTitle: string;
  totalSlides: number;
  categoryCounts: Record<string, number>;
  quizScore?: number;
  onRestart: () => void;
};

const CourseCompleteScreen = ({
  courseTitle,
  totalSlides,
  categoryCounts,
  quizScore,
  onRestart,
}: Props) => {

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>You did it!</h1>
      <p className={styles.subtitle}>
        You’ve completed <strong>{courseTitle}</strong>. Here’s your progress:
      </p>

      <div className={styles.stats}>
        <p>📄 <strong>Total Slides:</strong> {totalSlides}</p>

        {Object.entries(categoryCounts).map(([category, count]) => (
          <p key={category}>📚 {category}: {count} slide{count !== 1 ? 's' : ''}</p>
        ))}

        {quizScore !== undefined && (
          <p>🧠 <strong>Quiz Score:</strong> {quizScore} / 100</p>
        )}
      </div>

      <div className={styles.actions}>
        <Button text="Restart course" onClick={onRestart}/>
      </div>
    </div>
  );
};

export default CourseCompleteScreen;
