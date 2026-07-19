import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminUsername = process.env.ADMIN_USERNAME || 'synchrotechrace@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'rotek9669';

  // ponytail: remove old admin placeholders if exists to allow updating credentials
  await prisma.user.deleteMany({
    where: { 
      username: {
        in: ['admin', 'synchrotechrace@gmail.com', adminUsername]
      }
    },
  });

  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        username: adminUsername,
        passwordHash: passwordHash,
      },
    });
    console.log(`Created default admin user (${adminUsername} / ${adminPassword}).`);
  } else {
    console.log('Admin user already exists.');
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
