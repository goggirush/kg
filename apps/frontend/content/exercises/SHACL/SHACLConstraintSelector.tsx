import React, { useState } from 'react';
import styles from '../DragAndDrop/DragAndDrop.module.scss'
import Button from '../../components/Button/Button.tsx';

type Props = {
  onComplete?: () => void;
};

const SHACLConstraintSelector = ({ onComplete }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const scenario = 'Every person must have a name that is a string.';

  const options = [
    {
      id: 0,
      code: `sh:property [
  sh:path ex:name ;
  sh:datatype xsd:string ;
  sh:minCount 1 ;
] .`,
      isCorrect: true,
    },
    {
      id: 1,
      code: `sh:property [
  sh:path ex:name ;
  sh:nodeKind sh:IRI ;
] .`,
      isCorrect: false,
    },
    {
      id: 2,
      code: `sh:property [
  sh:path ex:age ;
  sh:datatype xsd:string ;
  sh:minCount 1 ;
] .`,
      isCorrect: false,
    },
  ];

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (options[selected].isCorrect) {
      onComplete?.();
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div style={{ padding: '2rem', borderRadius: '12px', background: '#f8f9fb' }}>
      <h3>🧠 SHACL Scenario: Which constraint applies?</h3>
      <p><strong>Scenario:</strong> {scenario}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() => !submitted && setSelected(opt.id)}
            style={{
              border: selected === opt.id ? '2px solid #00447c' : '2px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              background: submitted
                ? opt.isCorrect
                  ? '#e6fce6'
                  : opt.id === selected
                    ? '#ffe6e6'
                    : '#fff'
                : '#fff',
              cursor: submitted ? 'default' : 'pointer',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
            }}
          >
            {opt.code}
          </div>
        ))}
      </div>

      {!submitted && (
          <div className={styles.actionContainer}>
        <Button text="Submit" onClick={handleSubmit} disabled={selected === null} />
        </div>
      )}

      {submitted && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 600 }}>
            {options[selected!].isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          {!options[selected!].isCorrect && (
            <p style={{ fontStyle: 'italic', color: '#444' }}>
              💡 The correct answer must use `sh:path ex:name`, `sh:datatype xsd:string` and `sh:minCount 1`.
            </p>
          )}
          <Button text="Try again" onClick={handleRetry} />
        </div>
      )}
    </div>
  );
};

export default SHACLConstraintSelector;
