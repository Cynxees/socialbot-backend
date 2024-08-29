import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const hashedPassword = await bcrypt.hash('pass', 1);
  await prisma.user.createMany({
    data: [
      {
        username: 'superadmin',
        password: hashedPassword,
        role: 'super_admin',
      },
      {
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      },
      {
        username: 'admin2',
        password: hashedPassword,
        role: 'admin',
      },
      {
        username: 'admin3',
        password: hashedPassword,
        role: 'admin',
      },
      {
        username: 'user',
        password: hashedPassword,
        role: 'user',
      },
      {
        username: 'user2',
        password: hashedPassword,
        role: 'user',
      },
      {
        username: 'user3',
        password: hashedPassword,
        role: 'user',
      }
    ],
  });

  console.log('Database seeded successfully.');
}

// Execute the seed function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

