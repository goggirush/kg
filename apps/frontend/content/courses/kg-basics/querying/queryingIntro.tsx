import Definition from '@/components/Definition/Definition';
import BulletList from '@/components/BulletList/BulletList';

export default function QueryingIntroSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>

        <div style={{ flex: 0.5 }}>
          <h2>Querying Connected Data</h2>
          <p>
            Once your knowledge graph is filled with useful facts, the next step is knowing how to <strong>ask questions</strong> about it.
            That’s where a query language comes in.
          </p>
          <p>
            <strong><Definition term="sparql" text="SPARQL" /></strong> (pronounced "sparkle") is the language used to search and explore knowledge graphs.
            It's similar to how SQL is used for databases — but <Definition term="sparql" text="SPARQL" /> is built for graphs, not tables.
          </p>
          <p>
            Instead of querying rows and columns, <Definition term="sparql" text="SPARQL" /> works with <Definition term="Triple" text="triples" />.
            It helps you find patterns and connections across the graph.
          </p>
          <p>
            With <Definition term="sparql" text="SPARQL" />, you can ask things like:
          </p>
          <ul>

          </ul>
          <BulletList>
            <li>“Which engine belongs to which truck?”</li>
            <li>“Who built the engine in Truck123?”</li>
            <li>“Which trucks use the same engine type?”</li>
          </BulletList>
          <p>
            Instead of giving exact instructions, you describe the <strong>pattern</strong> of what you're looking for — and <Definition term="sparql" text="SPARQL" /> finds the matches.
            That’s what makes it so powerful for connected data.
          </p>
        </div>

        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"intro.png"}
            alt="SPARQL querying a knowledge graph"
          />
        </div>
      </div>
  );
}