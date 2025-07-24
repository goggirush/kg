import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';
import styles from '@/components/BulletList/BulletList.module.scss';

export default function OntologiesRealWorldAnalogySlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0' }}>
        <div style={{ flex: 0.5 }}>
          <div>
            <h2>Real-World Analogy: LEGO</h2>
            <p>
              Imagine building with LEGO bricks. LEGO has simple, universal rules, and if we were to translate them to the world of knowledge graphs, it would break down to something like this;
            </p>
            <BulletList>
              <li className={styles.default}><Definition term="Class" text="Classes" /> <span style={{ marginLeft: '5px' }}>- Each type of brick represents a category.</span></li>
              <li className={styles.orange}><Definition term="Object Property" text="Properties" /> <span style={{ marginLeft: '5px' }}>- Bricks are designed to connect in specific ways.</span></li>
              <li className={styles.default}><Definition term="Instance" text="Individuals" /> <span style={{ marginLeft: '5px' }}>- When you put bricks together, you create a unique model.</span></li>
            </BulletList>
            <p>
              Without the rules of connection, building would be chaotic — blocks might not fit, and your model would collapse. <Definition term="ontology" text="Ontologies" /> work the same way: they define the <strong>rules</strong> and <strong>types</strong> that ensure data connects logically and meaningfully.
            </p>

            <p>
              In a knowledge graph, the rules of your "LEGO set" help different teams, systems, and applications build consistent, reliable knowledge — no matter how complex the design.
            </p>
            <p><strong>Ontologies are the blueprint that makes data reusable, modular, and interoperable — just like a well-designed LEGO set.</strong></p>

          </div>
        </div>

        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"/images/courses/kg-basics/ontology/lego.png"} alt="LEGO blocks analogy" />
        </div>
      </div>
  );
}