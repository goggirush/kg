import React, { useState } from 'react';
import styles from './Quiz.module.scss';
import Button from '../Button/Button';
import QuizResult from '../QuizResult/QuizResult';

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type QuizProps = {
  questions: Question[];
  onCompleteQuiz?: (score: number) => void;
};

const Quiz = ({ questions, onCompleteQuiz }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);
  const [showAnswerSummary, setShowAnswerSummary] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowQuestionAnswer(false);
    setShowAnswerSummary(false);
    setIsQuizFinished(false);
    setScore(0);
    setAnswers({});
  };

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setShowQuestionAnswer(true);

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));

    if (option === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const completeQuiz = () => {
    setIsQuizFinished(true);
    if (typeof onCompleteQuiz === 'function') {
      onCompleteQuiz(score);
    }
  };

  const next = () => {
    setSelected(null);
    setShowQuestionAnswer(false);
    if (isLast) {
      completeQuiz();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div>
      {isQuizFinished ? (
        <>
          <QuizResult score={score} maxScore={questions.length} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Button
              text={showAnswerSummary ? 'Hide summary' : 'Show summary'}
              onClick={() => setShowAnswerSummary(!showAnswerSummary)}
            />
            <Button text="Retake quiz" onClick={handleRetake} />
          </div>

          {showAnswerSummary && (
            <div className={styles.summary}>
              <h3>Quiz Summary</h3>
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.answer;

                return (
                  <div
                    key={q.id}
                    className={`${styles.summaryItem} ${isCorrect ? styles.correct : styles.incorrect}`}
                  >
                    <p className={styles.questionText}>❓ {q.question}</p>
                    <p className={styles.correctAnswer}>
                      <strong>You answered:</strong>{' '}
                      <span style={{ color: isCorrect ? 'green' : 'red' }}>
                        {userAnswer || '—'} {isCorrect ? '✅' : '❌'}
                      </span>
                    </p>

                    {!isCorrect && (
                      <p className={styles.correctAnswer}>
                        💡 Correct Answer: <strong>{q.answer}</strong>
                      </p>
                    )}
                  </div>
                );
              })}

              <div className={styles.retryContainer}>
                <Button text="Retake Quiz" onClick={handleRetake} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <h5>{current.question}</h5>

          <div className={styles.options}>
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={showQuestionAnswer}
                className={`${styles.optionButton}
                  ${selected === option ? styles.selected : ''}
                  ${showQuestionAnswer && option === current.answer ? styles.correct : ''}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div>
            <Button
              onClick={next}
              text={isLast ? 'Finish Quiz' : 'Next question'}
              disabled={!showQuestionAnswer}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
