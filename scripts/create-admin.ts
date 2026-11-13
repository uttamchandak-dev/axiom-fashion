import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@axiom.com';
  const password = 'Password123';
  
  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email }
  });
  
  if (existingAdmin) {
    console.log('Admin user already exists:', email);
    return;
  }
  
  const passwordHash = await bcrypt.hash(password, 12);
  
  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'super_admin'
    }
  });
  
  console.log('Admin user created successfully:', email, password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
