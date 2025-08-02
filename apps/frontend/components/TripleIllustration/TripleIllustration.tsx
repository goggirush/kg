import React from 'react';
import styles from './TripleIllustration.module.scss';

type TripleIllustrationProps = {
  subject: string;
  predicate: string;
  object: string;
};

const TripleIllustration: React.FC<TripleIllustrationProps> = ({ subject, predicate, object }) => {
  return (
    <div className={styles.tripleContainer}>
      <div className={styles.node}>{subject}</div>
      <div className={styles.arrow}>{'→'}</div>
      <div className={styles.predicate}>{predicate}</div>
      <div className={styles.arrow}>{'→'}</div>
      <div className={styles.node}>{object}</div>
    </div>
  );
};

export default TripleIllustration;
