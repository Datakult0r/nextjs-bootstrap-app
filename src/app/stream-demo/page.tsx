'use client';

import { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
}

export default function StreamDemoPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsStreaming(true);
    setMessages([]);
    setArticles([]);
    setError(null);
    const eventSource = new EventSource('/api/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error);
        setIsStreaming(false);
        eventSource.close();
      } else if (data.message) {
        setMessages(prev => [...prev, data.message]);
        if (data.message === "Stream complete.") {
            setIsStreaming(false);
            eventSource.close();
        }
      } else if (data.article) {
        setArticles(prev => [...prev, data.article]);
      }
    };

    eventSource.onerror = () => {
      setError('An error occurred while connecting to the stream.');
      setIsStreaming(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Live News Stream</h1>
      <p className="mb-8">This page demonstrates receiving a live stream of news articles from a backend API.</p>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow min-h-[300px]">
        <h2 className="text-2xl font-semibold mb-4">Top Headlines</h2>
        
        {messages.map((msg, index) => (
          <p key={`msg-${index}`} className="text-sm text-gray-500 dark:text-gray-400 italic">{msg}</p>
        ))}

        <div className="mt-4 space-y-4">
          {articles.map((article, index) => (
            <a 
              href={article.url} 
              key={`article-${index}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="block p-4 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{article.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Source: {article.source.name}</p>
            </a>
          ))}
        </div>
        
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
        {!isStreaming && !error && articles.length > 0 && <p className="mt-4 text-green-500">Stream finished.</p>}
      </div>
    </div>
  );
} 