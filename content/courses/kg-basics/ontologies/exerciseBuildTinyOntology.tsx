import CompleteOntologyExercise from '@/content/exercises/Ontology/CompleteOntologyExercise';


export default function ExerciseBuildTinyOntology() {
    return (
        <CompleteOntologyExercise onComplete={() => alert('ontology-tiny completed')} />
    );
}