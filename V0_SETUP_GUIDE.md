# v0 Integration Setup Guide

## Overview
This guide shows how to integrate v0 (Vercel's AI assistant) with your Next.js application using the AI SDK.

## 🔧 Configuration Setup

### Primary Method: Environment Variables (.env.local)

**Step 1**: Create `.env.local` file in your project root:
```bash
# .env.local (recommended - secure and gitignored)
V0_API_KEY=your_v0_api_key_here
```

**Step 2**: The configuration automatically prioritizes environment variables:
```typescript
// src/config/v0-config.ts
apiKey: process.env.V0_API_KEY || 'fallback_key'
```

### Fallback Method: Direct Configuration

If `.env.local` is not accessible (e.g., in Cursor ignore), you can edit the config directly:
```typescript
// src/config/v0-config.ts - Edit the fallback value
apiKey: process.env.V0_API_KEY || 'your_api_key_here'
```

## 🚀 Quick Start

### 1. Test the Setup
```bash
node scripts/test-v0-env.js
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Visit Demo Page
Navigate to: `http://localhost:3000/v0-demo`

## 📚 Usage Examples

### Client-Side Hook
```tsx
'use client'
import { useV0Chat } from '@/hooks/use-v0-chat'

export default function MyComponent() {
  const { generateComponent, isLoading } = useV0Chat()
  
  const handleGenerate = async () => {
    const result = await generateComponent('Create a modern button component')
    console.log(result)
  }
  
  return (
    <button onClick={handleGenerate} disabled={isLoading}>
      Generate Component
    </button>
  )
}
```

### Server Actions
```tsx
import { generateV0Component } from '@/app/actions/v0-actions'

export default async function ServerComponent() {
  const component = await generateV0Component('Create a card component')
  
  return <div>{component}</div>
}
```

### API Route Usage
```typescript
// Direct API call
const response = await fetch('/api/v0-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Create a button' }],
    model: 'v0-1.0-md'
  })
})
```

## 🛠 Available Methods

### useV0Chat Hook
- `generateComponent(prompt)` - Generate React components
- `improveCode(code, instructions)` - Enhance existing code
- `debugCode(code, error)` - Fix code issues
- `chat(messages)` - General chat with v0

### Server Actions
- `generateV0Component(prompt)` - Server-side component generation
- `improveV0Code(code, instructions)` - Server-side code improvement
- `debugV0Code(code, error)` - Server-side debugging
- `optimizeV0Code(code)` - Performance optimization
- `generateV0Tests(code)` - Generate test cases

### Server Utilities
- `generateV0Text(prompt)` - Generate text responses
- `streamV0Text(prompt)` - Stream text responses
- `generateV0Object(prompt, schema)` - Generate structured objects

## 🎯 Model Selection

Currently available:
- `v0-1.0-md` - Current stable model
- `v0-1.5-lg` - Will be available when released

## 🔍 Troubleshooting

### API Key Issues
1. **Check .env.local**: Ensure `V0_API_KEY` is set correctly
2. **Check fallback**: Verify the fallback key in `src/config/v0-config.ts`
3. **Test environment**: Run `node scripts/test-v0-env.js`

### Common Errors
- **401 Unauthorized**: Invalid API key
- **429 Rate Limited**: Too many requests
- **500 Server Error**: Check server logs

### Environment Variable Priority
1. `.env.local` (recommended)
2. Direct configuration fallback
3. System environment variables

## 📁 File Structure
```
src/
├── app/
│   ├── api/v0-chat/route.ts          # Streaming API endpoint
│   ├── actions/v0-actions.ts         # Server actions
│   └── v0-demo/page.tsx              # Demo interface
├── components/
│   └── v0-chat-demo.tsx              # Demo component
├── config/
│   └── v0-config.ts                  # Configuration
├── hooks/
│   └── use-v0-chat.ts                # Client hook
└── libs/
    └── v0-client.ts                  # Server utilities
```

## 🔐 Security Notes

- Keep your API key secure in `.env.local`
- Never commit API keys to version control
- Use environment variables in production
- The fallback method is for development convenience only

## 🚀 Production Deployment

For production, ensure:
1. Set `V0_API_KEY` environment variable
2. Remove any hardcoded keys from config
3. Use proper error handling
4. Implement rate limiting if needed

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify your API key is valid
3. Test with the demo page first
4. Check server logs for detailed errors 