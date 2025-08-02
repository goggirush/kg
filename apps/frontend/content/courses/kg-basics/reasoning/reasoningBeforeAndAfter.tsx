import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';

export default function ReasoningBeforeAndAfterSlide() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>OWL-Based Inference</h2>
          <p>OWL reasoners are integral tools for working with knowledge graphs because they help derive new facts based on the existing <Definition term="ontology" text="ontology" />. Through logical rules, OWL reasoners can infer relationships that were not explicitly defined in the graph but follow logically from the data.</p>
          <p>For example, OWL reasoners can infer <strong>subclass relationships</strong>. If "Dog" is a subclass of "Animal" and "Buddy" is a "Dog," the reasoner will infer that "Buddy" is also an "Animal." This allows for the automatic expansion of the graph's structure based on predefined relationships.</p>
          <p>In addition to subclass relationships, OWL reasoners can also:</p>
          <BulletList>
            <li><strong><span style={{marginRight: '10px'}}>EquivalentClass:</span></strong> Recognize that different terms represent the same entity or relationship.</li>
            <li><strong><span style={{marginRight: '10px'}}>InverseProperty:</span></strong> Identify reverse relationships, making the graph more complete.</li>
            <li><strong><span style={{marginRight: '10px'}}>DisjointWith:</span></strong> Spot logical contradictions when two terms cannot coexist in the same context.</li>
          </BulletList>
          <p>By applying these reasoning rules, OWL reasoners help maintain consistency and data integrity. They provide a powerful tool to uncover hidden knowledge in the graph and ensure that your data remains logically sound as the graph grows.</p>

        </div>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"owlReasoners.png"} alt="OWL reasoning examples" />
        </div>
      </div>
    );
}