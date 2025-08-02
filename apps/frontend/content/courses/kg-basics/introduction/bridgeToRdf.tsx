import Definition from '@/components/Definition/Definition';

export default function BridgeToRdfSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{flex: .5,}}>
    <h2>From Ideas to Structured Data</h2>
        <p>So far, we’ve explored what knowledge graphs are, why they matter, and how they’re used — but only at a high level.</p>
        <p>We haven’t yet looked at <strong>how this knowledge is actually represented</strong> so that computers can understand and work with it.</p>
        <p>That’s where <Definition term="RDF (Resource Description Framework)" text="RDF" /> comes in — the foundation for structuring and linking knowledge in a graph-based format using simple building blocks called <em><Definition term="Triple" text="triples" /></em>.</p>
        <p>In the next section, you’ll learn how to use <Definition term="RDF (Resource Description Framework)" text="RDF" /> to describe things, their properties, and how they connect.</p>
        <p>Later, when we dive into <Definition term="Ontology" text="ontologies" />, you’ll meet <Definition term="RDFS (RDF Schema)" text="RDFS" /> — a companion to <Definition term="RDF (Resource Description Framework)" text="RDF" /> that adds structure, meaning, and rules to your graph.</p>
        <p>Let’s get started with the fundamentals of <Definition term="RDF (Resource Description Framework)" text="RDF" />.</p>
        </div>
            <div style={{ flex: .4, alignSelf: 'center' }}>
          <img
            src={"/images/courses/kg-basics/introduction/nextUpIsRDF.png"}
            alt="Intro graph"
            width="100%"
          />
        </div>
      </div>
  );
}