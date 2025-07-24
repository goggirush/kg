import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Quiz from '@/components/Quiz/Quiz';

export default function IntroOntologyQuizSlide() {
  const { data: session } = useSession();
  const [quizDone, setQuizDone] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof quizQuestions>([]);

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is SPARQL primarily used for?',
    options: [
      'Styling user interfaces',
      'Querying data in a knowledge graph',
      'Compressing RDF files'],
    answer: 'Querying data in a knowledge graph',
  },
  {
    id: 'q2',
    question: 'Which keyword starts a basic SPARQL query?',
    options: ['FIND', 'SELECT', 'MATCH'],
    answer: 'SELECT',
  },
  {
    id: 'q3',
    question: 'What does the WHERE clause in SPARQL do?',
    options: [
      'It filters HTML elements',
      'It defines graph structure patterns to match',
      'It limits the number of results'],
    answer: 'It defines graph structure patterns to match',
  },
  {
    id: 'q4',
    question: 'In SPARQL, what does a question mark before a name (e.g., ?truck) indicate?',
    options: [
      'It marks a literal value',
      'It identifies a comment',
      'It defines a variable to match in the graph'
    ],
    answer: 'It defines a variable to match in the graph',
  },
  {
    id: 'q5',
    question: 'What kind of data does SPARQL work with?',
    options: [
      'Relational tables with columns',
      'Graph data based on triples (subject, predicate, object)',
      'CSV spreadsheets',
    ],
    answer: 'Graph data based on triples (subject, predicate, object)',
  }
];

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 5));
  }, []);

  async function handleQuizComplete(score: number) {
    const maxScore = selectedQuestions.length;

    const res = await fetch('/api/quiz-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slideSlug: 'introQueryingQuiz',
        score,
        maxScore
      })
    });

    if (res.ok) {
      console.log(`✅ Result saved: ${score}/${maxScore}`);
      setQuizDone(true);
    } else {
      console.error('❌ Failed to save quiz result');
    }
  }
  return selectedQuestions.length > 0 ? (
    <Quiz
      questions={selectedQuestions}
      onCompleteQuiz={handleQuizComplete}
    />
  ) : (
    <p>Loading quiz...</p>
  );
}
