import { NextRequest } from 'next/server';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const GNEWS_QUERY = encodeURIComponent(
  'GenAI OR "Generative AI" OR "AI in Business" OR "AI/ML" OR "AI Biotechnology" OR "Artificial Intelligence" OR "Machine Learning" OR "AI Business"'
);

const GNEWS_URL = `https://gnews.io/api/v4/search?q=${GNEWS_QUERY}&lang=en&country=us&max=5&apikey=${GNEWS_API_KEY}`;

// Simple in-memory cache
let cachedNews: { timestamp: number; articles: any[] } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function summarizeWithOpenAI(text: string) {
  if (!OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return null;
  }
  
  const prompt = `Summarize the following news article in 2-3 sentences for a newsletter.\n\n${text}`;
  
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that summarizes news articles.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 120,
        temperature: 0.7,
      }),
    });
    
    if (!res.ok) {
      console.error('OpenAI API error:', res.status, await res.text());
      return null;
    }
    
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!GNEWS_API_KEY) {
      return new Response(JSON.stringify({ error: 'GNews API key is not configured.' }), { status: 500 });
    }

    // Check cache first
    const now = Date.now();
    if (cachedNews && now - cachedNews.timestamp < CACHE_DURATION) {
      return new Response(JSON.stringify({ articles: cachedNews.articles, cached: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(GNEWS_URL);
    if (!res.ok) {
      console.error('GNews API error:', res.status, await res.text());
      return new Response(JSON.stringify({ error: 'Failed to fetch news from GNews.' }), { status: 500 });
    }
    
    const data = await res.json();
    const articles = data.articles || [];

    // Summarize each article with better error handling
    const summarizedArticles = await Promise.all(
      articles.map(async (article: any) => {
        const summary = await summarizeWithOpenAI(
          `${article.title}\n${article.description || ''}`
        );
        return { ...article, summary };
      })
    );

    // Update cache
    cachedNews = { timestamp: now, articles: summarizedArticles };

    return new Response(JSON.stringify({ articles: summarizedArticles, cached: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error in daily-news API:', error);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred.' }), { status: 500 });
  }
}
