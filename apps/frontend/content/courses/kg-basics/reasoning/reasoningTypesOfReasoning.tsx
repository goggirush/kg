import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';

export default function ReasoningTypesOfReasoningSlide() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"typesOfReasoning.png"} alt="Types of reasoning" />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Types of Reasoning</h2>
          <p>Reasoning plays a pivotal role in knowledge graphs by drawing logical conclusions from the available data. The three most commonly used types of reasoning in knowledge graphs are:</p>
          <BulletList>
            <li><strong><span style={{marginRight: '10px'}}>Deductive Reasoning</span></strong> This form of reasoning is based on applying logical rules to existing facts to derive new conclusions. For example, if you know that "All humans are mortal" and "Socrates is a human," deductive reasoning allows you to infer that "Socrates is mortal."</li>
            <li><strong><span style={{marginRight: '10px'}}>Inductive Reasoning</span></strong> Induction generalizes from specific instances to form general conclusions. While less common in traditional knowledge graphs, inductive reasoning is widely used in machine learning and data science to find patterns from large data sets.</li>
            <li><strong><span style={{marginRight: '10px'}}>Abductive Reasoning</span></strong> This reasoning is used when some information is missing, and the goal is to infer the most likely explanation. In knowledge graphs, abduction can help to fill in gaps in data and propose plausible connections.</li>
          </BulletList>
          <p>In practice, OWL-based reasoners primarily use <strong>deductive reasoning</strong>, which is crucial for ensuring consistency and for checking that the graph's logical structure aligns with its defined <Definition term="ontology" text="ontology" />. Deductive reasoning makes your knowledge graph more accurate and reliable for automated decision-making processes.</p>
          <p>Inductive and abductive reasoning can complement deductive reasoning by identifying patterns and making educated guesses based on existing data. These strategies can be implemented with additional layers in advanced systems that require dynamic and evolving inferences.</p>        </div>
      </div>
    );
}