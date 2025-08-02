import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';


export default function RdfRecapSlide() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ flex: 0.5 }}>
                <h2>From Facts to Meaning</h2>
                <p>
                    So far, you’ve learned how <Definition term="RDF (Resource Description Framework)" text="RDF" /> breaks down information into simple <Definition term="Triple" text="triples" /> — subject, predicate, and object.
                    These <Definition term="Triple" text="triples" /> help us describe facts in a machine-readable format that’s flexible, extensible, and web-friendly.
                </p>
                <BulletList>
                    {/* TODO - Solve the margins in a better way than this */}
                    <li><Definition term="Triple" text="Triples" /> <span style={{ marginLeft: '5px' }}>form the structure of the graph</span></li>
                    <li><Definition term="URI (Uniform Resource Identifier)" text="URIs" /> <span style={{ marginLeft: '5px' }}>ensure things are globally linkable</span></li>
                    <li><Definition term="RDF (Resource Description Framework)" text="RDF" /> <span style={{ marginLeft: '5px' }}>enables the Semantic Web and Linked Data</span></li>
                </BulletList>
                <ul>

                </ul>
                <p>
                    But <Definition term="RDF (Resource Description Framework)" text="RDF" /> alone doesn’t explain what a “Truck” is, or what kind of value <code>:hasEngine</code> should link to.  <Definition term="RDF (Resource Description Framework)" text="RDF" /> gives us a structure — but not yet meaning.
                </p>
                <p>
                    That’s where <Definition term="ontology" text="ontologies" /> come in. They define the <em>vocabulary</em> and <em>rules</em> that shape our graph.
                </p>
                <p>
                    In the next section, we’ll explore <Definition term="ontology" text="ontologies" /> and how they help us model real-world domains with clarity and logic.
                </p>
            </div>
            <div style={{ flex: 0.4 }}>
                <img width="100%" src={"/images/courses/kg-basics/RDF/summary.png"} alt="RDF summary slide" />
            </div>
        </div>
    );
}