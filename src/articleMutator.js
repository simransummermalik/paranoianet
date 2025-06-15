import { generateCorruptedVersion } from "./openaiCorruptor";

export async function mutateArticle(article, level) {
  if (level === 0) return article.getContent(0); // baseline
  if (level === 1) {
    const base = article.getContent(0);
    return await generateCorruptedVersion(base, 0.1); // very subtle
  }
  if (level >= 2) {
    const base = article.getContent(1);
    return await generateCorruptedVersion(base, 0.4); // major rewrite
  }
}
