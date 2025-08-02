// pages/api/example-queries.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const queries = await prisma.exampleQuery.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        query: true,
        createdAt: true,
      },
    });

    return res.status(200).json(queries);
  } catch (error) {
    console.error('❌ Failed to fetch example queries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
