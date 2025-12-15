import { NextRequest, NextResponse } from 'next/server';
import { settings } from '@/config/settings';
import { PROMPT_TEMPLATES } from '@/config/prompts';
import { callN8nWebhook } from '@/lib/api-client';
import { ValidationError, N8nError, ERROR_MESSAGES, getErrorMessage } from '@/lib/errors';
import { validateUrl, validatePrompt } from '@/lib/utils';
import type { SketchRequest, N8nResponse, ImageGenerationResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SketchRequest;
    const { imageUrl, userPrompt } = body;

    if (!validateUrl(imageUrl)) {
      throw new ValidationError(ERROR_MESSAGES.IMAGE_URL_REQUIRED);
    }

    if (!validatePrompt(userPrompt)) {
      throw new ValidationError(ERROR_MESSAGES.PROMPT_REQUIRED);
    }

    if (settings.features.debugMode) {
      console.log('[Sketch API] Processing image:', imageUrl);
      console.log('[Sketch API] User prompt:', userPrompt);
    }

    const stylePrompt = PROMPT_TEMPLATES.sketch(userPrompt.trim());

    const n8nData = await callN8nWebhook<N8nResponse>('sketch', {
      imageUrl,
      stylePrompt
    });

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
      console.error('[Sketch API] Error:', error);
    }

    return NextResponse.json(
      {
        error: ERROR_MESSAGES.SKETCH_FAILED,
        details: message
      },
      { status: statusCode }
    );
  }
}
