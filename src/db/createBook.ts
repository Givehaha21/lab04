import { prisma } from "../lib/prisma";

export async function seedDatabase() {
    // 1. Authors
    const authors = await Promise.all([
        prisma.author.create({ data: { firstName: "Robert", lastName: "Martin", affiliation: "Object Mentor Inc." } }),
        prisma.author.create({ data: { firstName: "James", lastName: "Clear", affiliation: "Independent" } }),
        prisma.author.create({ data: { firstName: "Andrew", lastName: "Hunt", affiliation: "The Pragmatic Bookshelf" } }),
        prisma.author.create({ data: { firstName: "Cal", lastName: "Newport", affiliation: "Georgetown University" } }),
        prisma.author.create({ data: { firstName: "Robert", lastName: "Kiyosaki", affiliation: "Rich Dad Company" } }),
    ]);

    // 2. Books
    const books = await Promise.all([
        prisma.book.create({ data: { title: "Clean Code", isbn: "978-0132350884", category: "Programming", authorId: authors[0].id } }),
        prisma.book.create({ data: { title: "Atomic Habits", isbn: "978-0735211292", category: "Self Development", authorId: authors[1].id } }),
        prisma.book.create({ data: { title: "The Pragmatic Programmer", isbn: "978-0135957059", category: "Programming", authorId: authors[2].id } }),
        prisma.book.create({ data: { title: "Deep Work", isbn: "978-1455586691", category: "Productivity", authorId: authors[3].id } }),
        prisma.book.create({ data: { title: "Rich Dad Poor Dad", isbn: "978-1612680194", category: "Finance", authorId: authors[4].id } }),
    ]);

    // 3. Members
    const members = await Promise.all([
        prisma.member.create({ data: { memberId: "M001", firstName: "สมชาย", lastName: "ใจดี", phone: "0812345678" } }),
        prisma.member.create({ data: { memberId: "M002", firstName: "มาลี", lastName: "รักเรียน", phone: "0898765432" } }),
        prisma.member.create({ data: { memberId: "M003", firstName: "วิชัย", lastName: "สุขสม", phone: "0871112222" } }),
    ]);

    // 4. Borrow Records
    const today = new Date();
    const inOneWeek = new Date(today); inOneWeek.setDate(today.getDate() + 7);
    const inTwoWeeks = new Date(today); inTwoWeeks.setDate(today.getDate() + 14);
    const pastDue = new Date(today); pastDue.setDate(today.getDate() - 3);

    await Promise.all([
        // M001 borrowed Clean Code – already returned
        prisma.borrowRecord.create({
            data: {
                memberId: members[0].id,
                bookId: books[0].id,
                quantity: 1,
                dueDate: pastDue,
                returnedAt: new Date(today.setDate(today.getDate() - 1)),
            },
        }),
        // M001 borrowed Atomic Habits – not yet returned
        prisma.borrowRecord.create({
            data: { memberId: members[0].id, bookId: books[1].id, quantity: 1, dueDate: inOneWeek },
        }),
        // M002 borrowed Deep Work – not yet returned
        prisma.borrowRecord.create({
            data: { memberId: members[1].id, bookId: books[3].id, quantity: 1, dueDate: inOneWeek },
        }),
        // M003 borrowed Rich Dad Poor Dad – not yet returned, overdue
        prisma.borrowRecord.create({
            data: { memberId: members[2].id, bookId: books[4].id, quantity: 1, dueDate: pastDue },
        }),
        // M002 borrowed The Pragmatic Programmer – due in two weeks
        prisma.borrowRecord.create({
            data: { memberId: members[1].id, bookId: books[2].id, quantity: 1, dueDate: inTwoWeeks },
        }),
    ]);

    console.log("Database has been seeded successfully.");
}

