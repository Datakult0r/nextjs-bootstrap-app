// TypeScript interfaces for Hackwire news system
// Based on the PHP data structures from the original system

export interface NewsSource {
  name: string;
}

export interface NewsArticle {
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  image?: string;
  publishedAt: string;
  source: NewsSource;
}

export interface NewsResponse {
  success: boolean;
  articles?: NewsArticle[];
  totalResults?: number;
  error?: string;
  timestamp?: string;
}

// Custom headline structure
export interface CustomHeadline {
  title: string;
  source: string;
  url: string;
  image?: string;
  publishedAt: string;
}

// Stream data structure
export interface StreamHeadline {
  id: number;
  title: string;
  source: string;
  image?: string;
  publishedAt: string;
  url: string;
  category: string;
  priority: number;
  isCustom: boolean;
  isAIMode?: boolean;
}

export interface StreamDataResponse {
  success: boolean;
  timestamp: string;
  count: number;
  custom_count: number;
  api_count: number;
  mode: ContentMode;
  filter: string;
  headlines: StreamHeadline[];
  meta: {
    refreshRate: number;
    apiCalls?: number;
    nextUpdate: string;
    contentMode: ContentMode;
    customHeadlinesAvailable: number;
  };
  error?: string;
}

// Overlay settings structure
export interface OverlaySettings {
  show_ticker: boolean;
  show_panel: boolean;
  show_breaking: boolean;
  filter: NewsFilter;
  limit: number;
  refresh_rate: number;
  panel_position: PanelPosition;
  ticker_position: TickerPosition;
  ticker_speed: number;
  theme: Theme;
  opacity: number;
  font_size: FontSize;
  show_timestamps: boolean;
  show_sources: boolean;
  content_mode: ContentMode;
  use_custom_headlines: boolean;
  mode_settings: {
    [key in ContentMode]: ModeSettings;
  };
}

export interface ModeSettings {
  theme: Theme;
  opacity: number;
  font_size: FontSize;
  panel_position: PanelPosition;
  ticker_position: TickerPosition;
  show_ticker?: boolean;
  show_panel?: boolean;
  show_breaking?: boolean;
  filter?: NewsFilter;
  limit?: number;
  refresh_rate?: number;
  ticker_speed?: number;
  show_timestamps?: boolean;
  show_sources?: boolean;
}

// AI Monologue structures
export interface MonologueSettings {
  selected_headline: NewsArticle | null;
  generated_monologue: string;
  image_position: ImagePosition;
  show_image: boolean;
  monologue_style: MonologueStyle;
  monologue_opacity: number;
  monologue_background: MonologueBackground;
  monologue_border_style: MonologueBorderStyle;
  monologue_animation: MonologueAnimation;
  monologue_font: MonologueFont;
  monologue_text_color: string;
  monologue_accent_color: string;
}

export interface MonologueGenerationRequest {
  headline: string;
  context?: string;
  image?: string;
}

export interface MonologueGenerationResponse {
  success: boolean;
  monologue?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model?: string;
  error?: string;
}

// Search functionality
export interface NewsSearchRequest {
  query?: string;
  filter?: NewsFilter;
  limit?: number;
}

export interface NewsSearchResponse {
  success: boolean;
  articles?: NewsArticle[];
  error?: string;
}

// Settings save/load
export interface SettingsSaveRequest {
  settings: OverlaySettings;
  custom_headlines?: CustomHeadline[];
  monologue_settings?: MonologueSettings;
}

export interface SettingsResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
}

// Update check
export interface UpdateCheckResponse {
  success: boolean;
  hasUpdates: boolean;
  newCount: number;
  totalArticles: number;
  lastChecked: string;
  filter: string;
  error?: string;
}

// Enums and literal types
export type NewsFilter = 'top' | 'tech' | 'business' | 'science';
export type ContentMode = 'auto' | 'manual' | 'custom_only' | 'ai_monologue';
export type PanelPosition = 'right' | 'left' | 'top-right' | 'top-left' | 'hidden';
export type TickerPosition = 'bottom' | 'top' | 'hidden';
export type Theme = 'dark' | 'light' | 'gaming' | 'minimal';
export type FontSize = 'small' | 'medium' | 'large';
export type ImagePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
export type MonologueStyle = 'modern' | 'minimal' | 'futuristic' | 'elegant' | 'gaming';
export type MonologueBackground = 'gradient' | 'solid' | 'glass' | 'blur' | 'none';
export type MonologueBorderStyle = 'rounded' | 'sharp' | 'glow' | 'none';
export type MonologueAnimation = 'fade' | 'slide' | 'scale';
export type MonologueFont = 'default' | 'modern' | 'elegant' | 'gaming';

// Breaking news detection
export interface BreakingNewsAlert {
  headline: StreamHeadline;
  timestamp: string;
  keywords: string[];
}

// API Error types
export interface APIError {
  success: false;
  error: string;
  code?: string;
  timestamp: string;
}

// Generic API Response wrapper
export type APIResponse<T> = 
  | (T & { success: true })
  | APIError;

// Utility types for form handling
export interface ControlPanelState {
  settings: OverlaySettings;
  customHeadlines: CustomHeadline[];
  monologueSettings: MonologueSettings;
  searchResults: NewsArticle[];
  selectedHeadlineForMonologue: NewsArticle | null;
  currentMonologue: string;
  isLoading: boolean;
  error: string | null;
}

// WebSocket message types for real-time updates
export interface WebSocketMessage {
  type: 'settings_update' | 'headlines_update' | 'breaking_news' | 'monologue_generated';
  data: any;
  timestamp: string;
}
