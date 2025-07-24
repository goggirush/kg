import React, { useState } from "react";
import SaraGraph from "../../components/SaraGraph/SaraGraph.tsx"
import {
    checkEdgeCreated,
  } from '../../data/exerciseConditions.tsx';

  const SaraGraphExercise1 = () => {
    const [complete, setComplete] = React.useState(false);
  
    return (
      <>
        <p>Connect the truck to the engine to complete this exercise.</p>
        <SaraGraph
          checkCompletion={checkEdgeCreated}
          onExerciseComplete={() => setComplete(true)}
        />
        {complete && <p>✅ Nice! You created a triple. "Truck v820" - "hasEngine" - "V-engine"</p>}
      </>
    );
  };
  

  export default SaraGraphExercise1