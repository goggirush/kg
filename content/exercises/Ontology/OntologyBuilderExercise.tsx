import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '@../../components/Button/Button.tsx';
import styles from '../DragAndDrop/DragAndDrop.module.scss';

const ITEM_TYPE = 'ontologyTerm';

const terms = [
  { label: 'Truck', type: 'class' },
  { label: 'Engine', type: 'class' },
  { label: 'hasEngine', type: 'property' },
];

const correctStructure = {
  left: 'Truck',
  middle: 'hasEngine',
  right: 'Engine'
};

const OntologyBuilderExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [slots, setSlots] = useState({ left: null, middle: null, right: null });
  const [submitted, setSubmitted] = useState(false);

  const isComplete = slots.left && slots.middle && slots.right;
  const isCorrect =
    slots.left === correctStructure.left &&
    slots.middle === correctStructure.middle &&
    slots.right === correctStructure.right;

  const handleDrop = (zone: 'left' | 'middle' | 'right', item: any) => {
    setSlots(prev => ({ ...prev, [zone]: item.label }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (isCorrect) onComplete();
  };

  const handleRetry = () => {
    setSlots({ left: null, middle: null, right: null });
    setSubmitted(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Visually Build an Ontology Statement</h3>
        <p>Connect a subject class, a property, and an object class:</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
          <OntologySlot zone="left" label={slots.left} onDrop={handleDrop} placeholder="Class" />
          <div style={{ fontSize: '24px' }}>→</div>
          <OntologySlot zone="middle" label={slots.middle} onDrop={handleDrop} placeholder="Property" />
          <div style={{ fontSize: '24px' }}>→</div>
          <OntologySlot zone="right" label={slots.right} onDrop={handleDrop} placeholder="Class"/>
        </div>

        {!submitted && isComplete && (
          <div className={styles.actionContainer}>
            <Button text="Submit" onClick={handleSubmit} />
          </div>
        )}

        {submitted && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontWeight: 600 }}>
              {isCorrect ? '✅ Correct Ontology Statement!' : '❌ Not quite. Try again!'}
            </p>
             {!isCorrect && <Button text="Retry" onClick={handleRetry} />}
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {terms.filter(term => !Object.values(slots).includes(term.label)).map(term => (
            <DraggableTerm key={term.label} label={term.label} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const OntologySlot = ({ zone, label, onDrop, placeholder, color }: any) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => onDrop(zone, item),
    collect: monitor => ({ isOver: monitor.isOver() })
  });

  return (
    <div
      ref={dropRef}
      style={{
        minWidth: '120px',
        minHeight: '30px',
        backgroundColor: isOver ? '#e3f2fd' : '#f4f4f4',
        border: `2px dashed #cccccc`,
        borderRadius: '8px',
        padding: '1rem',
        fontWeight: 'bold',
        color: color,
      }}
    >
      {label || <span style={{ color: '#999' }}>{placeholder}</span>}
    </div>
  );
};

const DraggableTerm = ({ label }: { label: string }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { label },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        padding: '0.8rem 1.2rem',
        background: isDragging ? '#bbb' : '#3f4693',
        minWidth: '100px',
        color: 'white',
        borderRadius: '6px',
        border: '2px dashed #c5cae9',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {label}
    </div>
  );
};

export default OntologyBuilderExercise;
