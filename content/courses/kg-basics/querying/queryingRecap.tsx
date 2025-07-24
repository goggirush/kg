import Definition from '@/components/Definition/Definition';

export default function QueryingRecapSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>SPARQL in Review</h2>
          <p>
            Congratulations — you've just taken your first steps into querying knowledge graphs using <Definition term="sparql" text="SPARQL" />!
          </p>
          <p>
            With just these basics, you can already explore and understand large graphs full of connected information. These patterns help you find real-world things — like which truck has which engine, or which components were used after a certain year.
          </p>
          <p>
            But this is just the beginning. <Definition term="sparql" text="SPARQL" /> supports many more features for more complex use cases, including:
          </p>
          <ul>
            <li><code>OPTIONAL</code> — to include data when it’s available, but not require it</li>
            <li><code>UNION</code> — to combine multiple query patterns together</li>
            <li><code>FILTER regex()</code> — for advanced text matching</li>
            <li><code>BIND</code> — to create new variables from expressions</li>
          </ul>
          <p>
            In the next part of this course, you'll move beyond querying and start learning about <strong>reasoning</strong> — where the graph itself can infer new facts using logic and <Definition term="ontology" text="ontologies" />.
          </p>
          <p>
            But for now, you've learned the core <Definition term="sparql" text="SPARQL" /> building blocks that will help you ask meaningful questions and get useful answers from any <Definition term="RDF (Resource Description Framework)" text="RDF" />-based knowledge graph.
          </p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"summary.png"} alt="SPARQL summary illustration" />
        </div>
      </div>
  );
}