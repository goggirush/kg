import React from 'react';
import styles from './ProperMatch.module.scss';

type Props = {
  score: number;
  message: string;
};

const ResultCard: React.FC<Props> = ({ score, message }) => {

  const getSuitabilityLevel = (score: number) => {
  if (score >= 4.5) return "Excellent fit";
  if (score >= 3.5) return "Strong potential";
  if (score >= 2.5) return "Moderate benefit";
  if (score >= 1.5) return "Limited value";
  return "Unlikely to benefit";
};

const getSuitabilityExplanation = (score: number): string => {
  if (score >= 4.5) {
    return "Your project is an excellent fit for a knowledge graph. You likely deal with complex, interconnected information where relationships, context, or semantics play a key role. A graph-based approach can significantly boost clarity, searchability, and reuse of your data.";
  }
  if (score >= 3.5) {
    return "Your project shows strong potential for benefiting from a knowledge graph. If you’re dealing with evolving data, fuzzy terminology, or complex structures, adding semantics may help unify and surface what matters.";
  }
  if (score >= 2.5) {
    return "There are some promising signs that a knowledge graph could help, particularly in areas like data integration or search. You may want to explore graph-based modeling in a focused area to evaluate the benefit.";
  }
  if (score >= 1.5) {
    return "The fit is modest. While a full knowledge graph may not be essential, some light-weight structuring or terminology alignment could still offer value in specific parts of your project.";
  }
  return "Based on your responses, a knowledge graph may not be the right fit for your current project. However, it's still worth considering if things like search, explainability, or interoperability become more important over time.";
};

  const maxScore = 5;
  const percent = (score / maxScore) * 100;

  return (
<div className={styles.resultCardFull}>
  <div className={styles.resultHeader}>
    <h3>
      <span style={{fontSize: '32px', padding: '2px', display: 'block'}}>{percent.toFixed(1)}%</span> 
    </h3>
    <h4>{getSuitabilityLevel(score)}</h4>
  </div>

  <div className={styles.progressBar}>
    <div className={styles.filled} style={{ width: `${percent}%` }} />
  </div>
  <div className={styles.progressLabels}>
    <span>Minimal Benefit</span>
    <span>Perfect Match</span>
  </div>

  <p className={styles.resultMessage}>{message}</p>

  <div className={styles.recommendationSection}>
    <h5>Summary:</h5>
    <p>{getSuitabilityExplanation(score)}</p>
  </div>
</div>
  );
};

export default ResultCard;