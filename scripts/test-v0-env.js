#!/usr/bin/env node

/**
 * Test script to verify v0 environment setup
 * Run with: node scripts/test-v0-env.js
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from multiple sources
config({ path: '.env.local' });
config({ path: '.env.development' });
config({ path: '.env' });

console.log('🔍 Testing v0 Environment Setup...\n');

// Check multiple sources for V0_API_KEY
const sources = [
  { name: 'Environment Variable', value: process.env.V0_API_KEY },
  { name: 'NEXT_PUBLIC_V0_API_KEY', value: process.env.NEXT_PUBLIC_V0_API_KEY },
];

// Check config file
try {
  const configPath = join(process.cwd(), 'src/config/v0-config.ts');
  const configContent = readFileSync(configPath, 'utf8');
  
  // Simple check for hardcoded API key
  const hasHardcodedKey = configContent.includes("const V0_API_KEY = '") && 
                         !configContent.includes("const V0_API_KEY = 'your_actual_v0_api_key_here'");
  
  sources.push({ 
    name: 'Config File', 
    value: hasHardcodedKey ? 'SET_IN_CONFIG' : null 
  });
} catch (error) {
  console.log('⚠️  Could not read config file');
}

// Find the first available API key
let apiKey = null;
let source = null;

for (const src of sources) {
  if (src.value && src.value !== 'your_v0_api_key_here' && src.value !== 'your_actual_v0_api_key_here') {
    apiKey = src.value;
    source = src.name;
    break;
  }
}

if (!apiKey) {
  console.log('❌ V0_API_KEY is not set in any source');
  console.log('\n📝 Available options:');
  console.log('1. Edit src/config/v0-config.ts directly in Cursor');
  console.log('2. Edit .env.development file');
  console.log('3. Set PowerShell variable: $env:V0_API_KEY="your_key"');
  console.log('4. Set system environment variable');
  process.exit(1);
}

console.log(`✅ V0_API_KEY found in: ${source}`);
if (apiKey !== 'SET_IN_CONFIG') {
  console.log('   Key preview:', apiKey.substring(0, 8) + '...');
}

// Test basic configuration
console.log('\n🔗 v0 API Configuration:');
console.log('   Base URL: https://api.v0.dev/v1');
console.log('   Headers: Authorization: Bearer [API_KEY]');

console.log('\n🎉 Environment setup looks good!');
console.log('\n🚀 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/v0-demo');
console.log('3. Test the v0 integration');

console.log('\n💡 Tip: If you get API errors, verify your v0 API key with Vercel support'); 