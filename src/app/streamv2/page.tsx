"use client";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string };
  summary?: string;
}

export default function DailyNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/daily-news-news");
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError("No articles found.");
        }
      } catch (e) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Newsletter (Daily News)</h1>
      <p className="mb-8">Latest news, fetched live from GNews and summarized by AI.</p>
      {loading && <p>Loading news and AI summaries...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border bg-white dark:bg-gray-900 shadow hover:shadow-lg transition p-4"
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{article.description}</p>
            {article.summary && (
              <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 mb-2">
                <strong>AI Summary:</strong>
                <p className="text-blue-900 dark:text-blue-100 mt-1">{article.summary}</p>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>{article.source?.name}</span>
              <span>{new Date(article.publishedAt).toLocaleString()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 