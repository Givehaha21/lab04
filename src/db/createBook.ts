import { prisma } from "../lib/prisma";

export async function createBooks() {

    const books = [
        {
            title: "Clean Code",
            author_name: "Robert C. Martin",
            description: "A Handbook of Agile Software Craftsmanship",
            groups: "Programming"
        },
        {
            title: "Atomic Habits",
            author_name: "James Clear",
            description: "Build good habits and break bad ones",
            groups: "Self Development"
        },
        {
            title: "The Pragmatic Programmer",
            author_name: "Andrew Hunt",
            description: "Journey to mastery for modern developers",
            groups: "Programming"
        },
        {
            title: "Deep Work",
            author_name: "Cal Newport",
            description: "Focus in a distracted world",
            groups: "Productivity"
        },
        {
            title: "Rich Dad Poor Dad",
            author_name: "Robert Kiyosaki",
            description: "What the rich teach their kids about money",
            groups: "Finance"
        }
    ];

    for (const book of books) {

        await prisma.book.create({
            data: {
                title: book.title,
                author_name: book.author_name,
                description: book.description,
                groups: book.groups
            }
        });

    }

    console.log("Database has been initialized with books.");
}

