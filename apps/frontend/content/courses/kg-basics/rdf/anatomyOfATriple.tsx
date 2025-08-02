import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';
import TripleIllustration from '@/components/TripleIllustration/TripleIllustration';

import styles from '@/components/BulletList/BulletList.module.scss';


export default function AnatomyOfATripleSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"/images/courses/kg-basics/RDF/tripleAnatomy.png"} alt="Triple structure" />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Understanding RDF Triples</h2>
          <p>
            In <Definition term="RDF (Resource Description Framework)" text="RDF" />, information is broken down into simple building blocks called <Definition term="Triple" text="triples" />. A <Definition term="Triple" text="triple" /> is like a small sentence that captures one fact, using a standard format:

            <div style={{ fontWeight: 'bold', margin: '10px 0px' }}>
              <TripleIllustration
                subject="Subject"
                predicate="Predicate"
                object="Object"
              />

            </div>


          </p>
          <p>
            <BulletList>
              <li className={styles.default}><strong>Subject</strong>: the thing being described (e.g. <code>:Factory B23</code>)</li>
              <li className={styles.orange}><strong>Predicate</strong>: the property or relationship (e.g. <code>:hasMachine</code>)</li>
              <li className={styles.default}><strong>Object</strong>: the value or connected resource (e.g. <code>:MachineV200</code>)</li>
            </BulletList>
            Each <Definition term="Triple" text="triple" /> is like a mini sentence that describes a fact.
            Together, these form the basic building block of a graph — connecting concepts into meaningful structures.
          </p>
          <p>
            Example:
            <TripleIllustration
              subject="Truck v780"
              predicate=":hasEngine"
              object="EngineV7204B"
            />
            <span style={{ margin: '5px 0px', display: 'block' }}>This triple simply means: Truck v780 has engine EngineV7204B.</span>
          </p>
        </div>
      </div>
  );
}