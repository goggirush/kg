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
    question: 'What is the basic structure used in knowledge graphs?',
    options: ['Tables and columns', 'Triples: subject, predicate, object', 'Charts and dashboards'],
    answer: 'Triples: subject, predicate, object',
  },
  {
    id: 'q2',
    question: 'What does a predicate in a triple represent?',
    options: ['The main entity', 'The relationship between subject and object', 'A visual element in a graph'],
    answer: 'The relationship between subject and object',
  },
  {
    id: 'q3',
    question: 'Why are knowledge graphs useful in large organizations like Scania?',
    options: [
      'They improve image resolution in vehicle sensors',
      'They help organize and connect complex data across domains',
      'They create charts automatically from spreadsheets'
    ],
    answer: 'They help organize and connect complex data across domains',
  },
  {
    id: 'q4',
    question: 'What role does an ontology play in a knowledge graph?',
    options: [
      'It stores raw sensor data from vehicles',
      'It defines the types, relationships, and rules within the graph',
      'It controls the visual style of the graph'
    ],
    answer: 'It defines the types, relationships, and rules within the graph',
  },
  {
    id: 'q5',
    question: 'What makes relationships in knowledge graphs special?',
    options: [
      'They are optional and only used for visual grouping',
      'They are stored separately and not connected to the data',
      'They are first-class data that can be queried and reasoned over'
    ],
    answer: 'They are first-class data that can be queried and reasoned over',
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
        slideSlug: 'introKnowledgeGraphsQuiz',
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
