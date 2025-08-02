import Definition from '@/components/Definition/Definition';
import SparqlBlock from '@/components/SparqlBlock/SparqlBlock';
import dedent from 'dedent';

export default function QueryingDistinctSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"distinct.png"}
            alt="SPARQL DISTINCT"
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Use DISTINCT to Avoid Duplicates</h2>

          <p>
            When you query for <Definition term="subject" text="subjects" />, it’s common to get the same one multiple times. That’s because a single <Definition term="subject" text="subject" /> (like <code>Truck123</code>) might appear in many triples — one for its model, one for its engine, one for its color, and so on.
          </p>
          <p>
            If you want a cleaner list with each <Definition term="subject" text="subject" /> appearing only once, you can add the <code>DISTINCT</code> keyword. This tells <Definition term="sparql" text="SPARQL" />: “Only show me each <Definition term="subject" text="subject" /> one time, even if it appears in lots of results.”
          </p>
          <SparqlBlock
            query={dedent(`
            SELECT DISTINCT ?s {
          ?s ?p ?o .
        }
          `)}
          />
          <p>
            Think of it like removing duplicates in a spreadsheet. This is especially useful when you’re building lists of unique things, like:
          </p>
          <ul>
            <li>All trucks in the dataset</li>
            <li>All unique people</li>
            <li>All product IDs</li>
          </ul>
          <p>
            You can combine <code>DISTINCT</code> with other filters or clauses later, but it’s already powerful on its own when you’re just trying to get a sense of what unique entities exist in your data.
          </p>
        </div>

      </div>
  );
}