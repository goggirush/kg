import Definition from '@/components/Definition/Definition';

export default function KnowledgeGraphsUseOntologiesSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"/images/courses/kg-basics/knowledgeGraphs/ontologiesAndKG.png"}
            alt="How Knowledge Graphs Use Ontologies"
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>How Knowledge Graphs Use Ontologies</h2>
          <p>
            A knowledge graph connects real-world things — like vehicles, engines, and service records — into a network of facts. But for that network to be useful, there needs to be a shared understanding of what each thing is and how it relates to others.
          </p>
          <p>
            That’s the role of the <Definition term="ontology" text="ontology" />: it defines the <em>vocabulary and rules</em> the graph relies on. It tells us that <code>Truck123</code> is a <code>Truck</code>, that <code>hasEngine</code> connects a <code>Truck</code> to an <code>Engine</code>, and that these aren't just labels — they're part of a structure machines can reason over.
          </p>
          <p>
            When combined, the <Definition term="ontology" text="ontology" /> and the knowledge graph become more than just linked data — they become a <strong>semantic system</strong>. The <Definition term="ontology" text="ontology" /> brings meaning, validation, and reasoning capabilities. The graph brings the actual data that lives by those rules.
          </p>
          <p>
            This combination enables consistency across teams and systems, improves interoperability, and unlocks powerful reasoning — like automatically classifying new instances, checking for missing links, or discovering hidden relationships.
          </p>
          <p>
            Without an <Definition term="ontology" text="ontology" />, a knowledge graph is just a flexible database. With one, it becomes a system that can truly <em>understand</em> its own structure.
          </p>
        </div>
      </div>
  );
}