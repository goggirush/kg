import React, { useState } from 'react';
import {
  DndProvider,
  useDrag,
  useDrop,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type LineItem = {
  id: string;
  text: string;
};

const correctOrder: LineItem[] = [
  { id: '1', text: 'PREFIX ex: <http://example.org/>' },
  { id: '2', text: 'SELECT ?movie WHERE {' },
  { id: '3', text: '  ?movie a ex:Movie ;' },
  { id: '4', text: '         ex:releaseYear "2010" .' },
  { id: '5', text: '}' },
];

const SPARQLSorterExercise = ({ onComplete }: { onComplete?: () => void }) => {
  const [lines, setLines] = useState(() => shuffle([...correctOrder]));
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updated = [...lines];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, moved);
    setLines(updated);
  };

  const handleSubmit = () => {
    const isRight = lines.every((line, index) => line.id === correctOrder[index].id);
    setSubmitted(true);
    setIsCorrect(isRight);
    if (isRight) onComplete?.();
  };

  const handleRetry = () => {
    setLines(shuffle([...correctOrder]));
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '2rem', borderRadius: '12px', background: '#f9f9fb' }}>
        <h3>🔀 SPARQL Sorter</h3>
        <p>Drag the lines to form a valid SPARQL query:</p>

        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
          {lines.map((line, index) => (
            <SortableLine
              key={line.id}
              index={index}
              id={line.id}
              text={line.text}
              moveItem={moveItem}
              disabled={submitted}
            />
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '1.5rem',
              padding: '0.6rem 1.2rem',
              background: '#00447c',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Submit
          </button>
        ) : (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontWeight: 600 }}>
              {isCorrect ? '✅ Correct!' : '❌ Not quite. Try again.'}
            </p>
            {!isCorrect && (
              <button
                onClick={handleRetry}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#eee',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                🔁 Retry
              </button>
            )}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

const SortableLine = ({
  id,
  text,
  index,
  moveItem,
  disabled,
}: {
  id: string;
  text: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  disabled: boolean;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'line',
    hover(item: any) {
      if (!ref.current || disabled) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'line',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !disabled,
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        padding: '0.7rem 1rem',
        marginBottom: '0.4rem',
        background: isDragging ? '#dce6ff' : '#f2f4f7',
        border: '1px solid #ccc',
        borderRadius: '6px',
        cursor: disabled ? 'default' : 'grab',
        fontFamily: 'monospace',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {text}
    </div>
  );
};

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default SPARQLSorterExercise;
