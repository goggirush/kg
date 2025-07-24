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
    question: 'What is an ontology in the context of knowledge graphs?',
    options: [
      'A type of graph visualization',
      'A set of rules and concepts that define how data is structured',
      'A backup file of a graph database'
    ],
    answer: 'A set of rules and concepts that define how data is structured',
  },
  {
    id: 'q2',
    question: 'Which of these is typically defined in an ontology?',
    options: [
      'How fast a vehicle can go',
      'Which datasets are publicly available',
      'Classes, relationships, and properties between concepts'
    ],
    answer: 'Classes, relationships, and properties between concepts',
  },
  {
    id: 'q3',
    question: 'Why are ontologies important in knowledge graphs?',
    options: [
      'They improve the visual design of the graph',
      'They ensure consistency and allow reasoning over data',
      'They help render graphs faster'
    ],
    answer: 'They ensure consistency and allow reasoning over data',
  },
  {
    id: 'q4',
    question: 'In an ontology, what is a "class"?',
    options: [
      'A type of SPARQL query',
      'A category or type of thing, like "Vehicle" or "Person"',
      'A group of database indexes'
    ],
    answer: 'A category or type of thing, like "Vehicle" or "Person"',
  },
  {
    id: 'q5',
    question: 'What does an ontology typically define about properties?',
    options: [
      'How properties should be stored in JSON',
      'Which color a property should be in the UI',
      'What type of value a property should point to (e.g. a number, a class)'
    ],
    answer: 'What type of value a property should point to (e.g. a number, a class)',
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
        slideSlug: 'introOntologyQuiz',
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
