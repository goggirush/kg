import React from 'react';
import styles from './BackendMode.module.scss';
import { useBackendMode } from '@/state/useBackendMode';
import stardog from '@/public/images/icons/stardog.png';
import Button from '../Button/Button.tsx';
import Image from 'next/image';

const BackendMode: React.FC = () => {
const isConnected = useBackendMode((s) => s.isConnected);
const setIsConnected = useBackendMode((s) => s.setIsConnected);
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>
                <Image src={stardog} className={!isConnected && styles.logoLocal} alt="SPARQL Playground" height={32} />

                </div>
                <span
                    className={`${styles.status} ${isConnected ? styles.connected : styles.disconnected
                        }`}
                >
                    {isConnected ? '- Connected to Stardog ' : '- Local Mode'}
                </span>
            </div>
        </div>
    );
};

export default BackendMode;
