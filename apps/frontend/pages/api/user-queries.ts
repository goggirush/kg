import { getServerSession } from "next-auth";
import { authOptions } from './auth/[...nextauth]';
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    // 🔹 GET: fetch user's saved SPARQL queries
    if (req.method === 'GET') {
        try {
            const queries = await prisma.userQuery.findMany({
                where: { userId },
                orderBy: { updatedAt: 'desc' },
            });

            return res.status(200).json(queries);
        } catch (err) {
            console.error("❌ Failed to fetch user queries:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    // 🔹 POST: save or update a query
    if (req.method === 'POST') {
        const { title, query, description } = req.body;

        if (!title || !query) {
            return res.status(400).json({ error: "Missing title or query" });
        }

        try {
            const saved = await prisma.userQuery.upsert({
                where: {
                    userId_title: {
                        userId: session.user.id,
                        title,
                    },
                },
                update: {
                    query,
                    description,
                    updatedAt: new Date(),
                },
                create: {
                    title,
                    query,
                    description,
                    user: {
                        connectOrCreate: {
                            where: { id: session.user.id },
                            create: {
                                id: session.user.id,
                                email: session.user.email,
                                name: session.user.name,
                            },
                        },
                    },
                },
            });

            return res.status(200).json(saved);
        } catch (err) {
            console.error("❌ Failed to save query:", err);
            return res.status(500).json({ error: "Failed to save query" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
