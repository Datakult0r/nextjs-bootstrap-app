'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StreamDataResponse, OverlaySettings } from '@/types/hackwire';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Settings, 
  Radio, 
  Brain, 
  Zap, 
  Monitor, 
  ExternalLink, 
  ArrowRight,
  Clock,
  TrendingUp,
  Activity,
  Loader2
} from 'lucide-react';

export default function HackwirePage() {
  const [streamData, setStreamData] = useState<StreamDataResponse | null>(null);
  const [settings, setSettings] = useState<OverlaySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stream data
      const streamResponse = await fetch('/api/hackwire/stream');
      const streamData = await streamResponse.json();
      
      if (streamData.success) {
        setStreamData(streamData);
      }

      // Fetch settings
      const settingsResponse = await fetch('/api/hackwire/settings?type=overlay');
      const settingsData = await settingsResponse.json();
      
      if (settingsData.success) {
        setSettings(settingsData.settings);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          <span className="text-xl text-gray-300">Loading Hackwire...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Hackwire News System
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            AI-powered real-time news aggregation with advanced streaming capabilities for content creators and broadcasters
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white">{streamData?.count || 0}</div>
              <div className="text-sm text-gray-400">Headlines</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white">{streamData?.custom_count || 0}</div>
              <div className="text-sm text-gray-400">Custom</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white">{settings?.refresh_rate ? `${settings.refresh_rate / 1000}s` : '30s'}</div>
              <div className="text-sm text-gray-400">Refresh</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="text-2xl font-bold text-white capitalize">{streamData?.mode || 'Auto'}</div>
              <div className="text-sm text-gray-400">Mode</div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Link href="/hackwire/newswire">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-cyan-300 transition-colors">
                      Newswire
                    </CardTitle>
                    <CardDescription>Browse and search news articles</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">
                  Access real-time news from multiple sources with advanced filtering and search capabilities.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Real-time
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    Multi-source
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/hackwire/control-panel">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                      Control Panel
                    </CardTitle>
                    <CardDescription>Manage settings and content</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">
                  Configure overlay settings, manage custom headlines, and generate AI monologues.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Advanced
                  </Badge>
                  <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                    AI-Powered
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/hackwire/live">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-red-300 transition-colors">
                      Live Stream
                    </CardTitle>
                    <CardDescription>Monitor and control live feed</CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">
                  Monitor live stream status, manage OBS integration, and control real-time updates.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Live
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    OBS Ready
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-8 h-8 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">AI Monologue</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Generate intelligent commentary and analysis using advanced AI models
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="w-8 h-8 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">OBS Integration</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Seamless browser source integration for live streaming platforms
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Real-time Updates</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Automatic content refresh with customizable intervals and filters
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-8 h-8 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Custom Content</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Add your own headlines and manage content with priority controls
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Headlines Preview */}
        {streamData?.headlines && streamData.headlines.length > 0 && (
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Headlines</CardTitle>
                  <CardDescription>Latest news from your configured sources</CardDescription>
                </div>
                <Link href="/hackwire/newswire">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    View All
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {streamData.headlines.slice(0, 6).map((headline, index) => (
                  <div key={headline.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={headline.isCustom ? 'secondary' : 'outline'} className="text-xs">
                        {headline.isCustom ? 'Custom' : 'API'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(headline.publishedAt)}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2 line-clamp-2 text-sm">
                      {headline.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{headline.source}</span>
                      <span>Priority: {headline.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/30 mb-8">
            <CardContent className="pt-6">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>Hackwire News System • Powered by GNews API & OpenAI • Built with Next.js</p>
        </div>
      </div>
    </div>
  );
}