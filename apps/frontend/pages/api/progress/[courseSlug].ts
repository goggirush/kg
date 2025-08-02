import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const courseSlug = req.query.courseSlug as string;
  const userId = session.user.id;

  // 1. Lookup course by slug
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    select: { id: true },
  });

  if (!course) {
    return res.status(404).json({ error: `Course '${courseSlug}' not found.` });
  }

  const courseId = course.id;

  if (req.method === "POST") {
    const { visitedSlides, lastVisitedSlide } = req.body;

    if (!Array.isArray(visitedSlides) || !lastVisitedSlide?.categorySlug || !lastVisitedSlide?.slideSlug) {
      return res.status(400).json({ error: "Missing or invalid progress data" });
    }

    try {
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        update: {
          visitedSlides,
          lastCategorySlug: lastVisitedSlide.categorySlug,
          lastSlideSlug: lastVisitedSlide.slideSlug,
        },
        create: {
          user: {
            connectOrCreate: {
              where: { id: userId },
              create: {
                id: userId,
                email: session.user.email,
                name: session.user.name,
              },
            },
          },
          course: {
            connect: { id: courseId },
          },
          visitedSlides,
          lastCategorySlug: lastVisitedSlide.categorySlug,
          lastSlideSlug: lastVisitedSlide.slideSlug,
        },
      });

      return res.status(200).json({ ok: true, progress });
    } catch (err) {
      console.error("Progress upsert failed:", err);
      return res.status(500).json({ error: "Failed to update progress" });
    }
  }

  if (req.method === "GET") {
    try {
      const progress = await prisma.userProgress.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      return res.status(200).json(progress);
    } catch (err) {
      console.error("Progress fetch failed:", err);
      return res.status(500).json({ error: "Failed to fetch progress" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
