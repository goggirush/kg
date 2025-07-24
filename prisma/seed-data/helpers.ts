import { PrismaClient, Prisma } from '@prisma/client';

export async function getOrCreateCategory(
  prisma: PrismaClient,
  courseId: string,
  slug: string,
  title: string,
  order: number
) {
  const where: Prisma.CategoryWhereUniqueInput = {
    slug_courseId: {
      slug,
      courseId,
    },
  };

  return prisma.category.upsert({
    where,
    update: {},
    create: {
      title,
      slug,
      order,
      courseId,
    },
  });
}
