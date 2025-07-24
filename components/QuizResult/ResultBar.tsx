// components/QuizResult.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './QuizResult.module.scss';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ResultBar = ({ score, maxScore }) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className={styles.scoreContainer}>
      <Chart
        options={{
          chart: {
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              },
              dataLabels: {
                name: {},
                value: {
                  show: true,
                  color: '#333',
                  fontSize: '22px',
                },
              },
            },
          },
          labels: ['Score'],
        }}
        series={[percentage]}
        type="radialBar"
        width="500"
        height="280"
      />
      <p className={styles.scoreText}>
        You scored <strong>{score}</strong> out of <strong>{maxScore}</strong>
      </p>
    </div>
  );
};

export default ResultBar;
