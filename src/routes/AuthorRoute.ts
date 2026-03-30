import express from "express";
import * as service from "../services/AuthorService";

const router = express.Router();

// GET /authors → all authors
router.get("/", async (_req, res) => {
    try {
        res.json(await service.getAllAuthors());
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// GET /authors/:id → author by id
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const author = await service.getAuthorById(id);
        if (author) {
            res.json(author);
        } else {
            res.status(404).send("Author not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// POST /authors → add new author
router.post("/", async (req, res) => {
    try {
        res.json(await service.addAuthor(req.body));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
