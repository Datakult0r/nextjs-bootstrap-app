import { NextRequest, NextResponse } from 'next/server';
import { NewsResponse, NewsFilter, APIResponse } from '@/types/hackwire';

// GNews API configuration
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

// Cache for news data to avoid excessive API calls
let newsCache: { [key: string]: { data: NewsResponse; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = (searchParams.get('filter') as NewsFilter) || 'top';
    const limit = parseInt(searchParams.get('limit') || '10');
    const query = searchParams.get('query') || '';

    // Check if we have valid API key
    if (!GNEWS_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GNews API key not configured',
        timestamp: new Date().toISOString()
      } as APIResponse<NewsResponse>, { status: 500 });
    }

    // Create cache key
    const cacheKey = `${filter}-${limit}-${query}`;
    const now = Date.now();

    // Check cache first
    if (newsCache[cacheKey] && (now - newsCache[cacheKey].timestamp) < CACHE_DURATION) {
      return NextResponse.json(newsCache[cacheKey].data);
    }

    // Build GNews API URL
    let apiUrl = `${GNEWS_BASE_URL}/`;
    
    if (query) {
      apiUrl += `search?q=${encodeURIComponent(query)}`;
    } else {
      switch (filter) {
        case 'top':
          apiUrl += 'top-headlines?country=us';
          break;
        case 'tech':
          apiUrl += 'top-headlines?category=technology&country=us';
          break;
        case 'business':
          apiUrl += 'top-headlines?category=business&country=us';
          break;
        case 'science':
          apiUrl += 'top-headlines?category=science&country=us';
          break;
        default:
          apiUrl += 'top-headlines?country=us';
      }
    }

    apiUrl += `&max=${limit}&apikey=${GNEWS_API_KEY}`;

    // Fetch from GNews API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Hackwire-NextJS/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Transform GNews response to our format
    const newsResponse: NewsResponse = {
      success: true,
      articles: data.articles?.map((article: any) => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.image,
        image: article.image,
        publishedAt: article.publishedAt,
        source: {
          name: article.source.name
        }
      })) || [],
      totalResults: data.totalArticles || data.articles?.length || 0,
      timestamp: new Date().toISOString()
    };

    // Cache the response
    newsCache[cacheKey] = {
      data: newsResponse,
      timestamp: now
    };

    // Clean old cache entries
    Object.keys(newsCache).forEach(key => {
      const cacheEntry = newsCache[key];
      if (cacheEntry && now - cacheEntry.timestamp > CACHE_DURATION) {
        delete newsCache[key];
      }
    });

    return NextResponse.json(newsResponse);

  } catch (error) {
    console.error('News API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch news',
      timestamp: new Date().toISOString()
    } as APIResponse<NewsResponse>, { status: 500 });
  }
}

// POST method for custom searches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, filter, limit = 10 } = body;

    if (!GNEWS_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GNews API key not configured',
        timestamp: new Date().toISOString()
      } as APIResponse<NewsResponse>, { status: 500 });
    }

    // Build search URL
    let apiUrl = `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(query || 'news')}`;
    
    if (filter && filter !== 'top') {
      apiUrl += `&category=${filter}`;
    }
    
    apiUrl += `&max=${limit}&apikey=${GNEWS_API_KEY}`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Hackwire-NextJS/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const newsResponse: NewsResponse = {
      success: true,
      articles: data.articles?.map((article: any) => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        urlToImage: article.image,
        image: article.image,
        publishedAt: article.publishedAt,
        source: {
          name: article.source.name
        }
      })) || [],
      totalResults: data.totalArticles || data.articles?.length || 0,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(newsResponse);

  } catch (error) {
    console.error('News search API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search news',
      timestamp: new Date().toISOString()
    } as APIResponse<NewsResponse>, { status: 500 });
  }
}