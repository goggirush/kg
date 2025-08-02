import Definition from '@/components/Definition/Definition';

export default function fullURIsNamespacesAndPrefixes() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '10px 0px' }}>
            <div style={{ flex: 0.4 }}>
                <img width="100%" src={"/images/courses/kg-basics/RDF/URI.png"} alt="RDF Linked Data and URIs" />
            </div>
            <div style={{ flex: 0.5 }}>
                <h2>Global Identifiers with URIs</h2>
                <p>
                    In <Definition term="RDF (Resource Description Framework)" text="RDF" />, every subject, predicate, and object is ideally identified using a <Definition term="URI (Uniform Resource Identifier)" text="URI" /> — a globally unique identifier such as:
                </p>
                <code style={{ display: 'block', margin: '0.25rem 0', background: '#f3f3f3', padding: '0.5rem' }}>
                    http://example.org/Truck123
                </code>
                <p>
                    A <Definition term="URI (Uniform Resource Identifier)" text="URI" /> acts like a precise address. It ensures that when we refer to something, <em>everyone else knows exactly what we mean</em> — no confusion, no duplication.
                </p>
                <p>
                    This simple idea is what makes RDF so powerful across systems. <Definition term="URI (Uniform Resource Identifier)" text="URIs" /> turn isolated data into <Definition term="Linked Data" text="linked data" /> — data that connects across documents, domains, and organizations.
                </p>
                <p>
                    For example, a truck described in one system and an engine described in another can be connected — just by referring to each other using <Definition term="URI (Uniform Resource Identifier)" text="URIs" />.
                </p>
                <p>
                    <Definition term="URI (Uniform Resource Identifier)" text="URIs" /> are the foundation of the <Definition term="Semantic Web" text="Semantic Web" />. They make <Definition term="RDF (Resource Description Framework)" text="RDF" /> data unambiguous, mergeable, and reusable — across time, teams, and technologies.
                </p>
                <p>
                    In short: if you want data that plays well with others, use <Definition term="URI (Uniform Resource Identifier)" text="URIs" />.
                </p>
            </div>
        </div>
    );
}