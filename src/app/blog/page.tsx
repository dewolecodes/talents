import React from "react";
import { articles } from "../data/articles";
import BlogCard from "../../components/BlogCard";

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-6 sm:pt-8 px-6 pb-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8" style={{ color: "var(--color3)" }}>
          Latest from our Blog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {articles.map((a) => (
            <div key={a.id} className="flex justify-center">
              <BlogCard article={a} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
