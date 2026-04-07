import request from "supertest";

jest.mock("../prisma/client", () => ({
  __esModule: true,
  default: {
    card: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

import app from "../index";

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("404 for unknown routes", () => {
  it("returns 404 for an unknown path", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBe(404);
  });
});
