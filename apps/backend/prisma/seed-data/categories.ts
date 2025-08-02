import { PrismaClient, Course } from '@prisma/client';
import { getOrCreateCategory } from './helpers';

export async function seedCategories(prisma: PrismaClient, courses: Course[]) {
  const courseCategoryMap: Record<string, [slug: string, title: string][]> = {
    'kg-basics': [
      ['introduction', 'Introduction'],
      ['rdf', 'RDF'],
      ['ontologies', 'Ontologies'],
      ['knowledgeGraphs', 'Knowledge Graphs'],
      ['querying', 'Querying'],
      ['reasoning', 'Reasoning'],
    ],
    'sparql-fundamentals': [
      ['introduction', 'Introduction'],
      ['select', 'SELECT Queries'],
      ['filter', 'Filtering'],
    ],
    'continuous-sparql': [
      ['csparql', 'Continuous Queries'],
      ['windowing', 'Window Operators'],
    ],
    'advanced-sparql': [
      ['reasoning', 'Reasoning'],
      ['propertyPaths', 'Property Paths'],
      ['federation', 'Federated Queries'],
    ],
  };

  const results = [];

  for (const course of courses) {
    const categoryDefs = courseCategoryMap[course.slug];
    if (!categoryDefs) {
      console.log(`⚠ Skipping course ${course.slug} — no category mapping found`);
      continue;
    }

    const categories = await Promise.all(
      categoryDefs.map(([slug, title], i) =>
        getOrCreateCategory(prisma, course.id, slug, title, i)
      )
    );

    results.push({ course, categories });
  }

  return results;
}
