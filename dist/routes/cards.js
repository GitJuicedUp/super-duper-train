"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = __importDefault(require("../prisma/client"));
const router = (0, express_1.Router)();
// GET /api/cards - List all cards
router.get("/", async (_req, res) => {
    const cards = await client_1.default.card.findMany({
        orderBy: { releaseOrder: "asc" },
    });
    res.json(cards);
});
// GET /api/cards/:id - Get a card by cardId (e.g. JU-001)
router.get("/:id", async (req, res) => {
    const card = await client_1.default.card.findUnique({
        where: { cardId: req.params.id },
    });
    if (!card) {
        return res.status(404).json({ error: `Card '${req.params.id}' not found` });
    }
    return res.json(card);
});
// GET /api/cards/rarity/:rarity - Get cards by rarity
router.get("/rarity/:rarity", async (req, res) => {
    const cards = await client_1.default.card.findMany({
        where: { rarity: { equals: req.params.rarity, mode: "insensitive" } },
        orderBy: { releaseOrder: "asc" },
    });
    res.json(cards);
});
// GET /api/cards/category/:category - Get cards by category
router.get("/category/:category", async (req, res) => {
    const cards = await client_1.default.card.findMany({
        where: { category: { equals: req.params.category, mode: "insensitive" } },
        orderBy: { releaseOrder: "asc" },
    });
    res.json(cards);
});
exports.default = router;
