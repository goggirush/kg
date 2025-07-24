import styles from './Hero.module.scss';
import Button from '../Button/Button.tsx';
import Image from 'next/image';
import heroImg from '@/public/images/hero.png';


const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__header}>The World of Knowledge Graphs</h1>
          <p className={styles.hero__intro}>
            Unlock the potential of connected data. Learn how to model, query, and reason with knowledge graphs — step by step.
          </p>
          <Button variant="ghost" text="Get started" />
        </div>
        <div className={styles.hero__image}>
          <Image src={heroImg} alt="Knowledge graph illustration" />
        </div>
      </div>

      <div className={styles.hero__wave}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          {/* Wave fill */}
          <path
            d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,186.7C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"
            fill="#fff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
