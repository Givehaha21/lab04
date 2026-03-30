import { prisma } from "../lib/prisma";
import type Book from "../models/Books";

export function getBookByGroup(groups: string) {
    return prisma.book.findMany({
        where: { groups },
    });
}

export function getAllBooks() {
    return prisma.book.findMany();
}

export function getBookById(id: number) {
    return prisma.book.findUnique({
        where: { id },
    });
}

export function addBook(newBook: Book) {
    return prisma.book.create({
        data: {
            title: newBook.title,
            author_name: newBook.author_name,
            description: newBook.description,
            groups: newBook.groups,
        },
    });
}