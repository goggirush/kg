import BulletList from '@/components/BulletList/BulletList';
import styles from '@/components/BulletList/BulletList.module.scss';

export default function WhatYoullLearnSlide() {
    return (

      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>

        <div style={{ flex: .4 }}>
            <h2>The challenge</h2>
          <p>
            Right now, information across Scania is spread out:</p>
          <BulletList>
            <li className={styles.green}>Vehicle data lives in one system</li>
            <li className={styles.orange}>Component specifications are stored somewhere else</li>
            <li className={styles.default}>Service history is managed through yet another tool</li>
          </BulletList>
          <p>
            These systems weren’t designed to talk to each other — so it’s hard to get a full picture.
            Engineers, service teams, and digital solutions often rely on manual work, assumptions, or siloed reports.
          </p>
          <p>
            It’s hard to connect the dots. That’s exactly what knowledge graphs are built to solve.
          </p>
          <p>
            By linking data through real-world relationships — like which engine is in which truck, or which services were performed where —
            knowledge graphs help us turn isolated data into a connected, searchable network of information.
          </p>
        </div>
        <div style={{ flex: .5, alignSelf: 'center' }}>
          <img
            src={"/images/courses/kg-basics/introduction/the_challenge.png"}
            alt="Intro graph"
            width="100%"
          />
        </div>
      </div>
    );
}      
