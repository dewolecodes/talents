import React from "react";
import { articles, type Article } from "../../data/articles";
import BlogCard from "../../../components/BlogCard";

type Props = { params: { id: string } };

const STOPWORDS = new Set([
  "the","a","an","and","or","in","on","at","to","for","of","is","are","was","were","it","that","this","with","as","by","from"
]);

function tokenize(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !STOPWORDS.has(w));
}

function getRelatedArticles(current: Article, all: Article[], limit = 3) {
  const others = all.filter((a) => a.id !== current.id);
  const sameCategory = others.filter((a) => a.category === current.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const usedIds = new Set(sameCategory.map((a) => a.id));
  const remaining = others.filter((a) => !usedIds.has(a.id));
  const currentTokens = new Set([
    ...tokenize(current.title),
    ...tokenize(current.excerpt || ""),
  ]);
  const scored = remaining
    .map((a) => {
      const tokens = [...tokenize(a.title), ...tokenize(a.excerpt || "")];
      const matches = tokens.filter((t) => currentTokens.has(t));
      return { article: a, score: matches.length };
    })
    .sort((x, y) => y.score - x.score);
  const picks: Article[] = [...sameCategory];
  for (const s of scored) {
    if (picks.length >= limit) break;
    if (!picks.find((p) => p.id === s.article.id)) picks.push(s.article);
  }
  if (picks.length < limit) {
    for (const o of others) {
      if (picks.length >= limit) break;
      if (!picks.find((p) => p.id === o.id)) picks.push(o);
    }
  }
  return picks.slice(0, limit);
}

export default function ArticlePage({ params }: Props) {
  const { id } = params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p className="mt-4 text-[var(--color2)]">We couldn't find that article.</p>
        </div>
      </main>
    );
  }

  const related = getRelatedArticles(article, articles, 3);

  return (
    <main className="min-h-screen -mt-4 pt-0 sm:mt-0 sm:pt-1 md:pt-2 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="w-full rounded-md overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[420px] object-cover rounded-md"
          />
        </div>

        <div className="mt-4 text-sm text-[var(--color2)] flex items-center gap-3">
          <span>{article.date}</span>
          <span className="text-[var(--color2)]">|</span>
          <span className="text-[var(--color3)] font-semibold">{article.category}</span>
          <span className="ml-2 flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[var(--color3)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-5-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3l-5 4z" />
            </svg>
            <span className="text-[var(--color2)] text-sm">{article.comments}</span>
          </span>
        </div>

        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">{article.title}</h1>

        <div className="mt-6 space-y-6">
          {article.content.map((p, i) => (
            <p key={i} className="text-[var(--color2)] leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-left" style={{ color: "var(--color3)" }}>
            Releated Post
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center md:justify-items-start">
            {related.map((r) => (
              <div key={r.id} className="w-full flex justify-center md:justify-start">
                <BlogCard article={r} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
