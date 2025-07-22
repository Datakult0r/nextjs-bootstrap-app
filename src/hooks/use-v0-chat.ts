'use client';

import { useChat } from 'ai/react';

export interface UseV0ChatOptions {
  model?: 'v0-1.0-md' | 'v0-1.5-lg';
  initialMessages?: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  onFinish?: (message: any) => void;
  onError?: (error: Error) => void;
}

export function useV0Chat(options: UseV0ChatOptions = {}) {
  const {
    model = 'v0-1.0-md',
    initialMessages = [],
    onFinish,
    onError,
  } = options;

  const chat = useChat({
    api: '/api/v0-chat',
    initialMessages,
    body: {
      model,
    },
    onFinish,
    onError,
  });

  return {
    ...chat,
    // Add v0-specific methods
    generateComponent: (prompt: string) => {
      return chat.append({
        role: 'user',
        content: `Generate a React component: ${prompt}`,
      });
    },
    improveCode: (code: string, instructions: string) => {
      return chat.append({
        role: 'user',
        content: `Improve this code based on the following instructions:\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nInstructions: ${instructions}`,
      });
    },
    debugCode: (code: string, error: string) => {
      return chat.append({
        role: 'user',
        content: `Debug this code that's producing an error:\n\nCode:\n\`\`\`\n${code}\n\`\`\`\n\nError: ${error}`,
      });
    },
  };
} 