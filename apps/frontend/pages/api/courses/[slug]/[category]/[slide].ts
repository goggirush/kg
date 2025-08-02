import { prisma } from "@/lib/prisma"; // adjust path if needed
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, category, slide } = req.query;

  if (!slug || !category || !slide) return res.status(400).json({ error: "Missing params" });

  const data = await prisma.course.findUnique({
    where: { slug: slug as string },
    include: {
      categories: {
        where: { slug: category as string },
        include: {
          slides: {
            where: { slug: slide as string }
          }
        }
      }
    }
  });

  if (!data) return res.status(404).json({ error: "Course or slide not found" });

  const slideData = data.categories[0]?.slides[0];
  if (!slideData) return res.status(404).json({ error: "Slide not found" });

  res.status(200).json({
    courseTitle: data.title,
    categoryTitle: data.categories[0].title,
    slide: slideData
  });
}
