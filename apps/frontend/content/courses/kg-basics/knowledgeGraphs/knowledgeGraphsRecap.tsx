import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';

export default function OntologiesRecapSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>Summary: What You Learned About Knowledge Graphs</h2>
          <BulletList>
            <li>A knowledge graph represents data as a network of facts</li>
            <li>It models real-world relationships between entities like trucks and engines</li>
            <li>An ontology defines what kinds of entities and relationships can exist</li>
            <li>Knowledge graphs are ideal for large-scale, evolving data landscapes</li>
            <li>They’re used in real-world applications</li>
          </BulletList>
          <p>
            Now that you’ve seen how a knowledge graph is built and structured, you might be wondering — how do we actually get useful information out of it?
          </p>
          <p>
            That’s where <Definition term="sparql" text="SPARQL" /> comes in. It’s the language used to ask questions to a knowledge graph — just like SQL is used for databases.
          </p>
          <p>
            In the next section, you’ll learn how to write your first <Definition term="sparql" text="SPARQL" /> queries, retrieve facts, and understand how graph querying works compared to traditional tables.
          </p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"/images/courses/kg-basics/knowledgeGraphs/recap.png"}
            alt="How Knowledge Graphs Use Ontologies"
          />
        </div>
      </div>
  );
}