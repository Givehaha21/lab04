import * as repo from "../repositories/BorrowRecordRepositoryPrisma";
import type BorrowRecord from "../models/BorrowRecord";

export async function getAllBorrowRecords() {
    return repo.getAllBorrowRecords();
}

export async function getBorrowRecordsByDueDate(dueDate: Date) {
    return repo.getBorrowRecordsByDueDate(dueDate);
}

export async function getUnreturnedBorrowRecords() {
    return repo.getUnreturnedBorrowRecords();
}

export async function addBorrowRecord(record: BorrowRecord) {
    return repo.addBorrowRecord(record);
}

export async function returnBook(id: number) {
    return repo.returnBook(id);
}
