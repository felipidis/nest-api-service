import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.job.create({
    data: {
      description: 'Exame',
      commission: 0.5,
      duration: 60,
      price: 1000,
    },
  });
  await prisma.job.create({
    data: {
      description: 'Consulta',
      commission: 0.4,
      duration: 30,
      price: 500,
    },
  });
  await prisma.job.create({
    data: {
      description: 'Aplicar medicação',
      commission: 0.25,
      duration: 10,
      price: 150,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
