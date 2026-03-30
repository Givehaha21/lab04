import { createBooks } from "../src/db/createBook";
import { prisma } from "../src/lib/prisma";


prisma.book.deleteMany().then(() => {
    createBooks()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
})