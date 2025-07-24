import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';
import styles from '@/components/BulletList/BulletList.module.scss';

export default function OntologiesIntroSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: .5 }}>
          <h2>Ontologies</h2>
          <p>
            In today’s digital world, we don’t just work with data — we work with meaning. As our systems grow more complex, it’s not enough to know that a piece of data exists. We need to know what it represents, how it connects to other data, and how it should be used.
          </p>
          <p>
            That’s where <Definition term="ontology" text="ontologies" /> come in. An <Definition term="ontology" text="ontology" /> defines a shared understanding of a domain — like vehicles, components, or services — by specifying the types of things that exist and the relationships between them.
          </p>

          <p>
            In other words, an <Definition term="ontology" text="ontology" /> is like a blueprint for structured knowledge. It tells us:
          </p>
          <BulletList>
            <li>What kinds of things we’re dealing with (e.g., Truck, Engine or ServiceEvent)</li>
            <li className={styles.orange}>How those things relate (e.g., a Truck - hasEngine - EngineV20)</li>
            <li className={styles.default}>What kinds of rules or constraints we expect (e.g., a truck should only have one engine)</li>
          </BulletList>
        </div>
        <div style={{ flex: .4 }}>
          <img width="100%" src={"/images/courses/kg-basics/ontology/introduction.png"} />
        </div>
      </div>
  );
}