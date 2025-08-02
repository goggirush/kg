import { GetServerSideProps } from 'next';
import { prisma } from '@/lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          slides: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!course || course.categories.length === 0) {
    return { notFound: true };
  }

  const firstCategory = course.categories[0];
  const firstSlide = firstCategory.slides[0];

  if (!firstSlide) {
    return { notFound: true };
  }

  return {
    redirect: {
      destination: `/courses/${slug}/${firstCategory.slug}/${firstSlide.slug}`,
      permanent: false
    }
  };
};

export default function CourseIndexRedirect() {
  return null; // This page never renders because it always redirects
}
