import React from 'react';
import styles from './Card.module.scss';
import Button from '../Button/Button.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CoursePreviewCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkTo: string;
};

const fetchStatusText = (percentage) => {
  if (percentage === 0) {
    return 'Start'
  }
  else if (percentage === 100) {
    return 'Retake'
  }
  else {
    return 'Continue'
  }
}

const CoursePreviewCard: React.FC<CoursePreviewCardProps> = ({ onClick, title, description, imageUrl, difficulty, category, percentageCompleted, onReadMore }) => {
  return (
    <>
      <div className={styles.coursePreviewCard}>
        <div className={styles.imageWrapper}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
            {percentageCompleted === 100 &&
          <div className={styles.icon}>
              <FontAwesomeIcon color="#26B67F" icon="check" />
            </div>
            }
        </div>
        <div className={styles.coursePreviewContent}>
          <div >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5 className={styles.courseCategory}>{category}</h5>
              <h5 className={styles.courseCategory}>{difficulty}</h5>
            </div>
            <h4>{title}</h4>
            <p className={styles.courseDescription}>{description}</p>
          </div>
        </div>
        <div className={styles.courseFooter} style={{
            '--progress': `${percentageCompleted}%`,
            '--progressColor': percentageCompleted === 100 ? '#4cbd6d' : '#3f92b3'
            } as React.CSSProperties}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
            {(percentageCompleted > 5 && percentageCompleted < 90) && (
              <div className={styles.progressText}>
                {percentageCompleted}%
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4d4d4d' }}>
            <Button text={'Read more'} variant="softSecondary" onClick={onReadMore} />
            <Button variant="soft" text={fetchStatusText(percentageCompleted)} onClick={() => onClick()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreviewCard;
