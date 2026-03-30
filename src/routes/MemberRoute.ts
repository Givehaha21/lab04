import express from "express";
import * as service from "../services/MemberService";

const router = express.Router();

// GET /members?name=xxx → search by first/last name
// GET /members          → all members
router.get("/", async (req, res) => {
    try {
        if (req.query.name) {
            const members = await service.getMembersByName(req.query.name as string);
            return res.json(members);
        }
        res.json(await service.getAllMembers());
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// GET /members/:memberId → member by memberId (e.g. M001)
router.get("/:memberId", async (req, res) => {
    try {
        const member = await service.getMemberByMemberId(req.params.memberId);
        if (member) {
            res.json(member);
        } else {
            res.status(404).send("Member not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// POST /members → add new member
router.post("/", async (req, res) => {
    try {
        res.json(await service.addMember(req.body));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
