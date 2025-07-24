import Definition from '@/components/Definition/Definition';
import SparqlBlock from '@/components/SparqlBlock/SparqlBlock';
import dedent from 'dedent';


export default function QueryingPrepareFirstQuerySlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"firstQuery.png"}
            alt="SPARQL triple pattern"
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Your First SPARQL Query</h2>
          <p>
            Let’s begin with a simple question: <em>“What facts exist in this graph?”</em>
          </p>
          <SparqlBlock
            query={dedent(`
            SELECT * {
              ?s ?p ?o .
            }
          `)}
          />
          <p>
            This query tells the graph: “Show me everything you know.” It matches all <Definition term="triple" text="triples" /> — each consisting of a <Definition term="subject" text="subject" /> , a <Definition term="predicate" text="predicate" /> , and an <Definition term="object" text="object" /> .
          </p>
          <p>
            The <code>*</code> means “return all variables,” and the <code>?s ?p ?o</code> pattern means “find all matching connections.”
          </p>
          <p>
            It’s the perfect way to peek inside a dataset and get a feel for what kinds of entities and relationships are present.
            You can think of it as a raw dump of all the graph’s knowledge — a great place to start when you have no idea what’s in the graph yet.
            As you read through the output, you’ll begin to notice patterns: maybe you’ll see trucks linked to engines, people linked to tasks, or products with prices.
            That’s the structure <Definition term="sparql" text="SPARQL" />  works with — and soon you’ll be able to query it more precisely.
          </p>
          <p>

          </p>
        </div>

      </div>
  );
}