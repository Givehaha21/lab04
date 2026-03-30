import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import type Book from "../models/Books";

export function getAllBooks() {
    return prisma.book.findMany({
        include: { author: true },
    });
}

export function getBookByCategory(category: string) {
    return prisma.book.findMany({
        where: { category },
        include: { author: true },
    });
}

export function getBookById(id: number) {
    return prisma.book.findUnique({
        where: { id },
        include: { author: true, borrowRecords: { include: { member: true } } },
    });
}

export function getBookByTitle(title: string) {
    return prisma.book.findMany({
        where: {
            title: { contains: title, mode: "insensitive" },
        },
        include: { author: true },
    });
}

export async function searchBooksWithPagination(keyword: string, pageSize: number, pageNo: number) {
    const where: Prisma.BookWhereInput = {
        OR: [
            { title: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { category: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { author: { firstName: { contains: keyword, mode: Prisma.QueryMode.insensitive } } },
            { author: { lastName: { contains: keyword, mode: Prisma.QueryMode.insensitive } } },
            { borrowRecords: { some: { member: { firstName: { contains: keyword, mode: Prisma.QueryMode.insensitive } } } } },
            { borrowRecords: { some: { member: { lastName: { contains: keyword, mode: Prisma.QueryMode.insensitive } } } } },
        ],
    };

    const books = await prisma.book.findMany({
        where,
        skip: pageSize * (pageNo - 1),
        take: pageSize,
        select: {
            id: true,
            title: true,
            isbn: true,
            category: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
            borrowRecords: {
                select: {
                    id: true,
                    dueDate: true,
                    returnedAt: true,
                    member: {
                        select: {
                            memberId: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
        },
    });

    const count = await prisma.book.count({ where });
    return { count, books };
}

export function addBook(newBook: Book) {
    return prisma.book.create({
        data: {
            title: newBook.title,
            isbn: newBook.isbn,
            category: newBook.category,
            authorId: newBook.authorId,
        },
        include: { author: true },
    });
}