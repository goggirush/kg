import React, { ReactNode } from 'react';
import styles from './BulletList.module.scss';

type BulletListProps = {
  children: ReactNode;
};

const BulletList: React.FC<BulletListProps> = ({ children }) => {
  return (
    <ul className={styles.bulletList}>
      {children}
    </ul>
  );
};

export default BulletList;