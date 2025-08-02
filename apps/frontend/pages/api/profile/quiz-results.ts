import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const results = await prisma.quizResult.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      slide: {
        select: {
          slug: true,
          title: true,
          category: {
            select: {
              title: true,
              slug: true,
              course: {
                select: {
                  title: true
                }
              }
            }
          }
        }
      }
    }
  });

  return res.status(200).json(results);
}
