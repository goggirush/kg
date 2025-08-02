import { PrismaClient } from '@prisma/client';

const courseData = [
    {
        slug: 'kg-basics',
        title: 'Knowledge Graph Basics',
        description: 'Learn the fundamentals of knowledge graphs and how they\'re used at Scania.',
        timeToComplete: '90 minutes',
        difficulty: 'Beginner',
        genre: 'Data Architecture',
        metaImageUrl: '/images/courses/kg-basics/cover.png',
    },
    {
        slug: 'sparql-fundamentals',
        title: 'SPARQL Fundamentals',
        description: 'Query knowledge graphs using SPARQL, the RDF query language.',
        timeToComplete: '60 minutes',
        difficulty: 'Beginner',
        genre: 'Query Languages',
        metaImageUrl: '/images/courses/course_placeholder.png',
    },
    {
        slug: 'continuous-sparql',
        title: 'Continuous SPARQL',
        description: 'Understand the basics of the Web Ontology Language and how to model rich data structures.',
        timeToComplete: '1 hour',
        difficulty: 'Intermediate',
        genre: 'Query Languages',
        metaImageUrl: '/images/courses/course_placeholder.png',
    },
    {
        slug: 'advanced-sparql',
        title: 'Advanced SPARQL',
        description: 'Understand the basics of the Web Ontology Language and how to model rich data structures.',
        timeToComplete: '1 hour',
        difficulty: 'Advanced',
        genre: 'Query Languages',
        metaImageUrl: '/images/courses/course_placeholder.png',
    },
];

export async function seedCourses(prisma: PrismaClient) {
    const results = [];

    await prisma.course.deleteMany()

    for (const course of courseData) {
        try {
            console.log(`📦 Seeding course: ${course.slug}`);
            const result = await prisma.course.upsert({
                where: { slug: course.slug },
                update: {},
                create: {
                    slug: course.slug,
                    title: course.title,
                    description: course.description,
                    timeToComplete: course.timeToComplete,
                    difficulty: course.difficulty,
                    genre: course.genre,
                    metaImageUrl: course.metaImageUrl,
                },
            });
            results.push(result);
        } catch (err) {
            console.error(`❌ Error seeding course ${course.slug}:`, err);
            throw err; // rethrow so seed fails clearly
        }
    }

    return results;
}
