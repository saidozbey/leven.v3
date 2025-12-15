import { NextRequest, NextResponse } from 'next/server';
import { settings } from '@/config/settings';
import { callN8nWebhook } from '@/lib/api-client';
import { ValidationError, N8nError, ERROR_MESSAGES, getErrorMessage } from '@/lib/errors';
import { validatePrompt } from '@/lib/utils';
import type { GenerateRequest, N8nResponse, ImageGenerationResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest;
    const { prompt } = body;

    if (!validatePrompt(prompt)) {
      throw new ValidationError(ERROR_MESSAGES.PROMPT_REQUIRED);
    }

    const trimmedPrompt = prompt.trim();

    if (settings.features.debugMode) {
      console.log('[Generate API] Processing prompt:', trimmedPrompt);
    }

    const n8nData = await callN8nWebhook<N8nResponse>('generate', { prompt: trimmedPrompt });

    if (typeof n8nData.imageUrl !== 'string' || !n8nData.imageUrl) {
      throw new N8nError(ERROR_MESSAGES.N8N_INVALID_RESPONSE);
    }

    const result: ImageGenerationResult = {
      imageUrl: n8nData.imageUrl,
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = getErrorMessage(error);
    const statusCode = error instanceof ValidationError ? 400 :
                       error instanceof N8nError ? 502 : 500;

    if (settings.features.debugMode) {
      console.error('[Generate API] Error:', error);
    }

    return NextResponse.json(
      {
        error: ERROR_MESSAGES.GENERATE_FAILED,
        details: message
      },
      { status: statusCode }
    );
  }
}
