import OntologyBuilderExercise from '@/content/exercises/Ontology/OntologyBuilderExercise';


export default function ExerciseBuildOntologyStatement() {
    return (
        <OntologyBuilderExercise onComplete={() => alert('ontology-statement completed')} />
    );
}