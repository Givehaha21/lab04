import * as repo from "../repositories/AuthorRepositoryPrisma";
import type Author from "../models/Author";

export async function getAllAuthors() {
    return repo.getAllAuthors();
}

export async function getAuthorById(id: number) {
    return repo.getAuthorById(id);
}

export async function addAuthor(newAuthor: Author) {
    return repo.addAuthor(newAuthor);
}
