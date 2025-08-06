import { NextRequest, NextResponse } from 'next/server';
import { OverlaySettings, SettingsSaveRequest, SettingsResponse, MonologueSettings, APIResponse } from '@/types/hackwire';

// In-memory storage for settings (in production, this would be a database)
let currentSettings: OverlaySettings = {
  show_ticker: true,
  show_panel: true,
  show_breaking: true,
  filter: 'top',
  limit: 10,
  refresh_rate: 30000,
  panel_position: 'right',
  ticker_position: 'bottom',
  ticker_speed: 50,
  theme: 'dark',
  opacity: 0.9,
  font_size: 'medium',
  show_timestamps: true,
  show_sources: true,
  content_mode: 'auto',
  use_custom_headlines: true,
  mode_settings: {
    auto: {
      theme: 'dark',
      opacity: 0.9,
      font_size: 'medium',
      panel_position: 'right',
      ticker_position: 'bottom',
      show_ticker: true,
      show_panel: true,
      show_breaking: true,
      filter: 'top',
      limit: 10,
      refresh_rate: 30000,
      ticker_speed: 50,
      show_timestamps: true,
      show_sources: true
    },
    manual: {
      theme: 'dark',
      opacity: 0.8,
      font_size: 'medium',
      panel_position: 'right',
      ticker_position: 'bottom'
    },
    custom_only: {
      theme: 'gaming',
      opacity: 0.95,
      font_size: 'large',
      panel_position: 'top-right',
      ticker_position: 'top'
    },
    ai_monologue: {
      theme: 'minimal',
      opacity: 0.85,
      font_size: 'large',
      panel_position: 'left',
      ticker_position: 'hidden'
    }
  }
};

let monologueSettings: MonologueSettings = {
  selected_headline: null,
  generated_monologue: '',
  image_position: 'top-right',
  show_image: true,
  monologue_style: 'modern',
  monologue_opacity: 0.9,
  monologue_background: 'gradient',
  monologue_border_style: 'rounded',
  monologue_animation: 'fade',
  monologue_font: 'default',
  monologue_text_color: '#ffffff',
  monologue_accent_color: '#8b5cf6'
};

// GET method for retrieving current settings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overlay';

    if (type === 'overlay') {
      return NextResponse.json({
        success: true,
        settings: currentSettings,
        timestamp: new Date().toISOString()
      } as SettingsResponse & { settings: OverlaySettings });
    }

    if (type === 'monologue') {
      return NextResponse.json({
        success: true,
        monologue_settings: monologueSettings,
        timestamp: new Date().toISOString()
      } as SettingsResponse & { monologue_settings: MonologueSettings });
    }

    if (type === 'all') {
      return NextResponse.json({
        success: true,
        settings: currentSettings,
        monologue_settings: monologueSettings,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid settings type requested'
    } as APIResponse<SettingsResponse>, { status: 400 });

  } catch (error) {
    console.error('Settings GET error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to retrieve settings',
      timestamp: new Date().toISOString()
    } as APIResponse<SettingsResponse>, { status: 500 });
  }
}

// POST method for saving settings
export async function POST(request: NextRequest) {
  try {
    const body: SettingsSaveRequest = await request.json();
    const { settings, monologue_settings } = body;

    // Update overlay settings if provided
    if (settings) {
      // Validate required fields
      const requiredFields = ['filter', 'limit', 'refresh_rate', 'content_mode'];
      for (const field of requiredFields) {
        if (!(field in settings)) {
          return NextResponse.json({
            success: false,
            error: `Missing required field: ${field}`,
            timestamp: new Date().toISOString()
          } as APIResponse<SettingsResponse>, { status: 400 });
        }
      }

      // Merge with current settings
      currentSettings = {
        ...currentSettings,
        ...settings
      };
    }

    // Update monologue settings if provided
    if (monologue_settings) {
      monologueSettings = {
        ...monologueSettings,
        ...monologue_settings
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully',
      timestamp: new Date().toISOString()
    } as SettingsResponse);

  } catch (error) {
    console.error('Settings POST error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save settings',
      timestamp: new Date().toISOString()
    } as APIResponse<SettingsResponse>, { status: 500 });
  }
}

// PUT method for updating specific setting values
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, key, value } = body;

    if (!type || !key || value === undefined) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters: type, key, value',
        timestamp: new Date().toISOString()
      } as APIResponse<SettingsResponse>, { status: 400 });
    }

    if (type === 'overlay') {
      if (key in currentSettings) {
        (currentSettings as any)[key] = value;
      } else {
        return NextResponse.json({
          success: false,
          error: `Invalid overlay setting key: ${key}`,
          timestamp: new Date().toISOString()
        } as APIResponse<SettingsResponse>, { status: 400 });
      }
    } else if (type === 'monologue') {
      if (key in monologueSettings) {
        (monologueSettings as any)[key] = value;
      } else {
        return NextResponse.json({
          success: false,
          error: `Invalid monologue setting key: ${key}`,
          timestamp: new Date().toISOString()
        } as APIResponse<SettingsResponse>, { status: 400 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid settings type. Use "overlay" or "monologue"',
        timestamp: new Date().toISOString()
      } as APIResponse<SettingsResponse>, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${type} setting '${key}' updated successfully`,
      timestamp: new Date().toISOString()
    } as SettingsResponse);

  } catch (error) {
    console.error('Settings PUT error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update setting',
      timestamp: new Date().toISOString()
    } as APIResponse<SettingsResponse>, { status: 500 });
  }
}

// DELETE method for resetting settings to defaults
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    if (type === 'overlay' || type === 'all') {
      // Reset overlay settings to defaults
      currentSettings = {
        show_ticker: true,
        show_panel: true,
        show_breaking: true,
        filter: 'top',
        limit: 10,
        refresh_rate: 30000,
        panel_position: 'right',
        ticker_position: 'bottom',
        ticker_speed: 50,
        theme: 'dark',
        opacity: 0.9,
        font_size: 'medium',
        show_timestamps: true,
        show_sources: true,
        content_mode: 'auto',
        use_custom_headlines: true,
        mode_settings: {
          auto: {
            theme: 'dark',
            opacity: 0.9,
            font_size: 'medium',
            panel_position: 'right',
            ticker_position: 'bottom',
            show_ticker: true,
            show_panel: true,
            show_breaking: true,
            filter: 'top',
            limit: 10,
            refresh_rate: 30000,
            ticker_speed: 50,
            show_timestamps: true,
            show_sources: true
          },
          manual: {
            theme: 'dark',
            opacity: 0.8,
            font_size: 'medium',
            panel_position: 'right',
            ticker_position: 'bottom'
          },
          custom_only: {
            theme: 'gaming',
            opacity: 0.95,
            font_size: 'large',
            panel_position: 'top-right',
            ticker_position: 'top'
          },
          ai_monologue: {
            theme: 'minimal',
            opacity: 0.85,
            font_size: 'large',
            panel_position: 'left',
            ticker_position: 'hidden'
          }
        }
      };
    }

    if (type === 'monologue' || type === 'all') {
      // Reset monologue settings to defaults
      monologueSettings = {
        selected_headline: null,
        generated_monologue: '',
        image_position: 'top-right',
        show_image: true,
        monologue_style: 'modern',
        monologue_opacity: 0.9,
        monologue_background: 'gradient',
        monologue_border_style: 'rounded',
        monologue_animation: 'fade',
        monologue_font: 'default',
        monologue_text_color: '#ffffff',
        monologue_accent_color: '#8b5cf6'
      };
    }

    return NextResponse.json({
      success: true,
      message: `${type} settings reset to defaults`,
      timestamp: new Date().toISOString()
    } as SettingsResponse);

  } catch (error) {
    console.error('Settings DELETE error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reset settings',
      timestamp: new Date().toISOString()
    } as APIResponse<SettingsResponse>, { status: 500 });
  }
}