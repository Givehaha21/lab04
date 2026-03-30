import { prisma } from "../lib/prisma";
import type BorrowRecord from "../models/BorrowRecord";

export function getAllBorrowRecords() {
    return prisma.borrowRecord.findMany({
        include: { member: true, book: { include: { author: true } } },
    });
}

export function getBorrowRecordsByDueDate(dueDate: Date) {
    const start = new Date(dueDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dueDate);
    end.setHours(23, 59, 59, 999);

    return prisma.borrowRecord.findMany({
        where: {
            dueDate: { gte: start, lte: end },
        },
        include: { member: true, book: { include: { author: true } } },
    });
}

export function getUnreturnedBorrowRecords() {
    return prisma.borrowRecord.findMany({
        where: { returnedAt: null },
        include: { member: true, book: { include: { author: true } } },
    });
}

export function addBorrowRecord(record: BorrowRecord) {
    return prisma.borrowRecord.create({
        data: {
            memberId: record.memberId,
            bookId: record.bookId,
            quantity: record.quantity,
            dueDate: record.dueDate,
            returnedAt: record.returnedAt ?? null,
        },
        include: { member: true, book: { include: { author: true } } },
    });
}

export function returnBook(id: number) {
    return prisma.borrowRecord.update({
        where: { id },
        data: { returnedAt: new Date() },
        include: { member: true, book: { include: { author: true } } },
    });
}
