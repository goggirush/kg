import React from 'react';
import styles from './ToolSection.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import kgIcon from '@/public/images/icons/kgIcon.png';
import sparqlIcon from '@/public/images/icons/sparqlIcon.png';

const ToolSection = () => {
  const router = useRouter();

  return (
    <section className={styles.toolSection}>
      {/* Top wave */}
      <div className={styles.toolSection__waveTop}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,186.7C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,0L0,0Z"
            fill="#fff"
          />
        </svg>
      </div>

      <h2 className={styles.toolSection__title}>Explore Our Tools</h2>
      <p style={{ color: 'white', marginBottom: '25px', marginTop: '0' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta aperiam sapiente enim accusamus aspernatur rem id.
      </p>

      <div className={styles.toolSection__cards}>
        <div className={styles.toolCard}>
          <div>
            <Image src={kgIcon} alt="KG Builder" height={128} style={{ padding: '1rem' }} />
          </div>
          <h3 className={styles.toolCard__title}>Knowledge Graph Builder</h3>
          <p className={styles.toolCard__text}>
            Visually create and connect your own classes, individuals, and properties.
          </p>
          <Button text="Open Builder" variant="soft" onClick={() => router.push('/sparql-playground')} />
        </div>

        <div className={styles.toolCard}>
          <div>
            <Image src={sparqlIcon} alt="SPARQL Playground" height={128} style={{ padding: '1rem' }} />
          </div>
          <h3 className={styles.toolCard__title}>SPARQL Playground</h3>
          <p className={styles.toolCard__text}>
            Query your data, test triples, and learn SPARQL interactively.
          </p>
          <Button text="Start Querying" variant="soft" onClick={() => router.push('/kg-playground')} />
        </div>
      </div>

      {/* Bottom wave */}
      <div className={styles.toolSection__waveBottom}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,186.7C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"
            fill="#fff"
          />
        </svg>
      </div>
    </section>
  );
};

export default ToolSection;
