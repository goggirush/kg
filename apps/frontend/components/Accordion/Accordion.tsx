import React, { useState } from 'react';
import styles from './Accordion.module.scss';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
