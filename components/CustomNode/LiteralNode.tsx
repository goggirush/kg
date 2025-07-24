import React, { useState, useEffect, useRef } from 'react';
import { NodeProps, Handle, Position } from '@xyflow/react';
import NodePopup from '../NodePopup/NodePopup.tsx';
import { useGraphUI } from '../../state/useGraphUI.ts';

const LiteralNode = ({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setLabel(data.label);
  }, [data.label]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (label !== data.label) {
      data.onLabelChange?.(id, label);
    }
    setIsEditing(false);
  };

  const handleDoubleClick = () => setIsEditing(true);

  return (
    <div onDoubleClick={handleDoubleClick}
      style={{
        color: '#222',
        minHeight: '40px',
        minWidth: '120px',
        borderRadius: '20px 0px',
        background: '#e6f7e6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `2px solid ${data.isUnconnected ? 'coral' : '#ccc'}`, // ✅ yellow/orange border

      }}>
      {data?.isParentClass && (
        <div
          style={{
            position: 'absolute',
            fontSize: '24px',
            top: '-30px',
            left: 'calc(50% - 16px)',
            zIndex: 10,
          }}
        >
          👑
        </div>
      )}
      <Handle type="target" position={Position.Left} id="target" />
      {isEditing ? (
        <input
          ref={inputRef}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleBlur();
          }}
          style={{
            fontSize: '14px',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '2px 4px',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <div>
          <div style={{ padding: '4px', textAlign: 'center' }}>
            {label}
          </div>
          {/*
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'grey',
              background: 'none',
              border: 'none',
              fontSize: '10px',
              cursor: 'pointer',
            }}
            aria-label="Open node menu"
          >
            ☰
          </button>
          */}

          {showMenu && <NodePopup data={data} parentId={id} onClose={() => setShowMenu(false)} />}
        </div>
      )}
    </div>
  );
};

export default LiteralNode;
