import Definition from '@/components/Definition/Definition';
import SparqlBlock from '@/components/SparqlBlock/SparqlBlock';
import dedent from 'dedent';

export default function QueryingFilterSlide() {
  return (
     <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>Apply Filters in Your Queries</h2>

          <p>
            So far, we’ve seen how to list all <Definition term="subject" text="subjects" /> in a graph — but what if you only want to find specific ones? That’s where the <code>FILTER</code> clause comes in.
          </p>
          <SparqlBlock
            query={dedent(`
            SELECT ?truck WHERE {
          ?truck a :Truck ;
                :hasYear ?year .
          FILTER(?year > 2015)
        }
          `)}
          />
          <p>
            In this example, we’re looking for all entities that are classified as a <code>:Truck</code> and have a manufacturing year stored as <code>:hasYear</code>. But we don’t want <em>all</em> trucks — just the ones built after 2015.
          </p>
          <p>
            The <code>FILTER</code> line adds a condition: <code>?year &gt; 2015</code>. That means the query will only return trucks whose year is greater than 2015.
          </p>
          <p>
            You can use <code>FILTER</code> with numbers, dates, and even strings. Filters are very common in real-world <Definition term="sparql" text="SPARQL" /> queries. They allow you to zoom in on exactly the information you need — and skip over anything that doesn’t match.
          </p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"filter.png"} alt="SPARQL FILTER clause" />
        </div>
      </div>
  );
}