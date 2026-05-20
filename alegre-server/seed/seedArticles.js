import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import connectDb from "../config/db.js";
import { Article } from "../models/Article.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = join(__dirname, "articlesSeed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf8"));

await connectDb();

for (const row of seed) {
  const obj = {
    name:
      row.name ||
      (row.title
        ? String(row.title).toLowerCase().trim().replace(/\s+/g, "-")
        : undefined),
    title: row.title || "Untitled",
    image: row.image || null,
    sourceUrl: row.sourceUrl || "#",
    content: Array.isArray(row.content)
      ? row.content
      : [String(row.content || "")],
  };

  await Article.findOneAndUpdate(
    { name: obj.name },
    { $set: obj },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

console.log(`Seeded or updated ${seed.length} articles.`);
process.exit(0);
