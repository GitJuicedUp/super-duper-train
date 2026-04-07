import { Router, Request, Response } from "express";
import prisma from "../prisma/client";

const router = Router();

// GET /api/cards - List all cards
router.get("/", async (_req: Request, res: Response) => {
  const cards = await prisma.card.findMany({
    orderBy: { releaseOrder: "asc" },
  });
  res.json(cards);
});

// GET /api/cards/:id - Get a card by cardId (e.g. JU-001)
router.get("/:id", async (req: Request, res: Response) => {
  const card = await prisma.card.findUnique({
    where: { cardId: req.params.id },
  });
  if (!card) {
    return res.status(404).json({ error: `Card '${req.params.id}' not found` });
  }
  return res.json(card);
});

// GET /api/cards/rarity/:rarity - Get cards by rarity
router.get("/rarity/:rarity", async (req: Request, res: Response) => {
  const cards = await prisma.card.findMany({
    where: { rarity: { equals: req.params.rarity, mode: "insensitive" } },
    orderBy: { releaseOrder: "asc" },
  });
  res.json(cards);
});

// GET /api/cards/category/:category - Get cards by category
router.get("/category/:category", async (req: Request, res: Response) => {
  const cards = await prisma.card.findMany({
    where: { category: { equals: req.params.category, mode: "insensitive" } },
    orderBy: { releaseOrder: "asc" },
  });
  res.json(cards);
});

export default router;
