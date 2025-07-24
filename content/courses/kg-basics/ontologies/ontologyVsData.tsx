import Definition from '@/components/Definition/Definition';

export default function OntologyVsDataSlide() {
    return (
        <div style={{ padding: '10px' }}>
            <h2>Ontology vs. Data</h2>
            <p>
                It’s easy to confuse data with an <Definition term="ontology" text="ontology" /> — but they serve different purposes.
                The <Definition term="ontology" text="ontology" /> defines the structure and rules; the data fills in the details.
            </p>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>Ontology</h4>
                    <div style={{
                        background: '#f0f4f9',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }}>
                        Class: Truck<br />
                        Property: hasEngine (Truck → Engine)<br />
                        Class: Engine<br />
                    </div>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        The structure and rules. Defines the types of things that exist and how they can relate.
                    </p>
                </div>

                <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>Data</h4>
                    <div style={{
                        background: '#fdf6ec',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }}>
                        Truck123 hasEngine Engine456<br />
                        Truck789 hasEngine Engine999<br />
                        Truck553 hasEngine Engine42x
                    </div>
                    <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        The actual facts — individual trucks and engines, connected using the <Definition term="ontology" text="ontology´s" /> structure.
                    </p>
                </div>
            </div>

            <p style={{ marginTop: '1.5rem' }}>
                The <strong><Definition term="ontology" text="ontology" /> gives meaning</strong> to otherwise raw, disconnected data. Without it, a system wouldn’t know what kind of thing <code>Truck123</code> is, or how to interpret the relationship <code>hasEngine</code>.
            </p>
        </div>
    );
}