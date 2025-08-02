import Definition from '@/components/Definition/Definition';

export default function ReasoningRawDataVSInferredDataSlide() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px' }}>
            <h2>Reasoning in Knowledge Graphs</h2>
            <p>
                One of the most powerful features of reasoning is its ability to <strong>fill in the gaps</strong>.
                It allows the knowledge graph to go beyond the facts you’ve entered and use logic to <em>derive new facts automatically</em>.
                The example below shows how the same graph behaves <strong>with and without reasoning</strong>:
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <h2>Without Reasoning</h2>
                    <p>
                        The graph only knows what you explicitly told it. These are the raw facts you’ve entered:
                    </p>
                    <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
                        {`Truck123 rdf:type Truck
EngineX rdf:type Engine
Truck123 hasEngine EngineX`}
                    </pre>
                    <p>
                        No assumptions are made. If you don’t say something directly, the graph doesn’t know it.
                    </p>
                </div>

                <div style={{ flex: 1 }}>
                    <h2>With Reasoning</h2>
                    <p>
                        Now the system uses logic from the <Definition term="ontology" text="ontology" /> to <strong>infer new facts</strong> that were not written directly:
                    </p>
                    <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
                        {`Truck123 rdf:type Vehicle   ← inferred
EngineX rdf:type Component   ← inferred`}
                    </pre>
                    <p>
                        These new facts are derived based on class hierarchies — for example, the <Definition term="ontology" text="ontology" /> says that every <code>Truck</code> is also a <code>Vehicle</code>.
                    </p>
                    <p>
                        With reasoning enabled, your graph becomes <strong>smarter</strong> — and more complete — without needing to repeat information.
                    </p>
                </div>
            </div>
        </div>
    );
}