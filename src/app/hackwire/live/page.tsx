'use client';

import { useState, useEffect } from 'react';
import { StreamHeadline, StreamDataResponse, OverlaySettings } from '@/types/hackwire';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Monitor, 
  Eye, 
  EyeOff, 
  Copy, 
  ExternalLink,
  Loader2,
  Radio,
  Clock,
  Globe,
  Zap,
  Settings
} from 'lucide-react';

export default function LivePage() {
  const [streamData, setStreamData] = useState<StreamDataResponse | null>(null);
  const [settings, setSettings] = useState<OverlaySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchStreamData = async () => {
    try {
      setError(null);
      
      const response = await fetch('/api/hackwire/stream');
      
      // Check if response is OK and is JSON
      if (!response.ok) {
        throw new Error(`Stream API error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Stream API returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      const data: StreamDataResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch stream data');
      }
      
      setStreamData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stream data');
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/hackwire/settings?type=overlay');
      
      // Check if response is OK and is JSON
      if (!response.ok) {
        throw new Error(`Settings API error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Settings API returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();
      
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchStreamData(), fetchSettings()]);
    setLoading(false);
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  const copyOverlayURL = () => {
    const mode = settings?.content_mode || 'auto';
    const url = `${window.location.origin}/api/hackwire/overlay?format=html&mode=${mode}`;
    navigator.clipboard.writeText(url);
  };

  const openOverlayPreview = () => {
    const mode = settings?.content_mode || 'auto';
    const url = `${window.location.origin}/api/hackwire/overlay?format=html&mode=${mode}`;
    window.open(url, '_blank', 'width=800,height=600');
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

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (priority >= 6) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (priority >= 4) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 8) return 'URGENT';
    if (priority >= 6) return 'HIGH';
    if (priority >= 4) return 'MEDIUM';
    return 'LOW';
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh && isLive && settings?.refresh_rate) {
      interval = setInterval(fetchStreamData, settings.refresh_rate);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, isLive, settings?.refresh_rate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          <span className="text-xl text-gray-300">Loading Live Stream...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hackwire Live Stream
              </h1>
              <p className="text-gray-400 mt-1">Real-time news stream management and monitoring</p>
            </div>
          </div>

          {/* Live Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              onClick={toggleLive}
              className={`${isLive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isLive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Live
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Go Live
                </>
              )}
            </Button>

            <Button
              onClick={() => setAutoRefresh(!autoRefresh)}
              variant={autoRefresh ? 'default' : 'outline'}
              className={autoRefresh ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh && isLive ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>

            <Button onClick={fetchStreamData} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Manual Refresh
            </Button>

            <Button onClick={copyOverlayURL} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Copy className="w-4 h-4 mr-2" />
              Copy OBS URL
            </Button>

            <Button onClick={openOverlayPreview} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview Overlay
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                <div>
                  <p className="text-2xl font-bold text-white">{isLive ? 'LIVE' : 'OFFLINE'}</p>
                  <p className="text-gray-400 text-sm">Stream Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{streamData?.count || 0}</p>
                  <p className="text-gray-400 text-sm">Total Headlines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{streamData?.custom_count || 0}</p>
                  <p className="text-gray-400 text-sm">Custom Headlines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {settings?.refresh_rate ? `${settings.refresh_rate / 1000}s` : 'N/A'}
                  </p>
                  <p className="text-gray-400 text-sm">Refresh Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/30 mb-6">
            <CardContent className="pt-6">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Stream Data */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Headlines */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Live Headlines</CardTitle>
                    <CardDescription>
                      Currently streaming • Mode: {streamData?.mode?.toUpperCase() || 'AUTO'}
                    </CardDescription>
                  </div>
                  {lastUpdate && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatTimeAgo(lastUpdate.toISOString())}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {streamData?.headlines?.map((headline, index) => (
                    <div key={headline.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(headline.priority)}>
                            {getPriorityLabel(headline.priority)}
                          </Badge>
                          <Badge variant={headline.isCustom ? 'secondary' : 'outline'} className="text-xs">
                            {headline.isCustom ? 'Custom' : 'API'}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(headline.publishedAt)}
                        </span>
                      </div>
                      
                      <h4 className="text-white font-medium mb-2 line-clamp-2">
                        {headline.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>{headline.source}</span>
                        </div>
                        <span>Priority: {headline.priority}</span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400">No headlines available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stream Settings & Info */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Stream Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {settings ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Content Mode:</span>
                      <span className="text-white capitalize">{settings.content_mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">News Filter:</span>
                      <span className="text-white capitalize">{settings.filter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Article Limit:</span>
                      <span className="text-white">{settings.limit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Theme:</span>
                      <span className="text-white capitalize">{settings.theme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Panel Position:</span>
                      <span className="text-white capitalize">{settings.panel_position.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ticker:</span>
                      <span className="text-white">{settings.show_ticker ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Breaking News:</span>
                      <span className="text-white">{settings.show_breaking ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400">Loading settings...</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  OBS Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Use this URL as a Browser Source in OBS Studio:
                </p>
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  <code className="text-xs text-cyan-400 break-all">
                    {`${typeof window !== 'undefined' ? window.location.origin : ''}/api/hackwire/overlay?format=html&mode=${settings?.content_mode || 'auto'}`}
                  </code>
                </div>
                <div className="text-xs text-gray-400">
                  <p>• Width: 1920px</p>
                  <p>• Height: 1080px</p>
                  <p>• Auto-refresh: {settings?.refresh_rate ? `${settings.refresh_rate / 1000}s` : '30s'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Stream Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {streamData?.meta && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">API Calls:</span>
                      <span className="text-white">{streamData.meta.apiCalls || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Update:</span>
                      <span className="text-white text-xs">
                        {streamData.meta.nextUpdate ? formatTimeAgo(streamData.meta.nextUpdate) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Custom Available:</span>
                      <span className="text-white">{streamData.meta.customHeadlinesAvailable}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}