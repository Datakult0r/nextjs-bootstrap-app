'use server';

import { generateV0Text, generateV0Object, V0Prompts } from '@/libs/v0-client';
import { z } from 'zod';

// Schema for component generation
const ComponentSchema = z.object({
  name: z.string(),
  description: z.string(),
  props: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    description: z.string(),
  })),
  code: z.string(),
});

/**
 * Generate a React component using v0
 */
export async function generateComponentAction(description: string) {
  try {
    const result = await generateV0Text(
      V0Prompts.generateComponent(description),
      {
        model: 'v0-1.0-md',
        systemMessage: 'You are an expert React developer. Generate clean, modern, and accessible React components with TypeScript.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      component: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Generate component action error:', error);
    return {
      success: false,
      error: 'Failed to generate component',
    };
  }
}

/**
 * Improve existing code using v0
 */
export async function improveCodeAction(code: string, instructions: string) {
  try {
    const result = await generateV0Text(
      V0Prompts.improveCode(code, instructions),
      {
        model: 'v0-1.0-md',
        systemMessage: 'You are an expert developer. Provide improved code with clear explanations of changes.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      improvedCode: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Improve code action error:', error);
    return {
      success: false,
      error: 'Failed to improve code',
    };
  }
}

/**
 * Debug code using v0
 */
export async function debugCodeAction(code: string, errorMessage: string) {
  try {
    const result = await generateV0Text(
      V0Prompts.debugCode(code, errorMessage),
      {
        model: 'v0-1.0-md',
        systemMessage: 'You are an expert debugger. Identify issues and provide fixed code with clear explanations.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      debuggedCode: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Debug code action error:', error);
    return {
      success: false,
      error: 'Failed to debug code',
    };
  }
}

/**
 * Generate structured component metadata using v0
 */
export async function generateComponentMetadataAction(description: string) {
  try {
    const result = await generateV0Object(
      `Analyze this component description and provide structured metadata: ${description}`,
      ComponentSchema,
      {
        model: 'v0-1.0-md',
        systemMessage: 'Extract component metadata including name, description, props, and generate the component code.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      metadata: result.object,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Generate component metadata action error:', error);
    return {
      success: false,
      error: 'Failed to generate component metadata',
    };
  }
}

/**
 * Optimize code performance using v0
 */
export async function optimizeCodeAction(code: string) {
  try {
    const result = await generateV0Text(
      V0Prompts.optimizePerformance(code),
      {
        model: 'v0-1.0-md',
        systemMessage: 'You are a performance optimization expert. Provide optimized code with detailed performance improvements.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      optimizedCode: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Optimize code action error:', error);
    return {
      success: false,
      error: 'Failed to optimize code',
    };
  }
}

/**
 * Generate tests for code using v0
 */
export async function generateTestsAction(code: string) {
  try {
    const result = await generateV0Text(
      V0Prompts.addTests(code),
      {
        model: 'v0-1.0-md',
        systemMessage: 'You are a testing expert. Generate comprehensive tests including unit tests, edge cases, and integration tests.',
      }
    );

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      tests: result.text,
      usage: result.usage,
    };
  } catch (error) {
    console.error('Generate tests action error:', error);
    return {
      success: false,
      error: 'Failed to generate tests',
    };
  }
}