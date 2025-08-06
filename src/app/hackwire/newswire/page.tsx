'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsFilter, NewsResponse } from '@/types/hackwire';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, ExternalLink, Clock, Globe, RefreshCw } from 'lucide-react';

export default function NewswirePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<NewsFilter>('top');
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(20);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async (currentFilter: NewsFilter = filter, query: string = searchQuery) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        filter: currentFilter,
        limit: limit.toString(),
        ...(query && { query })
      });

      const response = await fetch(`/api/hackwire/news?${params}`);
      
      // Check if response is OK and is JSON
      if (!response.ok) {
        throw new Error(`News API error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`News API returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      const data: NewsResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch news');
      }

      setArticles(data.articles || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    await fetchNews(filter, searchQuery);
  };

  const handleFilterChange = async (newFilter: NewsFilter) => {
    setFilter(newFilter);
    await fetchNews(newFilter, searchQuery);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getFilterBadgeColor = (filterType: NewsFilter) => {
    switch (filterType) {
      case 'tech': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'business': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'science': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hackwire Newswire
              </h1>
              <p className="text-gray-400 mt-1">Real-time news aggregation powered by AI</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="flex gap-2 flex-1">
                <Input
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
                <Button onClick={handleSearch} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[140px] bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="top">Top News</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  Updated {formatTimeAgo(lastUpdated.toISOString())}
                </div>
              )}
              <Button
                onClick={() => fetchNews()}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <span className="text-gray-300">Loading latest news...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/30 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400 text-sm">!</span>
                </div>
                <div>
                  <p className="text-red-400 font-medium">Error loading news</p>
                  <p className="text-red-300/70 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* News Articles */}
        {!loading && articles.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Badge className={getFilterBadgeColor(filter)}>
                      {filter.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors line-clamp-3">
                    {article.title}
                  </CardTitle>
                  {article.description && (
                    <CardDescription className="text-gray-400 line-clamp-3">
                      {article.description}
                    </CardDescription>
                  )}
                </CardHeader>

                {article.urlToImage && (
                  <div className="px-6 pb-3">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{article.source.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No articles found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? `No results for "${searchQuery}"` : 'No articles available for the selected filter'}
            </p>
            <Button onClick={() => fetchNews()} className="bg-purple-600 hover:bg-purple-700">
              Refresh News
            </Button>
          </div>
        )}

        {/* Stats Footer */}
        {articles.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Showing {articles.length} articles • Powered by GNews API
            </p>
          </div>
        )}
      </div>
    </div>
  );
}