import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        categories: {
          select: {
            slides: {
              select: { id: true }
            }
          }
        },
        progress: {
          where: { userId },
          select: { visitedSlides: true }
        }
      }
    });

    const summary = courses.map(course => {
      const allSlides = course.categories.flatMap(cat => cat.slides);
      const totalSlides = allSlides.length;
      const visited = course.progress[0]?.visitedSlides ?? [];
      const percentComplete = totalSlides > 0
        ? Math.round((visited.length / totalSlides) * 100)
        : 0;

      return {
        id: course.id,
        slug: course.slug,
        title: course.title,
        totalSlides,
        visitedSlides: visited.length,
        percentComplete
      };
    });

    return res.status(200).json(summary);
  } catch (error) {
    console.error("Failed to fetch progress summary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
