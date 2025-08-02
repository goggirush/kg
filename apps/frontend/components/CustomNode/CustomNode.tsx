import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './CustomNode.module.scss';

function CustomNode({ data, type }) {
  return (
    <>
      <div className={`${styles.container} ${styles[type]}`}>
        {data.label}
      </div>

      <Handle
        type="target"
        position={data.targetPosition || 'left'}
      />

      {type !== 'literal' && (
        <Handle
          type="source"
          position={data.sourcePosition || 'right'}
        />
      )}
    </>
  );
}

export default CustomNode;
