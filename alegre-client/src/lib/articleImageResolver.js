import art1 from "../assets/images/article1.jpg";
import art2 from "../assets/images/article2.webp";
import art3 from "../assets/images/article3.jpg";
import art4 from "../assets/images/article4.png";
import art5 from "../assets/images/article5.jpg";
import art6 from "../assets/images/article6.jpg";

const localImages = {
  "article1.jpg": art1,
  "article2.webp": art2,
  "article3.jpg": art3,
  "article4.png": art4,
  "article5.jpg": art5,
  "article6.jpg": art6,
};

const fallbackByName = {
  "step-by-step-portrait": art1,
  "ultimate-challenge": art2,
  "drawing-tips": art3,
  "realistic-portraits": art4,
  "expression-expectation": art5,
  "realistic-tips": art6,
};

function resolveImageString(image) {
  if (!image) return null;
  if (typeof image !== "string") return image;

  const trimmed = image.trim();
  if (!trimmed) return null;

  if (/^(https?:|\/\/|\/)\S+/.test(trimmed)) {
    return trimmed;
  }

  const fileName = trimmed.split("/").pop();
  return localImages[fileName] || trimmed;
}

export function resolveArticleImage(article) {
  if (!article) return null;
  const image = resolveImageString(article.image);
  if (image) return image;
  return fallbackByName[article.name] || null;
}
