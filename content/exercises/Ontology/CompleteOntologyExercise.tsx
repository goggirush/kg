import React, { useState, useRef } from 'react';
import Button from '@../../components/Button/Button.tsx';

const nodes = [
  { id: 'truck', label: 'Truck', cx: 60, cy: 60, color: '#3f51b5', type: 'class' },
  { id: 'engine', label: 'Engine', cx: 260, cy: 60, color: '#3f51b5', type: 'class' },
  { id: 'truck123', label: 'Truck123', cx: 60, cy: 200, color: '#ff9800', type: 'individual' },
  { id: 'enginex', label: 'EngineX', cx: 260, cy: 200, color: '#ff9800', type: 'individual' }
];

const expectedConnections = [
  { from: 'truck123', to: 'truck', label: 'rdf:type' },
  { from: 'enginex', to: 'engine', label: 'rdf:type' },
  { from: 'truck123', to: 'enginex', label: 'hasEngine' }
];

const CompleteOntologyExercise = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<{ from: string; to: string; label?: string }[]>([]);
  const [drawing, setDrawing] = useState<{ from: string; x: number; y: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getArrowLabel = (from: string, to: string): string => {
    const match = expectedConnections.find(ec => ec.from === from && ec.to === to);
    return match?.label || '';
  };

  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setDrawing({ from: nodeId, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = (targetId: string) => {
    if (drawing && drawing.from !== targetId) {
      const label = getArrowLabel(drawing.from, targetId);
      setLines(prev => [...prev, { from: drawing.from, to: targetId, label }]);
    }
    setDrawing(null);
  };

  const handleSubmit = () => {
    const fb: Record<string, boolean> = {};
    expectedConnections.forEach(exp => {
      const key = `${exp.from}-${exp.to}`;
      const match = lines.find(line => line.from === exp.from && line.to === exp.to);
      fb[key] = !!match;
    });
    setFeedback(fb);
    setSubmitted(true);

    const allCorrect = Object.values(fb).every(val => val);
    if (allCorrect) onComplete();
  };

  const handleRetry = () => {
    setLines([]);
    setDrawing(null);
    setSubmitted(false);
    setFeedback({});
  };

  return (
    <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
      <h3>Visual Ontology Exercise</h3>
      <p>Drag arrows between concepts to reflect the correct ontology structure:</p>
      <ul style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.85rem', textAlign: 'left' }}>
        <li>Truck123 → Truck <code>rdf:type</code></li>
        <li>EngineX → Engine <code>rdf:type</code></li>
        <li>Truck123 → EngineX <code>hasEngine</code></li>
      </ul>

      <svg ref={svgRef} width="100%" height="300px" style={{ border: '1px solid #ccc', userSelect: 'none' }}>
        {/* Hint lines (shown only before submission) */}
        {!submitted && expectedConnections.map((line, index) => {
          const from = nodes.find(n => n.id === line.from);
          const to = nodes.find(n => n.id === line.to);
          const midX = (from!.cx + to!.cx) / 2;
          const midY = (from!.cy + to!.cy) / 2;
          return (
            <g key={`hint-${index}`}>
              <line
                x1={from!.cx}
                y1={from!.cy}
                x2={to!.cx}
                y2={to!.cy}
                stroke="#ccc"
                strokeDasharray="4"
              />
              <text x={midX} y={midY - 8} textAnchor="middle" fontSize="10" fill="#bbb">?</text>
            </g>
          );
        })}

        {/* User lines */}
        {lines.map((line, index) => {
          const from = nodes.find(n => n.id === line.from)!;
          const to = nodes.find(n => n.id === line.to)!;
          const midX = (from.cx + to.cx) / 2;
          const midY = (from.cy + to.cy) / 2;
          const key = `${line.from}-${line.to}`;
          const isCorrect = feedback[key];
          return (
            <g key={index}>
              <line
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={submitted ? (isCorrect ? 'green' : 'red') : '#999'}
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
              {line.label && (
                <text x={midX} y={midY - 6} textAnchor="middle" fontSize="12" fill="#333" fontWeight={500}>
                  {line.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Drag line in progress */}
        {drawing && (
          <line
            x1={nodes.find(n => n.id === drawing.from)?.cx}
            y1={nodes.find(n => n.id === drawing.from)?.cy}
            x2={drawing.x}
            y2={drawing.y}
            stroke="#666"
            strokeDasharray="4"
          />
        )}

        {/* Render nodes */}
        {nodes.map(node => (
          <g
            key={node.id}
            onMouseDown={(e) => handleMouseDown(node.id, e)}
            onMouseUp={() => handleMouseUp(node.id)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {node.type === 'class' ? (
              <rect x={node.cx - 36} y={node.cy - 36} width={72} height={72} rx={12} fill={node.color} />
            ) : (
              <circle cx={node.cx} cy={node.cy} r="36" fill={node.color} />
            )}
            <text
              x={node.cx}
              y={node.cy + 5}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight={600}
            >
              {node.label}
            </text>
          </g>
        ))}

        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#999" />
          </marker>
        </defs>
      </svg>

      {!submitted && <Button text="Submit" onClick={handleSubmit} />}

      {submitted && (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 600 }}>
            {Object.values(feedback).every(Boolean) ? '✅ All connections correct!' : '❌ Some connections are incorrect.'}
          </p>
          {!Object.values(feedback).every(Boolean) && <Button text="Retry" onClick={handleRetry} />}
        </div>
      )}
    </div>
  );
};

export default CompleteOntologyExercise;
