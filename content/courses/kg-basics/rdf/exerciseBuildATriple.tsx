import TripleBuilderExercise from '@/content/exercises/DragAndDrop/TripleBuilderExercise';

export default function exerciseBuildATripleExercise() {
    return (
      <TripleBuilderExercise onComplete={() => console.log("test")} />

    );
}