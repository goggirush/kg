import React from 'react';
import styles from './URI.module.scss';

type URIProps = {
  value: string;
};

const URI: React.FC<URIProps> = ({ value }) => {
  const [prefix, local] = value.includes(':') ? value.split(':') : ['', value];

  return (
    <span className={styles.uri}>
      <span className={styles.prefix}>{prefix}:</span>
      <span className={styles.local}>{local}</span>
    </span>
  );
};

export default URI;
