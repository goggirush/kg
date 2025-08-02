import styles from './Quiz.module.scss';

const QuizSlideLayout = ({ children }) => {
  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <span className={styles.quizIcon}>🧠</span>
        <h2 className={styles.quizTitle}>Knowledge Check</h2>
        <p className={styles.subtitle}>Let’s see what you’ve learned so far!</p>
      </div>
      <div className={styles.quizContent}>
        {children}
      </div>
    </div>
  );
}

export default QuizSlideLayout;