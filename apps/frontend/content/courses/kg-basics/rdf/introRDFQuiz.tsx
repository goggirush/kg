import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Quiz from '@/components/Quiz/Quiz';

export default function IntroRDFQuizSlide() {
  const { data: session } = useSession();
  const [quizDone, setQuizDone] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof quizQuestions>([]);

  const quizQuestions = [
  {
    id: 'q1',
    question: 'What does RDF stand for?',
    options: ['Raw Data Format', 'Resource Description Framework', 'Relational Data Formula'],
    answer: 'Resource Description Framework',
  },
  {
    id: 'q2',
    question: 'What is the basic unit of data in RDF?',
    options: ['Row', 'Triple', 'Table'],
    answer: 'Triple',
  },
  {
    id: 'q3',
    question: 'Which of these is an example of a URI?',
    options: ['Truck123', 'http://example.org/Truck123', 'EngineX'],
    answer: 'http://example.org/Truck123',
  },
  {
    id: 'q4',
    question: 'What is a CURIE in RDF?',
    options: [
      'A type of RDF file format',
      'A compressed URI using a prefix',
      'A query language for RDF data'
    ],
    answer: 'A compressed URI using a prefix',
  },
  {
    id: 'q5',
    question: 'What is the purpose of a namespace in RDF?',
    options: [
      'To define the data format',
      'To group related literals',
      'To provide a unique context for resource identifiers'
    ],
    answer: 'To provide a unique context for resource identifiers',
  }
];

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    console.log('Current user ID:', session?.user?.id);
  }, [session]);

  async function handleQuizComplete(score: number) {
    const maxScore = selectedQuestions.length;

    const res = await fetch('/api/quiz-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slideSlug: 'introRDFQuiz',
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
