import express from "express";
import cardRoutes from "./routes/cards";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/cards", cardRoutes);

app.listen(PORT, () => {
  console.log(`Juicebot Card API running on port ${PORT}`);
});

export default app;
