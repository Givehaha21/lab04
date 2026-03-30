import express from "express";
import * as service from "../services/BookService";

const router = express.Router();

// GET /books?keyword=xxx&pageSize=3&pageNo=1 → pagination + keyword search
// GET /books?title=xxx                       → search by title
// GET /books?category=xxx                    → filter by category
// GET /books                                 → all books (default pagination)
router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = (req.query.keyword as string) || "";

    try {
        if (req.query.title) {
            const books = await service.getBookByTitle(req.query.title as string);
            return res.json(books);
        }
        if (req.query.category) {
            const books = await service.getBookByCategory(req.query.category as string);
            return res.json(books);
        }

        const result = await service.searchBooksWithPagination(keyword, pageSize, pageNo);

        if (result.books.length === 0) {
            res.status(404).send("No books found");
            return;
        }

        res.setHeader("x-total-count", result.count.toString());
        res.json(result.books);
    } catch (error) {
        if (pageNo < 1 || pageSize < 1) {
            res.status(400).send("Invalid pageNo or pageSize");
        } else {
            res.status(500).send("Internal Server Error");
        }
        return;
    } finally {
        console.log(`GET /books completed. pageNo=${pageNo}, pageSize=${pageSize}, keyword=${keyword}`);
    }
});

// GET /books/:id → book by id
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = await service.getBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// POST /books → add new book
router.post("/", async (req, res) => {
    try {
        res.json(await service.addBook(req.body));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
