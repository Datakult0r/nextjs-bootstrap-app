import { NextRequest, NextResponse } from 'next/server';
import { StreamDataResponse, OverlaySettings, APIResponse } from '@/types/hackwire';

// GET method for overlay data (used by OBS browser source)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'auto';
    const format = searchParams.get('format') || 'json';

    // For the overlay, we'll return a simple HTML response directly
    if (format === 'html') {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Hackwire Overlay</title>
          <style>
            body {
              background: transparent;
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              color: white;
              overflow: hidden;
            }
            .overlay-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }
            .news-panel {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 300px;
              background: rgba(0, 0, 0, 0.7);
              border-radius: 8px;
              padding: 15px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .panel-header {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #8b5cf6;
            }
            .headline {
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .headline:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .headline-title {
              font-size: 14px;
              margin-bottom: 5px;
            }
            .headline-meta {
              font-size: 12px;
              color: #9ca3af;
            }
            .ticker {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background: rgba(0, 0, 0, 0.8);
              padding: 10px;
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
            }
            .ticker-content {
              display: inline-block;
              animation: scroll-left 30s linear infinite;
            }
            @keyframes scroll-left {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          </style>
        </head>
        <body>
          <div class="overlay-container">
            <div class="news-panel">
              <div class="panel-header">📰 HACKWIRE NEWS</div>
              <div class="headline">
                <div class="headline-title">Hackwire Overlay System Active</div>
                <div class="headline-meta">System Status: Online</div>
              </div>
              <div class="headline">
                <div class="headline-title">Real-time News Updates</div>
                <div class="headline-meta">Mode: ${mode}</div>
              </div>
              <div class="headline">
                <div class="headline-title">OBS Integration Ready</div>
                <div class="headline-meta">Refresh: 30s</div>
              </div>
            </div>
            <div class="ticker">
              <div class="ticker-content">
                📰 Hackwire News System • Real-time updates • OBS Integration Ready • Mode: ${mode} •
                📰 Hackwire News System • Real-time updates • OBS Integration Ready • Mode: ${mode} •
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    // Return JSON data for API consumers
    return NextResponse.json({
      success: true,
      message: 'Hackwire overlay system is active',
      mode: mode,
      overlay_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/hackwire/overlay?format=html&mode=${mode}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Overlay API error:', error);
    
    const { searchParams } = new URL(request.url);
    if (searchParams.get('format') === 'html') {
      return new NextResponse(`
        <html>
          <body style="background: transparent; color: red; font-family: Arial;">
            <div>Error loading overlay: ${error instanceof Error ? error.message : 'Unknown error'}</div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: 500
      });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate overlay',
      timestamp: new Date().toISOString()
    } as APIResponse<any>, { status: 500 });
  }
}

function generateOverlayHTML(streamData: StreamDataResponse, settings: OverlaySettings): string {
  const headlines = streamData.headlines.slice(0, settings.limit);
  
  // Generate CSS based on settings
  const css = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        background: transparent;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
      }
      
      .overlay-container {
        position: relative;
        width: 100%;
        height: 100%;
        opacity: ${settings.opacity};
      }
      
      .news-panel {
        position: absolute;
        ${getPanelPositionCSS(settings.panel_position)}
        width: 400px;
        max-height: 600px;
        background: ${getThemeBackground(settings.theme)};
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: ${settings.show_panel ? 'block' : 'none'};
        overflow-y: auto;
      }
      
      .panel-header {
        color: ${getThemeTextColor(settings.theme)};
        font-size: ${getFontSize(settings.font_size, 'header')};
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
        border-bottom: 2px solid ${getThemeAccentColor(settings.theme)};
        padding-bottom: 10px;
      }
      
      .headline-item {
        margin-bottom: 15px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        border-left: 3px solid ${getThemeAccentColor(settings.theme)};
        transition: all 0.3s ease;
      }
      
      .headline-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
      }
      
      .headline-title {
        color: ${getThemeTextColor(settings.theme)};
        font-size: ${getFontSize(settings.font_size, 'title')};
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: 8px;
      }
      
      .headline-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${getFontSize(settings.font_size, 'meta')};
        color: ${getThemeSecondaryColor(settings.theme)};
      }
      
      .headline-source {
        font-weight: 500;
        display: ${settings.show_sources ? 'inline' : 'none'};
      }
      
      .headline-time {
        font-size: 0.9em;
        display: ${settings.show_timestamps ? 'inline' : 'none'};
      }
      
      .news-ticker {
        position: absolute;
        ${getTickerPositionCSS(settings.ticker_position)}
        width: 100%;
        height: 60px;
        background: ${getThemeBackground(settings.theme)};
        display: ${settings.show_ticker ? 'flex' : 'none'};
        align-items: center;
        overflow: hidden;
        border-top: 2px solid ${getThemeAccentColor(settings.theme)};
        border-bottom: 2px solid ${getThemeAccentColor(settings.theme)};
      }
      
      .ticker-content {
        display: flex;
        animation: scroll-left ${60 / (settings.ticker_speed / 100)}s linear infinite;
        white-space: nowrap;
      }
      
      .ticker-item {
        color: ${getThemeTextColor(settings.theme)};
        font-size: ${getFontSize(settings.font_size, 'ticker')};
        font-weight: 500;
        margin-right: 50px;
        flex-shrink: 0;
      }
      
      .breaking-news {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff4444, #cc0000);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        font-size: ${getFontSize(settings.font_size, 'breaking')};
        box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);
        animation: pulse 2s infinite;
        display: ${settings.show_breaking && hasBreakingNews(headlines) ? 'block' : 'none'};
      }
      
      @keyframes scroll-left {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      .live-indicator {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        animation: pulse 2s infinite;
      }
      
      .live-indicator::before {
        content: "●";
        margin-right: 5px;
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    </style>
  `;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hackwire News Overlay</title>
      ${css}
    </head>
    <body>
      <div class="overlay-container">
        <div class="live-indicator">LIVE</div>
        
        ${settings.show_breaking && hasBreakingNews(headlines) ? `
          <div class="breaking-news">
            🚨 BREAKING NEWS
          </div>
        ` : ''}
        
        <div class="news-panel">
          <div class="panel-header">
            📰 HACKWIRE NEWS
          </div>
          ${headlines.map(headline => `
            <div class="headline-item">
              <div class="headline-title">${escapeHtml(headline.title)}</div>
              <div class="headline-meta">
                <span class="headline-source">${escapeHtml(headline.source)}</span>
                <span class="headline-time">${formatTime(headline.publishedAt)}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="news-ticker">
          <div class="ticker-content">
            ${headlines.map(headline => `
              <span class="ticker-item">📰 ${escapeHtml(headline.title)} • ${escapeHtml(headline.source)}</span>
            `).join('')}
          </div>
        </div>
      </div>
      
      <script>
        // Auto-refresh every ${settings.refresh_rate}ms
        setTimeout(() => {
          window.location.reload();
        }, ${settings.refresh_rate});
        
        // Add smooth transitions
        document.addEventListener('DOMContentLoaded', () => {
          const headlines = document.querySelectorAll('.headline-item');
          headlines.forEach((item, index) => {
            item.style.animationDelay = (index * 0.1) + 's';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
          });
        });
        
        // CSS for fade in animation
        const style = document.createElement('style');
        style.textContent = \`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .headline-item {
            opacity: 0;
          }
        \`;
        document.head.appendChild(style);
      </script>
    </body>
    </html>
  `;

  return html;
}

// Helper functions for CSS generation
function getPanelPositionCSS(position: string): string {
  switch (position) {
    case 'right': return 'top: 20px; right: 20px;';
    case 'left': return 'top: 20px; left: 20px;';
    case 'top-right': return 'top: 20px; right: 20px;';
    case 'top-left': return 'top: 20px; left: 20px;';
    case 'hidden': return 'display: none;';
    default: return 'top: 20px; right: 20px;';
  }
}

function getTickerPositionCSS(position: string): string {
  switch (position) {
    case 'bottom': return 'bottom: 0; left: 0;';
    case 'top': return 'top: 0; left: 0;';
    case 'hidden': return 'display: none;';
    default: return 'bottom: 0; left: 0;';
  }
}

function getThemeBackground(theme: string): string {
  switch (theme) {
    case 'dark': return 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))';
    case 'light': return 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 244, 246, 0.95))';
    case 'gaming': return 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))';
    case 'minimal': return 'rgba(0, 0, 0, 0.8)';
    default: return 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))';
  }
}

function getThemeTextColor(theme: string): string {
  switch (theme) {
    case 'light': return '#1f2937';
    default: return '#ffffff';
  }
}

function getThemeSecondaryColor(theme: string): string {
  switch (theme) {
    case 'light': return '#6b7280';
    default: return '#d1d5db';
  }
}

function getThemeAccentColor(theme: string): string {
  switch (theme) {
    case 'gaming': return '#8b5cf6';
    case 'light': return '#3b82f6';
    default: return '#06b6d4';
  }
}

function getFontSize(size: string, element: string): string {
  const sizes = {
    small: { header: '18px', title: '14px', meta: '11px', ticker: '14px', breaking: '16px' },
    medium: { header: '20px', title: '16px', meta: '12px', ticker: '16px', breaking: '18px' },
    large: { header: '24px', title: '18px', meta: '14px', ticker: '18px', breaking: '20px' }
  };
  
  return sizes[size as keyof typeof sizes]?.[element as keyof typeof sizes.small] || sizes.medium[element as keyof typeof sizes.medium];
}

function hasBreakingNews(headlines: any[]): boolean {
  return headlines.some(h => h.priority > 7 || h.title.toLowerCase().includes('breaking'));
}

function escapeHtml(text: string): string {
  const div = { innerHTML: '' } as any;
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString();
}