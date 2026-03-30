import express from "express";
import * as service from "../services/BorrowRecordService";

const router = express.Router();

// GET /borrow-records?dueDate=2026-04-01 → filter by due date
// GET /borrow-records                    → all borrow records
router.get("/", async (req, res) => {
    try {
        if (req.query.dueDate) {
            const dueDate = new Date(req.query.dueDate as string);
            if (isNaN(dueDate.getTime())) {
                return res.status(400).send("Invalid dueDate format. Use YYYY-MM-DD");
            }
            return res.json(await service.getBorrowRecordsByDueDate(dueDate));
        }
        res.json(await service.getAllBorrowRecords());
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// GET /borrow-records/unreturned → books not yet returned
router.get("/unreturned", async (_req, res) => {
    try {
        res.json(await service.getUnreturnedBorrowRecords());
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// POST /borrow-records → create borrow record
router.post("/", async (req, res) => {
    try {
        res.json(await service.addBorrowRecord(req.body));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// PATCH /borrow-records/:id/return → mark book as returned
router.patch("/:id/return", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const record = await service.returnBook(id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).send("Borrow record not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
