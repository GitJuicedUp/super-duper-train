"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = __importDefault(require("./routes/cards"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.use("/api/cards", cards_1.default);
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Juicebot Card API running on port ${PORT}`);
    });
}
exports.default = app;
