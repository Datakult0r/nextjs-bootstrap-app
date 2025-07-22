import { generateText, streamText, generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { v0Config } from '@/config/v0-config';

// Create v0 client with fallback to config file
const v0 = createOpenAI({
  apiKey: process.env.V0_API_KEY || v0Config.apiKey || '',
  baseURL: v0Config.baseURL,
});

export type V0Model = 'v0-1.0-md' | 'v0-1.5-lg';

export interface V0ChatOptions {
  model?: V0Model;
  maxTokens?: number;
  temperature?: number;
  systemMessage?: string;
}

/**
 * Generate text using v0 models
 */
export async function generateV0Text(
  prompt: string,
  options: V0ChatOptions = {}
) {
  const {
    model = 'v0-1.0-md',
    maxTokens = 4000,
    temperature = 0.7,
    systemMessage,
  } = options;

  const messages = [];
  
  if (systemMessage) {
    messages.push({ role: 'system' as const, content: systemMessage });
  }
  
  messages.push({ role: 'user' as const, content: prompt });

  try {
    const result = await generateText({
      model: v0(model),
      messages,
      maxTokens,
      temperature,
    });

    return {
      success: true,
      text: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('V0 generateText error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Stream text using v0 models
 */
export async function streamV0Text(
  prompt: string,
  options: V0ChatOptions = {}
) {
  const {
    model = 'v0-1.0-md',
    maxTokens = 4000,
    temperature = 0.7,
    systemMessage,
  } = options;

  const messages = [];
  
  if (systemMessage) {
    messages.push({ role: 'system' as const, content: systemMessage });
  }
  
  messages.push({ role: 'user' as const, content: prompt });

  return streamText({
    model: v0(model),
    messages,
    maxTokens,
    temperature,
  });
}

/**
 * Generate structured object using v0 models
 */
export async function generateV0Object<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  options: V0ChatOptions = {}
) {
  const {
    model = 'v0-1.0-md',
    maxTokens = 4000,
    temperature = 0.7,
    systemMessage,
  } = options;

  const messages = [];
  
  if (systemMessage) {
    messages.push({ role: 'system' as const, content: systemMessage });
  }
  
  messages.push({ role: 'user' as const, content: prompt });

  try {
    const result = await generateObject({
      model: v0(model),
      messages,
      schema,
      maxTokens,
      temperature,
    });

    return {
      success: true,
      object: result.object,
      usage: result.usage,
    };
  } catch (error) {
    console.error('V0 generateObject error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Predefined v0 prompts for common tasks
 */
export const V0Prompts = {
  generateComponent: (description: string) =>
    `Generate a modern React component with TypeScript: ${description}. Include proper types, error handling, and follow React best practices.`,
    
  improveCode: (code: string, instructions: string) =>
    `Improve this code based on the following instructions:\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nInstructions: ${instructions}\n\nProvide the improved code with explanations.`,
    
  debugCode: (code: string, error: string) =>
    `Debug this code that's producing an error:\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nError: ${error}\n\nProvide the fixed code and explanation of the issue.`,
    
  optimizePerformance: (code: string) =>
    `Optimize this code for better performance:\n\`\`\`\n${code}\n\`\`\`\n\nProvide optimized version with performance improvements explained.`,
    
  addTests: (code: string) =>
    `Generate comprehensive tests for this code:\n\`\`\`\n${code}\n\`\`\`\n\nInclude unit tests, edge cases, and integration tests where appropriate.`,
};

/**
 * Helper function to check if v0 API is configured
 */
export function isV0Configured(): boolean {
  return !!process.env.V0_API_KEY;
}

/**
 * Get available v0 models
 */
export function getAvailableV0Models(): V0Model[] {
  return ['v0-1.0-md', 'v0-1.5-lg'];
} 