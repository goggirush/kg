import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';
import styles from '@/components/BulletList/BulletList.module.scss';

export default function OntologiesRecapSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <div>
            <h2>From Structured Meaning to Connected Knowledge</h2>
            <p>
              So far, you've learned how <Definition term="ontology" text="ontologies" /> help us bring meaning to data. By defining <Definition term="Class" text="classes" />, <Definition term="Object Property" text="properties" />, and <Definition term="Instance" text="individuals" />, <Definition term="ontology" text="ontologies" /> give us a common structure to describe the world in a way both humans and machines can understand.
            </p>
            <BulletList>
              <li className={styles.default}><Definition term="Class" text="Classes" /> <span style={{ marginLeft: '5px' }}> define categories like <code>Truck</code> or <code>Engine</code></span></li>
              <li className={styles.orange}><Definition term="Object Property" text="Properties" /> <span style={{ marginLeft: '5px' }}> connect things and describe their features (like <code>hasEngine</code>)</span></li>
              <li className={styles.default}><Definition term="Instance" text="Individuals" /> <span style={{ marginLeft: '5px' }}> are the real-world specifics (like Truck V20)</span></li>
            </BulletList>
            <p>
              An <Definition term="ontology" text="ontology" /> is like the <strong>blueprint</strong> for your knowledge model — but it’s only one part of the bigger picture.
            </p>
            <p>
              In the next section, we’ll look at how all of this fits together in a full <strong>knowledge graph</strong>. We’ll explore how structured meaning and connected facts come together to form a graph of knowledge — and why that’s so powerful.
            </p>
            <p>Ready to see the bigger picture?</p>
          </div>
        </div>

        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"/images/courses/kg-basics/ontology/summary.png"} alt="Summary" />
        </div>
      </div>
  );
}