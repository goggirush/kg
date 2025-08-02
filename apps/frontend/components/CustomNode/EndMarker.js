const EndMarker = () => {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <marker
          id="end-marker"
          markerWidth="6"
          markerHeight="6"
          viewBox="-3 -3 6 6"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
          refX="0"
          refY="0"
        >
          <polyline
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            points="-2,-2 0,0 -2,2 -2,-2"
          />
        </marker>
      </defs>
    </svg>
  );
};

export default EndMarker;
