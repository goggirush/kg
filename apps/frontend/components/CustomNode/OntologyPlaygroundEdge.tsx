
import React, { useState, useRef, useEffect } from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';

// Utility: Darken and saturate hex color
const enhanceColor = (hex: string, darken = 12, saturate = 15) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const [h, s, l] = rgbToHsl(r, g, b);
  const newS = Math.min(s + saturate, 100);
  const newL = Math.max(l - darken, 0);

  const [rr, gg, bb] = hslToRgb(h, newS, newL);
  return `rgb(${rr}, ${gg}, ${bb})`;
};

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }

  return [h, s * 100, l * 100];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

const OntologyPlaygroundEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
}: EdgeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(label || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const fromColor = enhanceColor(data?.sourceColor || '#007BFF');
  const toColor = enhanceColor(data?.targetColor || '#28A745');

  const gradientId = `gradient-${id}`;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    data?.onLabelChange?.(id, text);
    setIsEditing(false);
  };

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
          <marker
            id="end-marker"
            markerWidth="16"
            markerHeight="16"
            viewBox="-10 -10 20 20"
            markerUnits="strokeWidth"
            orient="auto-start-reverse"
            refX="1"
            refY="0"
          >
            <polyline
              stroke="rgba(0,0,0,0.75)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        </defs>
      </svg>

      {/* Outline path (no marker) */}
      <path
        id={`${id}-outline`}
        d={edgePath}
        style={{
          stroke: 'grey',
          strokeWidth: 4,
          fill: 'none',
        }}
      />

      {/* Colored gradient path (with marker) */}
      <path
        id={id}
        d={edgePath}
        markerEnd="url(#end-marker)"
        style={{
    stroke: data?.inferred ? 'gold' : `url(#${gradientId})`,
    strokeWidth: 3,
    strokeDasharray: data?.inferred ? '4 2' : 'none',
    fill: 'none',
    opacity: data?.inferred ? 1 : 1,
  }}
      />

      <foreignObject
        width={120}
        height={40}
        x={labelX - 60}
        y={labelY - 20}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleBlur();
              }}
              style={{
                fontSize: '12px',
                padding: '2px 4px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '100px',
              }}
            />
          ) : (
            <div
              onDoubleClick={() => setIsEditing(true)}
              style={{
                background: 'white',
                padding: '2px 6px',
                border: '1px solid #999',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {text}
            </div>
          )}
        </div>
      </foreignObject>
    </>
  );
};

export default OntologyPlaygroundEdge;
