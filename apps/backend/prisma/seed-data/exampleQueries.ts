import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedExampleQueries(prisma: PrismaClient) {
  await prisma.exampleQuery.createMany({
    data: [
      {
        title: 'Select All Triples',
        description: 'Returns all triples from the dataset.',
        query: `SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 100`,
      },
      {
        title: 'All Classes',
        description: 'Lists all RDF classes in the dataset.',
        query: `SELECT DISTINCT ?class WHERE { ?s a ?class } LIMIT 100`,
      },
      {
        title: 'All Properties',
        description: 'Retrieves all used predicates.',
        query: `SELECT DISTINCT ?p WHERE { ?s ?p ?o } LIMIT 100`,
      }
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeded example SPARQL queries');
}
