import React, { useState } from 'react';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type DraggableItem = {
  type: 'predicate';
  label: string;
};

const correctPredicate = 'hasEngine';

const DragAndDropExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [dropped, setDropped] = useState<string | null>(null);

  const [{ isOver }, dropRef] = useDrop({
    accept: 'predicate',
    drop: (item: DraggableItem) => {
      setDropped(item.label);
      if (item.label === correctPredicate) onComplete();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const predicates = ['hasEngine', 'hasColor', 'hasWheelCount'];

  return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Drag the correct predicate between the nodes:</p>
        <h3>Truck123 — <span ref={dropRef} style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          minWidth: '120px',
          backgroundColor: isOver ? '#e0fce0' : '#f9f9f9'
        }}>
          {dropped || 'Drop here'}
        </span> — EngineX</h3>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {predicates.map((label) => (
            <PredicateDraggable key={label} label={label} />
          ))}
        </div>

        {dropped && (
          <div style={{ marginTop: '2rem', fontWeight: 600 }}>
            {dropped === correctPredicate ? '✅ Correct!' : '❌ Try again'}
          </div>
        )}
      </div>
  );
};

const PredicateDraggable = ({ label }: { label: string }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'predicate',
    item: { type: 'predicate', label },
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

export default DragAndDropExercise;
