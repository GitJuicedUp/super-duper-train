"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
jest.mock("../prisma/client", () => ({
    __esModule: true,
    default: {
        card: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));
const index_1 = __importDefault(require("../index"));
describe("GET /health", () => {
    it("returns status ok", async () => {
        const res = await (0, supertest_1.default)(index_1.default).get("/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
});
describe("404 for unknown routes", () => {
    it("returns 404 for an unknown path", async () => {
        const res = await (0, supertest_1.default)(index_1.default).get("/unknown-route");
        expect(res.status).toBe(404);
    });
});
