/**
 * v0 AI Configuration
 * 
 * Since .env.local might be in Cursor ignore, you can set your API key here.
 * Make sure to add this file to .gitignore if you put your actual API key here.
 */

// v0 Configuration
// Priority order:
// 1. Environment variable from .env.local (recommended)
// 2. Direct configuration (fallback)

export const v0Config = {
  // Primary: Environment variable (from .env.local)
  apiKey: process.env.V0_API_KEY || 
          // Fallback: Direct configuration (can be edited in Cursor)
          'v1:team_93AzRBNlYRhsLzeG0f8f9E6H:VYl6jFl2PiFlbGRLu02b2Xzz',
  
  baseURL: 'https://api.v0.dev',
  
  // Available models
  models: {
    'v0-1.0-md': 'v0-1.0-md',
    'v0-1.5-lg': 'v0-1.5-lg', // Will be available when released
  },
  
  // Default model
  defaultModel: 'v0-1.0-md' as const,
  
  // Request configuration
  maxTokens: 4000,
  temperature: 0.7,
  
  // Streaming configuration
  streaming: true,
}

export type V0Model = keyof typeof v0Config.models

// Helper to check if v0 is configured
export function isV0Configured(): boolean {
  return !!v0Config.apiKey && v0Config.apiKey !== 'your_actual_v0_api_key_here';
}

// Helper to get API headers
export function getV0Headers() {
  if (!v0Config.apiKey) {
    throw new Error('V0_API_KEY is not configured. Please set it in environment variables or config file.');
  }
  
  return {
    'Authorization': `Bearer ${v0Config.apiKey}`,
    'Content-Type': 'application/json',
  };
} 