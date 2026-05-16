import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import connectDb from "../config/db.js";
import { User } from "../models/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = join(__dirname, "usersSeed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf8"));

await connectDb();
const existing = await User.countDocuments();
if (existing > 0) {
  console.log("Users collection is not empty — skipping seed.");
  process.exit(0);
}

for (const row of seed) {
  await User.create(row);
}

console.log(`Seeded ${seed.length} users.`);
process.exit(0);
