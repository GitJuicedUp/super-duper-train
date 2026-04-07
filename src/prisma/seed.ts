import { PrismaClient } from "@prisma/client";
import * as path from "path";
import { parseCsvFile } from "../utils/csvParser";

const prisma = new PrismaClient();

async function main() {
  const csvPath = path.resolve(__dirname, "../../cards.csv");
  const cards = parseCsvFile(csvPath);

  console.log(`Seeding ${cards.length} cards from cards.csv...`);

  await Promise.all(
    cards.map(async (card) => {
      await prisma.card.upsert({
        where: { cardId: card.cardId },
        update: card,
        create: card,
      });
      console.log(`  ✓ ${card.cardId} — ${card.title} (${card.rarity})`);
    })
  );

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
