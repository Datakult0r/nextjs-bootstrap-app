import { NextRequest, NextResponse } from 'next/server';
import { StreamDataResponse, StreamHeadline, ContentMode, NewsFilter, APIResponse } from '@/types/hackwire';

// In-memory storage for custom headlines and settings
let customHeadlines: StreamHeadline[] = [];
let currentSettings = {
  mode: 'auto' as ContentMode,
  filter: 'top' as NewsFilter,
  limit: 10,
  refreshRate: 30000, // 30 seconds
  useCustomHeadlines: true
};

// Cache for stream data
let streamCache: { data: StreamDataResponse; timestamp: number } | null = null;
const STREAM_CACHE_DURATION = 10 * 1000; // 10 seconds

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = (searchParams.get('mode') as ContentMode) || currentSettings.mode;
    const filter = (searchParams.get('filter') as NewsFilter) || currentSettings.filter;
    const limit = parseInt(searchParams.get('limit') || currentSettings.limit.toString());

    const now = Date.now();

    // Check cache first
    if (streamCache && (now - streamCache.timestamp) < STREAM_CACHE_DURATION) {
      return NextResponse.json(streamCache.data);
    }

    let headlines: StreamHeadline[] = [];
    let apiCount = 0;
    let customCount = customHeadlines.length;

    // Handle different content modes
    switch (mode) {
      case 'custom_only':
        headlines = [...customHeadlines];
        break;

      case 'manual':
        // Return cached headlines or empty array for manual mode
        headlines = streamCache?.data.headlines || [];
        break;

      case 'ai_monologue':
        // For AI monologue mode, we need fewer headlines but with AI processing
        headlines = await fetchNewsHeadlines(filter, Math.min(limit, 5));
        apiCount = headlines.length;
        break;

      case 'auto':
      default:
        // Fetch fresh news headlines
        const newsHeadlines = await fetchNewsHeadlines(filter, limit);
        apiCount = newsHeadlines.length;

        // Combine with custom headlines if enabled
        if (currentSettings.useCustomHeadlines && customHeadlines.length > 0) {
          headlines = [...customHeadlines, ...newsHeadlines];
        } else {
          headlines = newsHeadlines;
        }
        break;
    }

    // Sort headlines by priority and timestamp
    headlines.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // Higher priority first
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    // Limit final results
    headlines = headlines.slice(0, limit);

    const streamResponse: StreamDataResponse = {
      success: true,
      timestamp: new Date().toISOString(),
      count: headlines.length,
      custom_count: customCount,
      api_count: apiCount,
      mode: mode,
      filter: filter,
      headlines: headlines,
      meta: {
        refreshRate: currentSettings.refreshRate,
        apiCalls: apiCount,
        nextUpdate: new Date(now + currentSettings.refreshRate).toISOString(),
        contentMode: mode,
        customHeadlinesAvailable: customCount
      }
    };

    // Cache the response
    streamCache = {
      data: streamResponse,
      timestamp: now
    };

    return NextResponse.json(streamResponse);

  } catch (error) {
    console.error('Stream API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch stream data',
      timestamp: new Date().toISOString()
    } as APIResponse<StreamDataResponse>, { status: 500 });
  }
}

// POST method for updating stream settings or adding custom headlines
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'add_custom_headline':
        const newHeadline: StreamHeadline = {
          id: Date.now(),
          title: data.title,
          source: data.source || 'Custom',
          image: data.image,
          publishedAt: new Date().toISOString(),
          url: data.url || '#',
          category: data.category || 'custom',
          priority: data.priority || 5,
          isCustom: true
        };
        customHeadlines.unshift(newHeadline);
        break;

      case 'remove_custom_headline':
        customHeadlines = customHeadlines.filter(h => h.id !== data.id);
        break;

      case 'update_settings':
        currentSettings = { ...currentSettings, ...data };
        break;

      case 'clear_custom_headlines':
        customHeadlines = [];
        break;

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          timestamp: new Date().toISOString()
        } as APIResponse<StreamDataResponse>, { status: 400 });
    }

    // Clear cache when settings change
    streamCache = null;

    return NextResponse.json({
      success: true,
      message: `Action '${action}' completed successfully`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stream POST API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process request',
      timestamp: new Date().toISOString()
    } as APIResponse<StreamDataResponse>, { status: 500 });
  }
}

// Helper function to fetch news headlines directly from GNews API
async function fetchNewsHeadlines(filter: NewsFilter, limit: number): Promise<StreamHeadline[]> {
  try {
    const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
    const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

    if (!GNEWS_API_KEY) {
      console.warn('GNews API key not configured, returning empty headlines');
      return [];
    }

    // Build GNews API URL
    let apiUrl = `${GNEWS_BASE_URL}/`;
    
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

    apiUrl += `&max=${limit}&apikey=${GNEWS_API_KEY}`;

    // Fetch from GNews API directly
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Hackwire-NextJS/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.articles) {
      return [];
    }

    return data.articles.map((article: any, index: number): StreamHeadline => ({
      id: Date.now() + index,
      title: article.title,
      source: article.source.name,
      image: article.image,
      publishedAt: article.publishedAt,
      url: article.url,
      category: filter,
      priority: 3, // Default priority for API headlines
      isCustom: false
    }));

  } catch (error) {
    console.error('Error fetching news headlines:', error);
    return [];
  }
}

// DELETE method for clearing cache
export async function DELETE() {
  streamCache = null;
  customHeadlines = [];
  
  return NextResponse.json({
    success: true,
    message: 'Cache and custom headlines cleared',
    timestamp: new Date().toISOString()
  });
}