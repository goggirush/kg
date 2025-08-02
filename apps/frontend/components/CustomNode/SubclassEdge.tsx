import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

const SubclassEdge = ({ id, sourceX, sourceY, targetX, targetY, data, label }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: 'grey',
          strokeWidth: 2,
          strokeDasharray: '6 4',
          opacity: 0.9,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            color: 'grey',
            background: 'white',
            padding: '2px 6px',
            borderRadius: 4,
            border: '1px solid grey',
            fontWeight: 600,
          }}
          className="nodrag nopan"
        >
          {'subClassOf'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default SubclassEdge;
