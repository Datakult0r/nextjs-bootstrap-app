'use client';

import { useState, useEffect } from 'react';
import { 
  OverlaySettings, 
  MonologueSettings, 
  NewsArticle, 
  CustomHeadline, 
  StreamHeadline,
  ContentMode,
  NewsFilter,
  Theme,
  PanelPosition,
  TickerPosition,
  FontSize
} from '@/types/hackwire';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Monitor, 
  Zap, 
  Brain, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  Play, 
  Pause,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Loader2
} from 'lucide-react';

export default function ControlPanelPage() {
  const [settings, setSettings] = useState<OverlaySettings | null>(null);
  const [monologueSettings, setMonologueSettings] = useState<MonologueSettings | null>(null);
  const [customHeadlines, setCustomHeadlines] = useState<CustomHeadline[]>([]);
  const [streamData, setStreamData] = useState<StreamHeadline[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [generatedMonologue, setGeneratedMonologue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overlay');

  // Form states
  const [newHeadline, setNewHeadline] = useState({ title: '', source: '', url: '' });
  const [previewMode, setPreviewMode] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch settings
      const settingsResponse = await fetch('/api/hackwire/settings?type=all');
      
      // Check if response is OK and is JSON
      if (!settingsResponse.ok) {
        throw new Error(`Settings API error: ${settingsResponse.status} ${settingsResponse.statusText}`);
      }
      
      const contentType = settingsResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await settingsResponse.text();
        throw new Error(`Settings API returned non-JSON response: ${text.substring(0, 100)}...`);
      }
      
      const settingsData = await settingsResponse.json();
      
      if (settingsData.success) {
        setSettings(settingsData.settings);
        setMonologueSettings(settingsData.monologue_settings);
      }

      // Fetch stream data
      const streamResponse = await fetch('/api/hackwire/stream');
      
      // Check if response is OK and is JSON
      if (!streamResponse.ok) {
        throw new Error(`Stream API error: ${streamResponse.status} ${streamResponse.statusText}`);
      }
      
      const streamContentType = streamResponse.headers.get('content-type');
      if (!streamContentType || !streamContentType.includes('application/json')) {
        const text = await streamResponse.text();
        throw new Error(`Stream API returned non-JSON response: ${text.substring(0, 100)}...`);
      }
      
      const streamData = await streamResponse.json();
      
      if (streamData.success) {
        setStreamData(streamData.headlines);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      const response = await fetch('/api/hackwire/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings,
          monologue_settings: monologueSettings
        })
      });

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
      if (!data.success) {
        throw new Error(data.error || 'Failed to save settings');
      }

      // Show success feedback
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const addCustomHeadline = async () => {
    if (!newHeadline.title.trim()) return;

    try {
      const response = await fetch('/api/hackwire/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_custom_headline',
          data: {
            ...newHeadline,
            priority: 5
          }
        })
      });

      // Check if response is OK and is JSON
      if (!response.ok) {
        throw new Error(`Stream API error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Stream API returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();
      if (data.success) {
        setNewHeadline({ title: '', source: '', url: '' });
        fetchData(); // Refresh data
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add headline');
    }
  };

  const generateMonologue = async () => {
    if (!selectedArticle) return;

    try {
      setGenerating(true);
      const response = await fetch('/api/hackwire/monologue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: selectedArticle.title,
          context: selectedArticle.description,
          image: selectedArticle.urlToImage
        })
      });

      // Check if response is OK and is JSON
      if (!response.ok) {
        throw new Error(`Monologue API error: ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Monologue API returned non-JSON response: ${text.substring(0, 100)}...`);
      }

      const data = await response.json();
      if (data.success) {
        setGeneratedMonologue(data.monologue);
        if (monologueSettings) {
          setMonologueSettings({
            ...monologueSettings,
            selected_headline: selectedArticle,
            generated_monologue: data.monologue
          });
        }
      } else {
        throw new Error(data.error || 'Failed to generate monologue');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate monologue');
    } finally {
      setGenerating(false);
    }
  };

  const copyOverlayURL = () => {
    const url = `${window.location.origin}/api/hackwire/overlay?format=html&mode=${settings?.content_mode || 'auto'}`;
    navigator.clipboard.writeText(url);
  };

  const openOverlayPreview = () => {
    const url = `${window.location.origin}/api/hackwire/overlay?format=html&mode=${settings?.content_mode || 'auto'}`;
    window.open(url, '_blank', 'width=800,height=600');
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          <span className="text-xl text-gray-300">Loading Control Panel...</span>
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
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hackwire Control Panel
              </h1>
              <p className="text-gray-400 mt-1">Manage your news stream and overlay settings</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={saveSettings} disabled={saving} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button onClick={fetchData} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
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

        {/* Error Display */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/30 mb-6">
            <CardContent className="pt-6">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overlay" className="data-[state=active]:bg-purple-600">
              <Monitor className="w-4 h-4 mr-2" />
              Overlay
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="monologue" className="data-[state=active]:bg-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              AI Monologue
            </TabsTrigger>
            <TabsTrigger value="stream" className="data-[state=active]:bg-purple-600">
              <Play className="w-4 h-4 mr-2" />
              Live Stream
            </TabsTrigger>
          </TabsList>

          {/* Overlay Settings Tab */}
          <TabsContent value="overlay" className="space-y-6">
            {settings && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Display Settings</CardTitle>
                    <CardDescription>Configure what elements to show</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-panel" className="text-gray-300">Show News Panel</Label>
                      <Switch
                        id="show-panel"
                        checked={settings.show_panel}
                        onCheckedChange={(checked) => setSettings({...settings, show_panel: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-ticker" className="text-gray-300">Show News Ticker</Label>
                      <Switch
                        id="show-ticker"
                        checked={settings.show_ticker}
                        onCheckedChange={(checked) => setSettings({...settings, show_ticker: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-breaking" className="text-gray-300">Show Breaking News</Label>
                      <Switch
                        id="show-breaking"
                        checked={settings.show_breaking}
                        onCheckedChange={(checked) => setSettings({...settings, show_breaking: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-timestamps" className="text-gray-300">Show Timestamps</Label>
                      <Switch
                        id="show-timestamps"
                        checked={settings.show_timestamps}
                        onCheckedChange={(checked) => setSettings({...settings, show_timestamps: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-sources" className="text-gray-300">Show Sources</Label>
                      <Switch
                        id="show-sources"
                        checked={settings.show_sources}
                        onCheckedChange={(checked) => setSettings({...settings, show_sources: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Appearance</CardTitle>
                    <CardDescription>Customize the visual style</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Theme</Label>
                      <Select value={settings.theme} onValueChange={(value: Theme) => setSettings({...settings, theme: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Font Size</Label>
                      <Select value={settings.font_size} onValueChange={(value: FontSize) => setSettings({...settings, font_size: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Opacity: {Math.round(settings.opacity * 100)}%</Label>
                      <Slider
                        value={[settings.opacity]}
                        onValueChange={([value]) => setSettings({...settings, opacity: value || 0.9})}
                        max={1}
                        min={0.1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Panel Position</Label>
                      <Select value={settings.panel_position} onValueChange={(value: PanelPosition) => setSettings({...settings, panel_position: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="right">Right</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="top-right">Top Right</SelectItem>
                          <SelectItem value="top-left">Top Left</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Ticker Position</Label>
                      <Select value={settings.ticker_position} onValueChange={(value: TickerPosition) => setSettings({...settings, ticker_position: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            {settings && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Content Mode</CardTitle>
                    <CardDescription>Choose how content is managed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select value={settings.content_mode} onValueChange={(value: ContentMode) => setSettings({...settings, content_mode: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="auto">Auto (API + Custom)</SelectItem>
                        <SelectItem value="manual">Manual Control</SelectItem>
                        <SelectItem value="custom_only">Custom Only</SelectItem>
                        <SelectItem value="ai_monologue">AI Monologue</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="space-y-2">
                      <Label className="text-gray-300">News Filter</Label>
                      <Select value={settings.filter} onValueChange={(value: NewsFilter) => setSettings({...settings, filter: value})}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
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

                    <div className="space-y-2">
                      <Label className="text-gray-300">Article Limit</Label>
                      <Input
                        type="number"
                        value={settings.limit}
                        onChange={(e) => setSettings({...settings, limit: parseInt(e.target.value) || 10})}
                        className="bg-gray-700 border-gray-600 text-white"
                        min="1"
                        max="50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Refresh Rate (seconds)</Label>
                      <Input
                        type="number"
                        value={settings.refresh_rate / 1000}
                        onChange={(e) => setSettings({...settings, refresh_rate: (parseInt(e.target.value) || 30) * 1000})}
                        className="bg-gray-700 border-gray-600 text-white"
                        min="10"
                        max="300"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Custom Headlines</CardTitle>
                    <CardDescription>Add your own news items</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Headline title..."
                        value={newHeadline.title}
                        onChange={(e) => setNewHeadline({...newHeadline, title: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Source name..."
                        value={newHeadline.source}
                        onChange={(e) => setNewHeadline({...newHeadline, source: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="URL (optional)..."
                        value={newHeadline.url}
                        onChange={(e) => setNewHeadline({...newHeadline, url: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Button onClick={addCustomHeadline} className="w-full bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Headline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* AI Monologue Tab */}
          <TabsContent value="monologue" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Generate Monologue</CardTitle>
                  <CardDescription>Create AI-powered news commentary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedArticle ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <h4 className="text-white font-medium mb-1">{selectedArticle.title}</h4>
                        <p className="text-gray-400 text-sm">{selectedArticle.source.name}</p>
                      </div>
                      <Button 
                        onClick={generateMonologue} 
                        disabled={generating}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {generating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Generate Monologue
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Select an article from the stream to generate a monologue</p>
                  )}

                  {generatedMonologue && (
                    <div className="space-y-2">
                      <Label className="text-gray-300">Generated Monologue</Label>
                      <Textarea
                        value={generatedMonologue}
                        onChange={(e) => setGeneratedMonologue(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
                        placeholder="Generated monologue will appear here..."
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Monologue Settings</CardTitle>
                  <CardDescription>Customize monologue appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {monologueSettings && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Style</Label>
                        <Select 
                          value={monologueSettings.monologue_style} 
                          onValueChange={(value) => setMonologueSettings({...monologueSettings, monologue_style: value as any})}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="futuristic">Futuristic</SelectItem>
                            <SelectItem value="elegant">Elegant</SelectItem>
                            <SelectItem value="gaming">Gaming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Background</Label>
                        <Select 
                          value={monologueSettings.monologue_background} 
                          onValueChange={(value) => setMonologueSettings({...monologueSettings, monologue_background: value as any})}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="gradient">Gradient</SelectItem>
                            <SelectItem value="solid">Solid</SelectItem>
                            <SelectItem value="glass">Glass</SelectItem>
                            <SelectItem value="blur">Blur</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Opacity: {Math.round(monologueSettings.monologue_opacity * 100)}%</Label>
                        <Slider
                          value={[monologueSettings.monologue_opacity]}
                          onValueChange={([value]) => setMonologueSettings({...monologueSettings, monologue_opacity: value || 0.9})}
                          max={1}
                          min={0.1}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-image" className="text-gray-300">Show Image</Label>
                        <Switch
                          id="show-image"
                          checked={monologueSettings.show_image}
                          onCheckedChange={(checked) => setMonologueSettings({...monologueSettings, show_image: checked})}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Stream Tab */}
          <TabsContent value="stream" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Current Stream Data</CardTitle>
                <CardDescription>Live headlines being displayed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {streamData.map((headline, index) => (
                    <div 
                      key={headline.id} 
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedArticle?.title === headline.title 
                          ? 'bg-purple-600/20 border-purple-500' 
                          : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedArticle({
                        title: headline.title,
                        description: '',
                        url: headline.url,
                        urlToImage: headline.image,
                        publishedAt: headline.publishedAt,
                        source: { name: headline.source }
                      })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1 line-clamp-2">{headline.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{headline.source}</span>
                            <Badge variant={headline.isCustom ? 'secondary' : 'outline'} className="text-xs">
                              {headline.isCustom ? 'Custom' : 'API'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Priority: {headline.priority}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}