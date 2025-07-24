import React from 'react';
import styles from './SparqlBlock.module.scss';
import dedent from "dedent";


type SparqlBlockProps = {
  query: string;
  caption?: string;
};

const SparqlBlock: React.FC<SparqlBlockProps> = ({ query, caption }) => {
  return (
    <div className={styles.wrapper}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <pre className={styles.codeBlock}>
        <code>{query}</code>
      </pre>
    </div>
  );
};

export default SparqlBlock;