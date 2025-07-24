import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '../../components/Button/Button.tsx';

type Term = {
    id: string;
    label: string;
    definition: string;
};

const terms: Term[] = [
    {
        id: 'triple',
        label: 'Triple',
        definition: 'A statement consisting of subject, predicate, and object.',
    },
    {
        id: 'ontology',
        label: 'Ontology',
        definition: 'A structured representation of concepts and relationships.',
    },
    {
        id: 'literal',
        label: 'Literal',
        definition: 'A value such as a string, number, or date.',
    },
];

const MatchConceptsExercise = ({ onComplete }: { onComplete: () => void }) => {
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [feedbackShown, setFeedbackShown] = useState(false);

    const handleDrop = (targetId: string, draggedLabel: string) => {
        setMatches((prev) => {
            const updated = { ...prev, [targetId]: draggedLabel };
            if (
                Object.keys(updated).length === terms.length &&
                terms.every((t) => updated[t.id] === t.label)
            ) {
                setFeedbackShown(true);
                onComplete();
            }
            return updated;
        });
    };

    const handleRetry = () => {
        setMatches({});
        setFeedbackShown(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ padding: '2rem' }}>
                <h3>Match each term to its definition</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                    {terms.map((term) => (
                        <DefinitionDropBox
                            key={term.id}
                            termId={term.id}
                            definition={term.definition}
                            droppedLabel={matches[term.id]}
                            onDrop={handleDrop}
                        />
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {terms.map((term) =>
                        !Object.values(matches).includes(term.label) ? (
                            <DraggableTerm key={term.label} label={term.label} />
                        ) : null
                    )}
                </div>

                {Object.keys(matches).length === terms.length && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        {terms.every((t) => matches[t.id] === t.label) ? (
                            <div style={{ fontWeight: 600, color: 'green', marginBottom: '1rem' }}>
                                ✅ All matched correctly!
                            </div>
                        ) : (
                            <div style={{ fontWeight: 600, color: 'red', marginBottom: '1rem' }}>
                                Not quite — try again!
                            </div>
                        )}
                        <Button text="Retry" onClick={handleRetry} />
                    </div>
                )}
            </div>
        </DndProvider>
    );
};

const DefinitionDropBox = ({
    termId,
    definition,
    droppedLabel,
    onDrop,
}: {
    termId: string;
    definition: string;
    droppedLabel?: string;
    onDrop: (id: string, label: string) => void;
}) => {
    const [{ isOver }, dropRef] = useDrop({
        accept: 'term',
        drop: (item: { label: string }) => onDrop(termId, item.label),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={dropRef}
            style={{
                padding: '1rem',
                border: '2px dashed #aaa',
                borderRadius: '10px',
                backgroundColor: isOver ? '#f0f8ff' : '#fff',
                minHeight: '60px',
            }}
        >
            <strong>{definition}</strong>
            <div style={{ marginTop: '0.5rem', color: '#3f4693' }}>
                {droppedLabel ? <em>{droppedLabel}</em> : <span style={{ color: '#999' }}>Drop term here</span>}
            </div>
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

export default MatchConceptsExercise;
