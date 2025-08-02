import Definition from '@/components/Definition/Definition';

export default function ReasoningIntroSlide() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
      <div style={{ flex: 0.5 }}>
        <h2>Reasoning in Knowledge Graphs</h2>
        <p>
          Reasoning allows a knowledge graph to <strong>automatically discover new facts</strong> based on the data it already has — even if those facts weren’t explicitly added. It does this by applying rules and logic defined in the <Definition term="ontology" text="ontology" />.
        </p>
        <p>
          For example, imagine you tell the system:
        </p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
          {`:Alice :hasParent :Bob .
:Bob rdf:type :Person .`}
        </pre>
        <p>
          And your <Definition term="ontology" text="ontology" /> includes a rule that says: <em>“If someone has a parent, they must also be a person.”</em>
        </p>
        <p>
          The reasoner can then infer:
        </p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
          {`:Alice rdf:type :Person   ← inferred`}
        </pre>
        <p>
          This new fact wasn’t manually added — the system <strong>figured it out</strong> based on the structure you defined.
          Reasoning helps your knowledge graph connect facts, validate relationships, and reveal insights that aren’t explicitly written down.
        </p>
      </div>
      <div style={{ flex: 0.4 }}>
        <img width="80%" src={"whatIsReasoning.pdf"} alt="Knowledge graph reasoning" />
      </div>
    </div>
  );
}