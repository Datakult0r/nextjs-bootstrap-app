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
