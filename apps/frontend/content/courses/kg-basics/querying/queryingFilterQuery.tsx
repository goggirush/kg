import Definition from '@/components/Definition/Definition';
import SparqlBlock from '@/components/SparqlBlock/SparqlBlock';
import TripleIllustration from '@/components/TripleIllustration/TripleIllustration';
import dedent from 'dedent';

export default function QueryingFilterQuerySlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>Query Only Subjects</h2>
          <SparqlBlock
            query={dedent(`
            SELECT ?s {
              ?s ?p ?o .
            }
          `)}
          />
          <p>
            This query says: “Show me all the <strong><Definition term="subject" text="subjects" /></strong> in the graph.” A <Definition term="subject" text="subject" /> is the thing that a statement is about — like a truck, a person, or a component.
          </p>
          <ul>
            <li><code>SELECT ?s</code> — we only want the subject part of each triple</li>
            <li><code>?s ?p ?o</code> — this still matches all triples in the graph</li>
          </ul>
          <p>
            For example, lets inspect the triple below.
            <TripleIllustration
              subject="Factory 72C"
              predicate="-"
              object="-"
            />

            This query will find and return all triples that starts with "Factory 72C".
          </p>

          <p>
            Often, a single subject will appear in many triples. Seeing just the subjects lets you step back and ask,
            “What kinds of things are here?” without being overwhelmed by all the details.
          </p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img
            width="100%"
            src={"filtering.png"}
            alt="Subject filtering"
          />
        </div>
      </div>
  );
}