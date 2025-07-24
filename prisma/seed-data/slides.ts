import { PrismaClient, Course, Category } from '@prisma/client';
import { slideBlueprints } from '../blueprints';

type CourseWithCategories = {
  course: Course;
  categories: Category[];
};

export async function seedSlides(
  prisma: PrismaClient,
  allCategories: CourseWithCategories[]
) {
  for (const { course, categories } of allCategories) {
    const courseSlides = slideBlueprints[course.slug as keyof typeof slideBlueprints];

    if (!courseSlides) continue;

    for (const category of categories) {
      const slides = courseSlides[category.slug as keyof typeof courseSlides];
      if (!slides) continue;

      for (const slide of slides) {
        await prisma.slide.upsert({
          where: {
            slug_categoryId: {
              slug: slide.slug,
              categoryId: category.id,
            },
          },
          update: {},
          create: {
            ...slide,
            categoryId: category.id,
          },
        });
      }
    }
  }
}
