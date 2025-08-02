import 'dotenv/config';


import { PrismaClient } from '@prisma/client';
import { seedAll } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  await seedAll(prisma);
  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
