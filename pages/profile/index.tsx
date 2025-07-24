import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './UserProfilePage.module.scss';

type QuizResult = {
  slideId: string;
  score: number;
  maxScore: number;
  createdAt: string;
};

const topics = [
  'Knowledge Graph Basics', 'Ontologies', 'SPARQL', 'Reasoning',
  'Modeling Best Practices', 'SaraGraph Tools', 'Query Optimization', 'Advanced Reasoning'
];

const roles = [
  'Ontology Beginner', 'SPARQL Explorer', 'Graph Architect', 'Knowledge Modeler', 'Data Engineer'
];

const achievements = [
  { type: 'Quiz', title: 'Ontology Basics Quiz', completed: true },
  { type: 'Exercise', title: 'Build Your First Triple', completed: false },
  { type: 'Learning Path', title: 'Knowledge Graph Foundations', completed: true }
];

const progress = [
  { area: 'Knowledge Graph Basics', completed: 100 },
  { area: 'Ontologies', completed: 70 },
  { area: 'SPARQL', completed: 40 },
  { area: 'Reasoning', completed: 0 },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [results, setResults] = useState<QuizResult[]>([]);


  useEffect(() => {
    async function fetchResults() {
      const res = await fetch('/api/profile/quiz-results');
      const data = await res.json();
      setResults(data);
    }

    fetchResults();
  }, []);

  if (!session?.user) {
    return <p style={{ padding: '2rem' }}>Please sign in to view your profile.</p>;
  }

  return (
    <div className={styles.profileLayout}>
      <div className={styles.mainColumn}>
        <div className={styles.sectionCard}>
          <div className={styles.headerRow}>
            <h4>Personal information</h4>
          </div>

          <div style={{ display: 'flex' }}>
            {/* Avatar column */}
            <div style={{ flex: '1', padding: '0 2rem' }}>
              <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" width="100%" />
            </div>

            <div style={{ flex: '4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label>Name</label>
                  <div className={styles.textInfo}>{session.user.name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Email</label>
                <div className={styles.textInfo}>{session.user.email}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Roles</label>
                <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {
                    roles.map((role) => (
                      <span key={role} className={styles.badge}>{role}</span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.achievementCard}>
          <h3>Quiz-results</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {results.map((r) => (
            <div
              key={r.slideId + r.createdAt}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem 1.5rem',
                background: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                Course: <code>{r.slide?.category?.course?.title}</code>
              </h3>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                Category: <code>{r.slide?.category?.title}</code>
              </h3>
              <p style={{ margin: '0.5rem 0' }}>
                Score: <strong>{r.score} / {r.maxScore}</strong>
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                Taken: {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        </div>

        <div className={styles.progressCard}>
          <h3>Learning Progress</h3>
          <ul className={styles.progressList}>
            {progress.map((item, index) => (
              <li key={index}>
                <span className={styles.progressTitle}>{item.area}</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.completed}%` }}
                  ></div>
                </div>
                <span className={styles.progressPercent}>{item.completed}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
