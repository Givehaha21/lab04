import { seedDatabase } from "../src/db/createBook";
import { prisma } from "../src/lib/prisma";

async function main() {
    await prisma.borrowRecord.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.member.deleteMany();
    await seedDatabase();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });