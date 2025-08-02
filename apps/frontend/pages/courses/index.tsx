import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { prisma } from '@/lib/prisma';
import styles from './CoursesPage.module.scss';
import CoursePreviewCard from '@/components/Card/CoursePreviewCard';
import CourseDetailedInfo from '@/components/CourseDetailedInfo/CourseDetailedInfo';
import Modal from '@/components/Modal/Modal';

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  imageUrl?: string;
  percentageCompleted?: number;
  slideGroups?: string[];
};

type CoursesPageProps = {
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
    props: {
      courses,
    },
  };
};

export default function CoursesPage({ courses }: CoursesPageProps) {
  const router = useRouter();
  const [modalCourseId, setModalCourseId] = useState<string | null>(null);
  const [coursesWithProgress, setCoursesWithProgress] = useState<Course[]>(courses);

  // 🧠 Fetch user progress on mount
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress/summary');
        if (!res.ok) return;

        const progressData: {
          id: string;
          percentComplete: number;
        }[] = await res.json();

        const updated = courses.map((course) => {
          const match = progressData.find((p) => p.id === course.id);
          return {
            ...course,
            percentageCompleted: match?.percentComplete ?? 0,
          };
        });

        setCoursesWithProgress(updated);
      } catch (err) {
        console.error('Failed to fetch course progress:', err);
      }
    };

    fetchProgress();
  }, [courses]);

  const openModal = (id: string) => setModalCourseId(id);
  const closeModal = () => setModalCourseId(null);

  const selectedCourse = coursesWithProgress.find((c) => c.id === modalCourseId);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.courseList}>
        {coursesWithProgress.length > 0 ? (
          coursesWithProgress.map((course) => (
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
          ))
        ) : (
          <p>No courses found.</p>
        )}
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
  );
}
