import type { BookModel } from "../generated/prisma/models/Book";
import * as repo from "../repositories/BookRepositoryPrisma"


export async function getAllBooks() {
    return repo.getAllBooks();
}

export async function getBookByCategory(category: string) {
    return repo.getBookByCategory(category);
}

export async function getBookById(id: number) {
    return repo.getBookById(id);
}

export async function getBookByTitle(title: string) {
    return repo.getBookByTitle(title);
}

export async function searchBooksWithPagination(keyword: string, pageSize: number, pageNo: number) {
    return repo.searchBooksWithPagination(keyword, pageSize, pageNo);
}

export async function addBook(newBook: BookModel) {
    return repo.addBook(newBook);
}
