"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Article } from "../app/data/articles";

export default function BlogCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} aria-label={article.title}>
      <motion.article
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.18 }}
        className="group cursor-pointer w-full max-w-[420px] sm:max-w-none"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <motion.img
            src={article.image}
            alt={article.title}
            className="w-full h-[240px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* small meta row */}
        <div className="mt-3 flex items-center gap-3 text-sm">
          {/* date (color2) */}
          <span className="text-[var(--color2)]">{article.date}</span>

          {/* separator dot */}
          <span className="text-[var(--color2)]">|</span>

          {/* Blog text (color3) */}
          <span className="text-[var(--color3)] font-semibold">{article.category}</span>

          {/* comments icon (color3) and number (color2) */}
          <div className="ml-2 flex items-center gap-1">
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
          </div>
        </div>

        {/* caption (title) and subcaption (excerpt) */}
        <h3 className="mt-2 text-lg font-bold text-[var(--color2)] transition-colors duration-200 group-hover:text-[var(--color3)]">
          {article.title}
        </h3>

        <p className="mt-1 text-sm text-[var(--color2)] line-clamp-2">
          {article.excerpt}
        </p>
      </motion.article>
    </Link>
  );
}
