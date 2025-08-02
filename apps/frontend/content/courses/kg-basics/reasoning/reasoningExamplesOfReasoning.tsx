import Definition from '@/components/Definition/Definition';

export default function ReasoningExamplesSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"examplesOfReasoning.png"} alt="Reasoning example: subclass inference" />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Reasoning by Inference</h2>
          <p>If your <Definition term="ontology" text="ontology" /> says:</p>
          <ul>
            <li><code>Truck</code> is a subclass of <code>Vehicle</code></li>
            <li><code>Truck123</code> is an instance of <code>Truck</code></li>
          </ul>
          <p>
            Then a reasoner can infer that <code>Truck123</code> is also a <code>Vehicle</code> — even if that <Definition term="triple" text="triple" /> isn’t explicitly stored.
          </p>
          <p>
            This kind of reasoning is powerful because it eliminates the need to manually maintain all relationships. Instead, the system can automatically fill in the gaps. By applying logic, reasoning systems enhance the consistency and coverage of knowledge graphs, ensuring that the system works based on complete knowledge, not just individual facts.
          </p>
          <p>
            For applications, this means a more intelligent system that adapts to new data dynamically. It can automatically deduce facts and correct inconsistencies, making the overall system more reliable and efficient.
          </p>
        </div>
      </div>
  );
}