import { prisma } from "../lib/prisma";
import type Author from "../models/Author";

export function getAllAuthors() {
    return prisma.author.findMany({
        include: { books: true },
    });
}

export function getAuthorById(id: number) {
    return prisma.author.findUnique({
        where: { id },
        include: { books: true },
    });
}

export function addAuthor(newAuthor: Author) {
    return prisma.author.create({
        data: {
            firstName: newAuthor.firstName,
            lastName: newAuthor.lastName,
            affiliation: newAuthor.affiliation,
        },
    });
}
