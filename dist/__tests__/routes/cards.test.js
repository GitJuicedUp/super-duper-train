"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const client_1 = __importDefault(require("../../prisma/client"));
jest.mock("../../prisma/client", () => ({
    __esModule: true,
    default: {
        card: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));
const mockPrisma = client_1.default;
const sampleCard = {
    id: "clxyz001",
    releaseOrder: 1,
    cardId: "JU-001",
    title: "Citrus Surge",
    subtitle: "The Awakening",
    baseOrFoil: "Base",
    rarity: "Common",
    category: "Juice",
    tier: 1,
    pullRateStandard: 25.0,
    pullRatePremium: 15.0,
    acquisitionMethod: "Pack",
    pool: "Core",
    statBoost: "+5 Energy",
    relatedCards: "JU-002",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
};
const sampleCard2 = {
    ...sampleCard,
    id: "clxyz002",
    releaseOrder: 2,
    cardId: "JU-002",
    rarity: "Uncommon",
    category: "Boost",
    relatedCards: "JU-001",
};
beforeEach(() => {
    jest.clearAllMocks();
});
describe("GET /api/cards", () => {
    it("returns all cards as a JSON array", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard, sampleCard2]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].cardId).toBe("JU-001");
        expect(res.body[1].cardId).toBe("JU-002");
    });
    it("calls findMany ordered by releaseOrder ascending", async () => {
        mockPrisma.card.findMany.mockResolvedValue([]);
        await (0, supertest_1.default)(index_1.default).get("/api/cards");
        expect(mockPrisma.card.findMany).toHaveBeenCalledWith({
            orderBy: { releaseOrder: "asc" },
        });
    });
    it("returns an empty array when no cards exist", async () => {
        mockPrisma.card.findMany.mockResolvedValue([]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});
describe("GET /api/cards/:id", () => {
    it("returns the card when found", async () => {
        mockPrisma.card.findUnique.mockResolvedValue(sampleCard);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/JU-001");
        expect(res.status).toBe(200);
        expect(res.body.cardId).toBe("JU-001");
        expect(res.body.title).toBe("Citrus Surge");
    });
    it("calls findUnique with the correct cardId", async () => {
        mockPrisma.card.findUnique.mockResolvedValue(sampleCard);
        await (0, supertest_1.default)(index_1.default).get("/api/cards/JU-001");
        expect(mockPrisma.card.findUnique).toHaveBeenCalledWith({
            where: { cardId: "JU-001" },
        });
    });
    it("returns 404 with an error message when the card is not found", async () => {
        mockPrisma.card.findUnique.mockResolvedValue(null);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/JU-999");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Card 'JU-999' not found" });
    });
    it("includes the requested id in the 404 error message", async () => {
        mockPrisma.card.findUnique.mockResolvedValue(null);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/NONEXISTENT");
        expect(res.body.error).toContain("NONEXISTENT");
    });
});
describe("GET /api/cards/rarity/:rarity", () => {
    it("returns cards matching the given rarity", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/rarity/Common");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].rarity).toBe("Common");
    });
    it("calls findMany with a case-insensitive rarity filter", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard]);
        await (0, supertest_1.default)(index_1.default).get("/api/cards/rarity/common");
        expect(mockPrisma.card.findMany).toHaveBeenCalledWith({
            where: { rarity: { equals: "common", mode: "insensitive" } },
            orderBy: { releaseOrder: "asc" },
        });
    });
    it("returns an empty array when no cards match the rarity", async () => {
        mockPrisma.card.findMany.mockResolvedValue([]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/rarity/Legendary");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("returns multiple cards for a rarity that has several entries", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard, sampleCard2]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/rarity/Common");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });
});
describe("GET /api/cards/category/:category", () => {
    it("returns cards matching the given category", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/category/Juice");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].category).toBe("Juice");
    });
    it("calls findMany with a case-insensitive category filter", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard]);
        await (0, supertest_1.default)(index_1.default).get("/api/cards/category/juice");
        expect(mockPrisma.card.findMany).toHaveBeenCalledWith({
            where: { category: { equals: "juice", mode: "insensitive" } },
            orderBy: { releaseOrder: "asc" },
        });
    });
    it("returns an empty array when no cards match the category", async () => {
        mockPrisma.card.findMany.mockResolvedValue([]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/category/Unknown");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    it("returns multiple cards for a category that has several entries", async () => {
        mockPrisma.card.findMany.mockResolvedValue([sampleCard, sampleCard2]);
        const res = await (0, supertest_1.default)(index_1.default).get("/api/cards/category/Juice");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });
});
