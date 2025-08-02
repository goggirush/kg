import React, { useState } from 'react';

type Props = {
  onComplete?: () => void;
};

const SHACLValidationExercise = ({ onComplete }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sample SHACL & RDF pair
  const shape = `
ex:PersonShape
  a sh:NodeShape ;
  sh:targetClass ex:Person ;
  sh:property [
    sh:path ex:email ;
    sh:datatype xsd:string ;
    sh:minCount 1 ;
  ] .
`;

  const data = `
ex:John a ex:Person .
`;

  const correctAnswer = 'No';
  const explanation = 'The shape requires ex:email (datatype xsd:string), but the data does not include it.';

  const handleSubmit = () => {
    if (!selected) return;
    setIsSubmitted(true);
    if (selected === correctAnswer) {
      onComplete?.();
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setIsSubmitted(false);
  };

  return (
    <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8f9fb' }}>
      <h3>SHACL Validation: Does this data conform to the shape?</h3>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h4>📘 SHACL Shape</h4>
          <pre style={boxStyle}>{shape}</pre>
        </div>
        <div style={{ flex: 1 }}>
          <h4>📄 RDF Data</h4>
          <pre style={boxStyle}>{data}</pre>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <p><strong>Does this data pass the SHACL shape?</strong></p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            style={buttonStyle(selected === 'Yes')}
            onClick={() => setSelected('Yes')}
            disabled={isSubmitted}
          >
            ✅ Yes
          </button>
          <button
            style={buttonStyle(selected === 'No')}
            onClick={() => setSelected('No')}
            disabled={isSubmitted}
          >
            ❌ No
          </button>
        </div>

        {!isSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            style={{
              padding: '0.6rem 1.2rem',
              background: '#00447c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: selected ? 'pointer' : 'not-allowed',
            }}
          >
            Submit Answer
          </button>
        )}

        {isSubmitted && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 600 }}>
              {selected === correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p style={{ fontStyle: 'italic', color: '#444' }}>💡 {explanation}</p>

            <button onClick={handleRetry} style={{ marginTop: '1rem', background: '#eee', padding: '0.5rem 1rem', borderRadius: '6px' }}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const boxStyle = {
  background: '#fff',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap' as const,
};

const buttonStyle = (selected: boolean) => ({
  padding: '0.6rem 1rem',
  border: selected ? '2px solid #00447c' : '2px solid #ccc',
  borderRadius: '8px',
  background: selected ? '#e0ecff' : '#fff',
  cursor: 'pointer',
});

export default SHACLValidationExercise;
