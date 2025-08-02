import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type RDFType = 'Class' | 'Individual' | 'Literal';

type Term = {
  id: string;
  label: string;
  correctType: RDFType;
};

const terms: Term[] = [
  { id: '1', label: 'ex:Mammal', correctType: 'Class' },
  { id: '2', label: 'ex:Truck123', correctType: 'Individual' },
  { id: '3', label: '"2010"', correctType: 'Literal' },
  { id: '4', label: 'ex:hasEngine', correctType: 'Individual' }, // deliberate edge case
  { id: '5', label: 'ex:Color', correctType: 'Class' }
];

const dropTargets: RDFType[] = ['Class', 'Individual', 'Literal'];

const CategorizeTermsExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [placedTerms, setPlacedTerms] = useState<Record<string, RDFType>>({});

  const handleDrop = (term: Term, type: RDFType) => {
    setPlacedTerms((prev) => {
      const updated = { ...prev, [term.id]: type };
      // Check if all terms are placed
      if (Object.keys(updated).length === terms.length &&
          terms.every((t) => updated[t.id] === t.correctType)) {
        onComplete();
      }
      return updated;
    });
  };

  return (
      <div style={{ padding: '2rem' }}>
        <h3>Drag each term into the correct category</h3>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          {dropTargets.map((type) => (
            <DropZone
              key={type}
              type={type}
              terms={terms}
              placedTerms={placedTerms}
              onDrop={handleDrop}
            />
          ))}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {terms.map((term) => (
            !placedTerms[term.id] && <DraggableTerm key={term.id} term={term} />
          ))}
        </div>
      </div>
  );
};

const DropZone = ({
  type,
  terms,
  placedTerms,
  onDrop
}: {
  type: RDFType;
  terms: Term[];
  placedTerms: Record<string, RDFType>;
  onDrop: (term: Term, type: RDFType) => void;
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'term',
    drop: (item: Term) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const inside = terms.filter((t) => placedTerms[t.id] === type);

  return (
    <div
      ref={dropRef}
      style={{
        width: 220,
        minHeight: 180,
        padding: '1rem',
        background: isOver ? '#e6f7ff' : '#f5f5f5',
        border: '2px dashed #aaa',
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      <h4>{type}</h4>
      {inside.map((t) => (
        <div key={t.id} style={{ marginTop: '0.5rem' }}>{t.label}</div>
      ))}
    </div>
  );
};

const DraggableTerm = ({ term }: { term: Term }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'term',
    item: term,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={dragRef}
      style={{
        padding: '0.6rem 1rem',
        background: '#00447c',
        color: 'white',
        borderRadius: '6px',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1
      }}
    >
      {term.label}
    </div>
  );
};

export default CategorizeTermsExercise;
