import Definition from '@/components/Definition/Definition';

export default function OntologiesBlueprintSlide() {
    return (
        <div style={{ padding: '10px' }}>
            <h2>Ontologies: The blueprint of knowledge</h2>
            <p>
                An <Definition term="ontology" text="ontology" /> is a formal description of how knowledge is structured. It defines:
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>

                <div style={{ padding: '20px', background: '#f0f4f8', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ marginBottom: '.5rem' }}>Classes</h3>
                        Classes are categories that represent real-world concepts or entities — they define what kind of thing something is in a knowledge graph
                    </div>
                    <div>
                        <span>Examples:</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {['Truck', 'Engine', 'Organization'].map((label) => (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={label}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: 'coral',
                                            marginTop: '8px',
                                        }}
                                    />
                                    <div style={{ fontWeight: 'bold' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ padding: '20px', background: '#f0f4f8', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ marginBottom: '.5rem' }}>Properties</h3>
                        Properties define how things are connected or what characteristics they have. They tell the story of how things relate, what they are like, and why they matter.
                    </div>
                    <div>
                        <span>Examples:</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                            {['owns', 'locatedAt', 'producedOn'].map((label) => (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={label}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#65c1bc',
                                            marginTop: '8px',
                                        }}
                                    />
                                    <div style={{ fontWeight: 'bold' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ padding: '20px', background: '#f0f4f8', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ marginBottom: '.5rem' }}>Instances</h3>
                        Instances (also called individuals) represent specific, real-world examples of a class. Individuals are the "things" that exist in the real world
                    </div>
                    <div><span>Examples:</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                            {['pc_xp', 'EngineX1', 'Sensor_01'].map((label) => (
                                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }} key={label}>
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#d779d9',
                                            marginTop: '8px',
                                        }}
                                    />
                                    <div style={{ fontWeight: 'bold' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <p>
                <Definition term="ontology" text="Ontologies" /> help machines understand what your data means — not just what it says. Without an <Definition term="ontology" text="ontology" />, a dataset might tell you that <code>Truck123</code> has a value called <code>EngineX1</code>, but it won’t explain what kind of things these are, or how they relate. Is <code>Truck123</code> a product or an order, a concept? Is <code>EngineX1</code> a component, a service record, or a code? The meaning is ambiguous.
            </p>

            <p>
                With an <Definition term="ontology" text="ontology" />, we define the vocabulary: <code>Truck123</code> is an <strong>individual</strong> of the class <code>Truck</code>, and <code>EngineX1</code> is an <strong>individual</strong> of the class <code>Engine</code>. The relationship between them — <code>hasEngine</code> — is a <strong>property</strong> defined in the <Definition term="ontology" text="ontology" />. This structure turns a raw data point into a meaningful statement that software (and humans) can understand, reason about, and build upon.
            </p>
        </div>
    );
}