import Definition from '@/components/Definition/Definition';
import URI from '@/components/URI/URI';


export default function URIsAndLinkedDataSlide() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
            <div style={{ flex: 0.5 }}>
                <h2>From Full URIs to Prefixes</h2>
                <p>
                    <Definition term="RDF (Resource Description Framework)" text="RDF" /> uses full <Definition term="URI (Uniform Resource Identifier)" text="URIs" /> to uniquely identify resources, like:
                </p>
                <code style={{ display: 'block', margin: '0.25rem 0', background: '#f3f3f3', padding: '0.5rem' }}>
                    http://example.org/Truck123
                </code>
                <p>
                    But writing long <Definition term="URI (Uniform Resource Identifier)" text="URIs" /> everywhere is repetitive. That’s where <Definition term="namespace" text="namespace" /> and <Definition term="prefix" text="prefix" /> come in!
                </p>
                <p>
                    You can define a <Definition term="prefix" text="prefix" /> in this way:
                </p>
                <code style={{ display: 'block', margin: '0.25rem 0', background: '#f3f3f3', padding: '0.5rem' }}>
                    PREFIX ex: &lt;http://example.org/&gt;
                </code>
                <p>
                    Then use this shorter <Definition term="Curie" text="CURIE" /> form going forward:
                </p>
                <URI value="ex:Truck123" />
                <p>
                    This makes <Definition term="RDF (Resource Description Framework)" text="RDF" /> easier to read and write, while keeping the global uniqueness of <Definition term="URI (Uniform Resource Identifier)" text="URIs" /> intact.
                </p>
                <p>
                    Prefixes are especially useful in <Definition term="SPARQL" text="SPARQL" /> queries and <Definition term="ontology" text="ontology" /> modeling, where reuse and readability matter.
                </p>
            </div>
            <div style={{ flex: 0.4 }}>
                <img width="100%" src={"/images/courses/kg-basics/RDF/namespace.png"} alt="RDF Namespaces and Prefixes" />
            </div>
        </div>
    );
}