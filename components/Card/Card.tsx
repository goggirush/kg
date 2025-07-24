import React from 'react';
import styles from './Card.module.scss';
import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkTo: string;
};

const Card: React.FC<CardProps> = ({ title, description, icon, linkText, linkTo }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.footer}>
        <Link href={linkTo} passHref>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default Card;
