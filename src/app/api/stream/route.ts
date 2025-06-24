import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

interface Article {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
}

async function* streamGNewsData() {
  const encoder = new TextEncoder();
  const apiKey = process.env.GNEWS_API_KEY || '2ba7fe16d6e4388dcb48832ee321dcfd';
  const url = `https://gnews.io/api/v4/top-headlines?topic=breaking-news&lang=en&country=us&max=10&apikey=${apiKey}`;

  yield encoder.encode(`data: ${JSON.stringify({ message: "Fetching latest news..." })}\\n\\n`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GNews API error: ${response.statusText}`);
    }
    const { articles } = await response.json();

    if (!articles || articles.length === 0) {
      yield encoder.encode(`data: ${JSON.stringify({ message: "No articles found." })}\\n\\n`);
      return;
    }

    yield encoder.encode(`data: ${JSON.stringify({ message: `Found ${articles.length} articles. Streaming them now...` })}\\n\\n`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    for (const article of articles) {
      yield encoder.encode(`data: ${JSON.stringify({ article })}\\n\\n`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between articles
    }

    yield encoder.encode(`data: ${JSON.stringify({ message: "Stream complete." })}\\n\\n`);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching from GNews:", errorMessage);
    yield encoder.encode(`data: ${JSON.stringify({ error: `Failed to fetch news: ${errorMessage}` })}\\n\\n`);
  }
}

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      const iterator = streamGNewsData();
      let result = await iterator.next();
      while (!result.done) {
        controller.enqueue(result.value);
        result = await iterator.next();
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
} 