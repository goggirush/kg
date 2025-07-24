import BulletList from '@/components/BulletList/BulletList';

export default function KnowledgeGraphsDisconnectedDataSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"/images/courses/kg-basics/knowledgeGraphs/disconnectedData.png"}
            alt="Data integration and federation with graphs"
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Knowledge Graphs Integrate Disconnected Data</h2>
          <p>
            Large organizations often struggle with data spread across disconnected systems — each one using different formats, identifiers, or assumptions.
          </p>
          <p>
            A knowledge graph can serve as the <strong>semantic bridge</strong> between those systems:
          </p>
          <BulletList>
            <li>Connect tables, files, databases, APIs</li>
            <li>Resolve different identifiers for the same entity</li>
            <li>Create a unified view of things and how they relate</li>
          </BulletList>
          <p>
            This is called <strong>data federation</strong>. It allows systems to remain independent, but work together through a shared data layer.
          </p>
          <p>
            With a graph-based integration approach, Scania can unlock value from data that was previously siloed or inaccessible.
          </p>
        </div>

      </div>
  );
}