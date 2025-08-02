import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Quiz from '@/components/Quiz/Quiz';

export default function IntroReasoningQuizSlide() {
  const { data: session } = useSession();
  const [quizDone, setQuizDone] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<typeof quizQuestions>([]);

const quizQuestions = [
  {
    id: 'q1',
    question: 'What does reasoning allow a knowledge graph to do?',
    options: [
      'Improve layout performance',
      'Automatically infer new facts from existing ones',
      'Convert RDF to JSON'],
    answer: 'Automatically infer new facts from existing ones',
  },
  {
    id: 'q2',
    question: 'What is OWL?',
    options: ['Ontology Web Language', 'Optional Web Linker', 'Object With Logic'],
    answer: 'Ontology Web Language',
  },
  {
    id: 'q3',
    question: 'Which type of reasoning derives facts with certainty from known facts and logical rules?',
    options: [
      'Abductive Reasoning',
      'Deductive Reasoning',
      'Inductive Reasoning'
    ],
    answer: 'Deductive Reasoning',
  },
  {
    id: 'q4',
    question: 'What does a reasoner infer when it encounters a "SubClassOf" relationship?',
    options: [
      'It finds logical contradictions.',
      'It identifies equivalent classes.',
      'It infers transitive class memberships.'
    ],
    answer: 'It infers transitive class memberships.',
  },
  {
    id: 'q5',
    question: 'Which reasoning strategy is typically used in machine learning to generalize from examples?',
    options: [
      'Deductive Reasoning',
      'Inductive Reasoning',
      'Abductive Reasoning'
    ],
    answer: 'Inductive Reasoning',
  },
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
        slideSlug: 'introReasoningQuiz',
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
