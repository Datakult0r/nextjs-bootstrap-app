import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { v0Config } from '@/config/v0-config';

// Create a custom OpenAI-compatible client for v0
const v0 = createOpenAI({
  apiKey: process.env.V0_API_KEY || v0Config.apiKey || '',
  baseURL: v0Config.baseURL,
});

export async function POST(req: Request) {
  try {
    const { messages, model = 'v0-1.0-md' } = await req.json();

    const result = await streamText({
      model: v0(model),
      messages,
      maxTokens: 4000,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('V0 API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 