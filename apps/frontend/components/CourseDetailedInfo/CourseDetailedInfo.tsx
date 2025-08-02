import React from 'react';
import styles from './CourseDetailedInfo.module.scss';
import Button from '../Button/Button.tsx';

type CourseDetailedInfoProps = {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  difficulty?: string;
  percentageCompleted?: number;
  onStart?: () => void;
};

const CourseDetailedInfo: React.FC<CourseDetailedInfoProps> = ({
  title,
  description,
  imageUrl,
  category,
  difficulty,
  percentageCompleted,
  slidesTitles,
  onStart
}) => {
  return (
    <div className={styles.previewContainer}>
      <div
        className={styles.previewImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles.previewContent}>
        <h2 className={styles.title}>{title}</h2>
        {category && <div className={styles.meta}>Category: {category}</div>}
        {difficulty && <div className={styles.meta}>Difficulty: {difficulty}</div>}
        {typeof percentageCompleted === 'number' && (
          <div className={styles.meta}>
            Progress: {percentageCompleted}%
          </div>
        )}
        <h5 className={styles.sectionHeader}>Description:</h5>
        <p className={styles.description}>{description}</p>
        <h5 className={styles.sectionHeader}>Categories:</h5>
        <div className={styles.categoryList}>
          {slidesTitles.map((category, index) => (
            <span key={index} className={styles.categoryItem}>
              {category.category}
            </span>
          ))}
        </div>

        {onStart && (
          <div className={styles.buttonWrapper}>
            <Button text="Go to course" onClick={onStart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailedInfo;
