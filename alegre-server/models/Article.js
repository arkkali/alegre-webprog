import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, default: null },
    sourceUrl: { type: String, default: "#" },
    content: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Article = mongoose.model("Article", ArticleSchema);
