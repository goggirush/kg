import BulletList from '@/components/BulletList/BulletList';

export default function ReasoningWhyItMattersSlide() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>What Reasoning Enables</h2>
          <BulletList>
            <li>Automatically fill in missing knowledge</li>
            <li>Detect contradictions or inconsistencies</li>
            <li>Enable smarter, rule-aware applications</li>
          </BulletList>
          <p>
            Reasoning is a crucial aspect of knowledge graphs because it allows the system to perform logical inference, which goes beyond just storing facts. By making inferences about the relationships between entities, reasoning helps <strong>automatically fill in missing knowledge</strong> and detects inconsistencies in the data.
          </p>
          <p>
            Additionally, reasoning enables smarter, rule-aware applications. When your knowledge graph is powered by reasoning, it becomes more than a static dataset. Instead, it evolves by drawing connections between pieces of information that may not have been explicitly stated but are logically inferred.
          </p>
          <p>
            In practice, reasoning ensures the integrity of the graph by checking for contradictions and redundancies, improving the data's consistency, and making the knowledge graph a robust resource for data-driven decision-making.
          </p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img width="80%" src={"whyReasoningMatters.png"} alt="Reasoning benefits" />
        </div>
      </div>
    );
}