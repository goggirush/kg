import { PrismaClient } from '@prisma/client';
import { seedCourses } from './courses';
import { seedCategories } from './categories';
import { seedSlides } from './slides';
import { seedExampleQueries } from './exampleQueries';

export async function seedAll(prisma: PrismaClient) {
  // Clean up before seeding
  await prisma.userProgress.deleteMany();
  await prisma.quizResult.deleteMany();
  await prisma.slideProgress.deleteMany();
  await prisma.slide.deleteMany();
  await prisma.category.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  await prisma.exampleQuery.deleteMany();

  const courses = await seedCourses(prisma);
  const categories = await seedCategories(prisma, courses);
  await seedSlides(prisma, categories);
  await seedExampleQueries(prisma);
}
