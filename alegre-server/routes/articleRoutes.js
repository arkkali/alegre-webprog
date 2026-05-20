import { Router } from "express";
import { Article } from "../models/Article.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const docs = await Article.find().sort({ createdAt: -1 });
    res.json({ articles: docs });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to load articles." });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }
    res.json({ article });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to load article." });
  }
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const b = req.body;
    if (!b.title)
      return res.status(400).json({ message: "Title is required." });
    const name =
      b.name || String(b.title).toLowerCase().trim().replace(/\s+/g, "-");
    const created = await Article.create({
      name,
      title: String(b.title).trim(),
      image: b.image || null,
      sourceUrl: b.sourceUrl || "#",
      content: Array.isArray(b.content) ? b.content : [String(b.content || "")],
    });
    res.status(201).json({ article: created });
  } catch (e) {
    if (e.code === 11000) {
      return res
        .status(400)
        .json({ message: "An article with that slug already exists." });
    }
    res.status(400).json({ message: e.message || "Could not create article." });
  }
});

export default router;
