import type { BookModel as book, BookModel } from "../generated/prisma/models/Book";
import * as repo from "../repositories/BookRepositoryPrisma"


export async function getBookByGroup(group: string) {
    return repo.getBookByGroup(group);
}

export async function getAllBooks() {
    return repo.getAllBooks();
}

export async function getBookById(id: number) {
    return repo.getBookById(id);
}

export async function addBook(newBook: BookModel) {
    return repo.addBook(newBook);
}
