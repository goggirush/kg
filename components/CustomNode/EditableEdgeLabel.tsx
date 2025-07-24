import React from 'react';

interface EditableEdgeLabelProps {
  value: string;
  onChange: (newValue: string) => void;
}

const commonLabels = [
  'subClassOf',
  'relatedTo',
  'hasPart',
  'is_a',
  'disjointWith',
];

const EditableEdgeLabel: React.FC<EditableEdgeLabelProps> = ({ value, onChange }) => {
  return (
    <div style={{ width: '130px' }}>
      <input
        type="text"
        list="edge-label-options"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or select label"
        style={{
          width: '100%',
          fontSize: '12px',
          padding: '4px 0px 4px ',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <datalist id="edge-label-options">
        {commonLabels.map((label) => (
          <option key={label} value={label} />
        ))}
      </datalist>
    </div>
  );
};

export default EditableEdgeLabel;
