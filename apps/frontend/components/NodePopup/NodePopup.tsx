import React from 'react';

interface NodePopupProps {
  onClose: () => void;
  data: any; 
}

const NodePopup: React.FC<NodePopupProps> = ({ onClose, data }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100%',     // ⬆️ position above the button
        left: '100%',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: '4px 0',
        zIndex: 100,
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        fontSize: '13px',
        minWidth: '120px',
      }}
      onMouseLeave={onClose}
    >
      <div style={{ padding: '6px 12px', color: '#aaa' }}>
        {data.nodeType === 'class' &&
          <div>Create individual</div>
        }
        <div>Expand/Collapse</div>
        <div>Inspect</div>
      </div>
    </div>
  );
};

export default NodePopup;
