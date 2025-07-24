import React, { useState } from 'react';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './DragAndDrop.module.scss';
import Button from '@/components/Button/Button.tsx'

type DropZoneType = 'subject' | 'predicate' | 'object';

type DraggableItem = {
  label: string;
  type: DropZoneType;
};

const correctTriple: Record<DropZoneType, string> = {
  subject: 'Scania',
  predicate: 'headquarteredIn',
  object: 'Södertälje',
};

const TripleBuilderExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [drops, setDrops] = useState<Record<DropZoneType, string | null>>({
    subject: null,
    predicate: null,
    object: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const isComplete =
    drops.subject && drops.predicate && drops.object;

  const isCorrect =
    drops.subject === correctTriple.subject &&
    drops.predicate === correctTriple.predicate &&
    drops.object === correctTriple.object;

  const handleDrop = (zone: DropZoneType, item: DraggableItem) => {
    setDrops((prev) => ({
      ...prev,
      [zone]: item.label,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (isCorrect) onComplete();
  };

  const handleRetry = () => {
    setDrops({ subject: null, predicate: null, object: null });
    setSubmitted(false);
  };

  const terms: DraggableItem[] = [
    { label: 'Scania', type: 'subject' },
    { label: 'Södertälje', type: 'object' },
    { label: 'headquarteredIn', type: 'predicate' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Build the correct triple</h3>
        <p>Drag each term into the correct position:</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          {(['subject', 'predicate', 'object'] as DropZoneType[]).map((zone) => (
            <TripleSlot
              key={zone}
              type={zone}
              label={drops[zone]}
              onDrop={(item) => handleDrop(zone, item)}
            />
          ))}
        </div>

        {!submitted && isComplete && (
          <div className={styles.actionContainer}>
            <Button text="Submit" onClick={handleSubmit} />
          </div>
        )}

        {submitted && (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontWeight: 600 }}>
              {isCorrect ? '✅ Correct!' : '❌ Not quite. Try again!'}
            </p>
            {!isCorrect && <Button text="Retry" onClick={handleRetry}/>}
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {terms
            .filter((term) => !Object.values(drops).includes(term.label))
            .map((term) => (
              <DraggableTerm key={term.label} label={term.label} />
            ))}
        </div>
      </div>
    </DndProvider>
  );
};

const TripleSlot = ({
  type,
  label,
  onDrop,
}: {
  type: DropZoneType;
  label: string | null;
  onDrop: (item: DraggableItem) => void;
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'term',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const labelMap = {
    subject: 'Subject',
    predicate: 'Predicate',
    object: 'Object',
  };

  return (
    <div
      ref={dropRef}
      style={{
        padding: '1rem',
        minWidth: '150px',
        height: '30px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        backgroundColor: isOver ? '#dff0ff' : '#f5f5f5',
        fontWeight: 'bold',
      }}
    >
      {label ? (
        <span>{label}</span>
      ) : (
        <span style={{ color: '#999' }}>{labelMap[type]}</span>
      )}
    </div>
  );
};

const DraggableTerm = ({ label }: { label: string }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'term',
    item: { label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        padding: '0.8rem 1.2rem',
        background: isDragging ? '#ccc' : '#3f4693',
        color: 'white',
        minWidth: '100px',
        borderRadius: '6px',
        border: '2px dashed #b3a8e5',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {label}
    </div>
  );
};

export default TripleBuilderExercise;
