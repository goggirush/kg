import React from 'react';
import styles from './Features.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '../Card/Card.tsx';

const Features = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className={styles.waveTopSection}>
            <div className={styles.waveTopSection__wave}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    {/* Wave fill (same as Hero) */}
                    <path
                        d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,186.7C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,0L0,0Z"
                        fill="#ffffffff"
                    />

                    {/* Border line (same as Hero) */}
                    <path
                        d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,186.7C672,160,768,96,864,90.7C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96"
                        fill="none"
                        stroke="#cccccc"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <div className={styles.waveTopSection__content}>
                <h2 style={{textAlign: 'center', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '10px'}}>Other features</h2>
                <div style={{ display: 'flex', gap: "2rem", justifyContent: 'center' }}>
                    <Card
                        title="Would a Knowledge Graph Help You?"
                        description="Answer our form of questions to see if, and how you can benefit from using a knowledge graph for your project."
                        icon={
                            <FontAwesomeIcon icon="suitcase-medical" />

                        }
                        linkText="Answer our form"
                        linkTo="/proper-match"
                    />
                    <Card
                        title="Placeholder"
                        description="Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore "
                        icon={
                            <FontAwesomeIcon icon="road" />
                        } linkText="Placeholder"
                        linkTo="/"
                    />
                    <Card
                        title="Placeholder"
                        description="Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore Lorem Ipsum lo ipsum lore "
                        icon={
                            <FontAwesomeIcon icon="code" />
                        } linkText="Placeholder"
                        linkTo="/"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
