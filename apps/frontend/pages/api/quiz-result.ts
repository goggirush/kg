import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slideSlug, score, maxScore } = req.body;

  if (
    !slideSlug ||
    typeof slideSlug !== 'string' ||
    typeof score !== 'number' ||
    typeof maxScore !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const slide = await prisma.slide.findFirst({
    where: { slug: slideSlug },
  });

  if (!slide) {
    return res.status(404).json({ error: 'Slide not found for given slug' });
  }

  try {
    await prisma.quizResult.create({
      data: {
        userId: session.user.id,
        slideId: slide.id,
        score,
        maxScore,
      },
    });

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('❌ Failed to save quiz result:', e);
    return res.status(500).json({ error: 'Failed to save quiz result' });
  }
}
