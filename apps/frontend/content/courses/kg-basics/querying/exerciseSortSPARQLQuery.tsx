import SPARQLSorterExercise from '@/content/exercises/SPARQL/SPARQLSorterExercise';


export default function ExerciseSortSparqlQuery() {
    return (
        <SPARQLSorterExercise onComplete={() => alert('ontology-tiny completed')} />
    );
}