import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Quiz from '@/components/Quiz/Quiz';

export default function IntroQuizSlide() {
  const { data: session } = useSession();
  const [quizDone, setQuizDone] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof quizQuestions>([]);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main goal of using knowledge graphs at Scania?',
      options: [
        'To replace vehicle databases',
        'To link data across different systems and departments',
        'To visualize truck engine parts',
      ],
      answer: 'To link data across different systems and departments',
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a benefit of using knowledge graphs?',
      options: [
        'They help link disconnected data',
        'They remove the need for any data model',
        'They allow smart querying of complex relationships',
      ],
      answer: 'They remove the need for any data model',
    },
    {
      id: 'q3',
      question: 'Which challenge does a knowledge graph help solve at Scania?',
      options: [
        'High fuel costs',
        'Vehicle production delays',
        'Disconnected data across teams and tools',
      ],
      answer: 'Disconnected data across teams and tools',
    },
    {
      id: 'q4',
      question: 'Why are knowledge graphs useful for diagnostics teams?',
      options: [
        'They reduce the need for maintenance',
        'They provide direct answers by linking relevant data',
        'They improve the battery life of trucks',
      ],
      answer: 'They provide direct answers by linking relevant data',
    },
    {
      id: 'q5',
      question: 'Which of these best describes a knowledge graph?',
      options: [
        'A type of spreadsheet for tracking trucks',
        'A network of linked facts structured as subject–predicate–object triples',
        'A database for storing vehicle manuals',
      ],
      answer: 'A network of linked facts structured as subject–predicate–object triples',
    },
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
        slideSlug: 'introQuiz',
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
