import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { prisma } from '@/lib/prisma';

import Hero from '@/components/Hero/Hero';
import ToolSection from '@/components/ToolSection/ToolSection';
import Features from '@/components/Features/Features';
import CoursePreviewCard from '@/components/Card/CoursePreviewCard';
import Modal from '@/components/Modal/Modal';
import CourseDetailedInfo from '@/components/CourseDetailedInfo/CourseDetailedInfo';

import styles from './Home.module.scss';

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  difficulty: string;
  percentageCompleted?: number;
  slideGroups?: string[];
};

type HomeProps = {
  courses: Course[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const coursesFromDB = await prisma.course.findMany({
    orderBy: { title: 'asc' },
  });

  const courses = coursesFromDB.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description || '',
    category: course.genre,
    difficulty: course.difficulty,
    imageUrl: course.metaImageUrl,
    percentageCompleted: 0,
    slideGroups: [],
  }));

  return {
    props: { courses },
  };
};

export default function Home({ courses: initialCourses }: HomeProps) {
  const router = useRouter();
  const [modalCourseId, setModalCourseId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const openModal = (id: string) => setModalCourseId(id);
  const closeModal = () => setModalCourseId(null);

  const selectedCourse = courses.find((course) => course.id === modalCourseId);

  // ✅ Fetch user progress summary client-side on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress/summary');
        if (!res.ok) return;

        const progressSummary: {
          id: string;
          percentComplete: number;
        }[] = await res.json();

        const updated = initialCourses.map((course) => {
          const match = progressSummary.find((p) => p.id === course.id);
          return {
            ...course,
            percentageCompleted: match?.percentComplete ?? 0,
          };
        });

        setCourses(updated);
      } catch (err) {
        console.error('Failed to load progress summary:', err);
      }
    };

    fetchProgress();
  }, [initialCourses]);

  return (
    <>
      <Hero />

      <div style={{ margin: '20px 0px' }}>
        <h2 style={{
          textAlign: 'center',
          color: '#2e5a86',
          textDecoration: 'underline',
          textUnderlineOffset: '10px',
          marginBottom: '15px'
        }}>
          Popular courses
        </h2>
        <p style={{
          color: '#2e5a86',
          marginBottom: '25px',
          marginTop: '0',
          textAlign: 'center'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta aperiam sapiente enim accusamus aspernatur rem id.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {courses.slice(0, 3).map((course) => (
            <CoursePreviewCard
              key={course.id}
              onClick={() => router.push(`/courses/${course.slug}`)}
              onReadMore={() => openModal(course.id)}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              category={course.category}
              difficulty={course.difficulty}
              percentageCompleted={course.percentageCompleted}
            />
          ))}
        </div>

        <Modal isOpen={!!modalCourseId} onRequestClose={closeModal}>
          {selectedCourse && (
            <CourseDetailedInfo
              title={selectedCourse.title}
              description={selectedCourse.description}
              imageUrl={selectedCourse.imageUrl}
              category={selectedCourse.category}
              difficulty={selectedCourse.difficulty}
              percentageCompleted={selectedCourse.percentageCompleted}
              slidesTitles={selectedCourse.slideGroups}
              onStart={() => router.push(`/courses/${selectedCourse.slug}`)}
            />
          )}
        </Modal>
      </div>

      <ToolSection />

      <section className={styles.featureHighlightSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            A perfect place to start your knowledge graph journey.
          </h2>
          <p className={styles.sectionSubtitle}>
            Our platform combines interactive tools and guided learning to help you understand and apply knowledge graphs with confidence — whether you're just getting started or looking to deepen your skills.
          </p>

          <div className={styles.featureGrid}>
            {[
              ['Guided Learning Paths', 'Choose curated content based on your role, pace, and goals.'],
              ['Hands-On Playground', 'Run SPARQL queries, explore sample data, and test ideas instantly.'],
              ['Real-World Use Cases', 'Learn from examples in logistics, healthcare, AI, and more.'],
              ['Interactive Quizzes', 'Reinforce concepts with quick checks and feedback as you go.'],
              ['No Setup Required', 'Start learning without needing to install or configure tools.'],
              ['Built-in Glossary', 'Quickly look up terms and concepts as you explore the content.'],
              ['Visual Ontology Editor', 'Create, connect, and explore knowledge graph structures visually.'],
              ['Custom Learning Profiles', 'Track your progress and adapt your learning experience.']
            ].map(([title, desc]) => (
              <div key={title} className={styles.featureItem}>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}
