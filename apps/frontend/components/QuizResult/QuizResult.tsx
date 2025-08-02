// components/QuizResult.tsx
import React from 'react';
import styles from './QuizResult.module.scss';
import ResultBar from './ResultBar.tsx';

const QuizResult = ({ score, maxScore }) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className={styles.resultWrapper}>
      <h2 className={styles.title}>Quiz Completed!</h2>
      <ResultBar score={score} maxScore={maxScore}/>

      {percentage === 100 && <p className={styles.perfect}>Perfect score!</p>}
      {percentage >= 50 && percentage < 100 && <p className={styles.good}>Great job!</p>}
      {percentage < 50 && <p className={styles.tryAgain}>Keep learning and try again!</p>}
    </div>
  );
};

export default QuizResult;
