// components/FitAssessment/QuestionCard.tsx
import React from 'react';
import styles from './ProperMatch.module.scss';

type Props = {
  number: number;
  question: string;
  selected: number;
  onSelect: (value: number) => void;
};

const QuestionCard: React.FC<Props> = ({
  number,
  question,
  selected,
  onSelect,
}) => (
  <div className={styles.card}>
    <div className={styles.cardRow}>
      <div className={styles.questionCell}>
        <span className={styles.questionNumber}>{number}.</span>
        {question}
      </div>
      <div className={styles.options}>
        {[1, 2, 3, 4, 5, 0].map(value => {
          // true if this is the “Don’t know” bubble AND the model is null
          const isDK = value === 0 && selected === null;
          // true if this is a numeric bubble AND the model matches it
          const isNum = value !== 0 && selected === value;
          const isSelected = isDK || isNum;

          return (
            <label key={value} className={styles.optionLabel}>
              <input
                type="radio"
                name={`q-${number}`}
                value={value}
                checked={isSelected}
                onChange={() => onSelect(value === 0 ? null : value)}
                className={styles.radioInput}
              />
              <span
                className={
                  isSelected
                    ? `${styles.optionCircle} ${styles.selected}`
                    : styles.optionCircle
                }
              />
            </label>
          );
        })}
      </div>
    </div>
  </div>
);

export default QuestionCard;
