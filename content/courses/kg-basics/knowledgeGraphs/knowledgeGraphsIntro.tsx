import Definition from '@/components/Definition/Definition';
import TripleIllustration from '@/components/TripleIllustration/TripleIllustration';

export default function KnowledgeGraphsIntroSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>What is a Knowledge Graph?</h2>
          <p>
            A <strong>knowledge graph</strong> is a way to represent information as a network — where <em>entities</em> (like trucks, engines, or service events)
            are connected by <em>relationships</em> that reflect how they relate in the real world.
          </p>
          <p>
            Unlike traditional databases that use tables and rows, a knowledge graph is built using <Definition term="Triple" text="triples" />, for example:
          </p>
          <TripleIllustration subject="Truck123" predicate="hasEngine" object="EngineX" />
          <p>
            So how does a knowledge graph and a <Definition term="ontology" text="ontology" /> differ?
            You can think of the knowledge graph as the <strong>data layer</strong> — the actual facts and connections — while the <Definition term="ontology" text="ontology" /> is the
            blueprint that defines how this data should be structured, what types of things exist, and how they can relate.
          </p>
          <p>
            Together, the <Definition term="ontology" text="ontology" /> and the graph work hand in hand:
            the <Definition term="ontology" text="ontology" /> provides the <em>rules</em>, and the knowledge graph holds the <em>facts</em>. This pairing enables
            smarter systems that can validate, infer, and make sense of complex information.
          </p>
        </div>
        <div style={{ flex: .4, alignSelf: 'center' }}>
          <img
            src={"/images/courses/kg-basics/knowledgeGraphs/whatIs.png"}
            alt="Intro graph"
            width="80%"
          />
        </div>
      </div>
  );
}