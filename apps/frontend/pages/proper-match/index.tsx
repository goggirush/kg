import React, { useState } from 'react';
import QuestionCard from '../../components/ProperMatchPage/QuestionCard.tsx';
import Button from '../../components/Button/Button.tsx';
import ResultCard from '../../components/ProperMatchPage/ResultCard.tsx';
import styles from '../../components/ProperMatchPage/ProperMatch.module.scss';

const questions = [
  { id: 1, text: "Do users use varied terms, synonyms, or abbreviations for the same concept?" },
  { id: 2, text: "Is it important for the system to understand or distinguish between different meanings of the same word?" },
  { id: 3, text: "Does the system need to support multiple languages or regional terminologies?" },
  { id: 4, text: "Is your domain inherently hierarchical or networked (e.g., nested categories, dependencies)?" },
  { id: 5, text: "Do users struggle to find content unless they know exact keywords?" },
  { id: 6, text: "Do you want to support semantic search (search by meaning, not just words)?" },
  { id: 7, text: "Is explainability of results important for trust or compliance?" },
  { id: 8, text: "Would users benefit from seeing or filtering by related concepts (e.g., broader, narrower, similar)?" },
  { id: 9, text: "Would it help to connect your data to standard terms or codes used across the company or industry?" },
  { id: 10, text: "Are you working in a knowledge-heavy domain such as eg (supply chain , Vehicle Configuration & Variant Management)?" },
];

const labels = [
  'Almost never',
  'Rarely',
  'Sometimes',
  'Often',
  'Most of the time',
  'Dont know'
];

const ProperMatchPage = () => {
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null | undefined)[]>(
    questions.map(() => undefined)
  );

  const handleSelect = (idx: number, val: number) => {
    setAnswers(a => {
      const copy = [...a];
      copy[idx] = val === 0 ? null : val;
      return copy;
    });
  };

  function computeAverage(answers: (number | null)[]) {
    const valid = answers.filter((v): v is number => v !== null);
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, v) => acc + v, 0);
    return sum / valid.length;
  }

  const averageScore = computeAverage(answers);

  return (
    <div className={styles.wrapper}>
      <h4>Could Your Project Benefit from a Knowledge Graph?</h4>
      {!isSurveyFinished &&
        <>
      <p>
        In the short questionnaire below, you’ll see a series of statements about your domain, your data challenges, and how you find or connect information.
        For each one, please select the response that best reflects how often it applies in your project—from “Almost never” through
        “Most of the time,” or “Don’t know” if you’re unsure.
      </p>
      
          <div className={styles.headerRow}>
            <div className={styles.questionCell} />
            <div className={styles.options}>
              {labels.map(label => (
                <div key={label} className={styles.headerLabel}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.questions}>
            {questions.map((q, i) => (
              <QuestionCard
                key={i}
                number={i + 1}
                question={q.text}
                selected={answers[i]}
                onSelect={val => handleSelect(i, val)}
              />
            ))}
          </div>
          <div className={styles.btnContainer}>
          <Button 
            text="Submit" 
            onClick={() => setIsSurveyFinished(true)} 
            disabled={!answers.every(ans => ans !== undefined)}
            />

          </div>
        </>
      }

      {isSurveyFinished &&
        <>
          <ResultCard score={averageScore} />
          <div className={styles.btnContainer}>
          <Button text="Back to survey" onClick={() => setIsSurveyFinished(false)} />
            </div>
        </>
      }
    </div>
  );
};


export default ProperMatchPage;
