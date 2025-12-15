'use client';

import { useState, useCallback } from 'react';
import { settings } from '@/config/settings';
import { formatError } from '@/lib/utils';
import type { ImageGenerationResult } from '@/types';

interface UseImageGenerationOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

interface UseImageGenerationReturn {
  loading: boolean;
  error: string | null;
  generate: (prompt: string) => Promise<string | null>;
  createSketch: (imageUrl: string, userPrompt: string) => Promise<string | null>;
  createExplodedView: (imageUrl: string) => Promise<string | null>;
  clearError: () => void;
}

export function useImageGeneration(
  options: UseImageGenerationOptions = {}
): UseImageGenerationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { onSuccess, onError } = options;

  const handleRequest = useCallback(
    async <T extends ImageGenerationResult>(
      endpoint: string,
      body: Record<string, unknown>
    ): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.details || errorData.error || 'Request failed');
        }

        const data: T = await response.json();
        const imageUrl = data.imageUrl || settings.ui.fallbackImage;

        onSuccess?.(imageUrl);
        return imageUrl;
      } catch (err) {
        const errorMessage = formatError(err);
        setError(errorMessage);
        onError?.(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError]
  );

  const generate = useCallback(
    (prompt: string) => handleRequest(settings.api.endpoints.generate, { prompt }),
    [handleRequest]
  );

  const createSketch = useCallback(
    (imageUrl: string, userPrompt: string) =>
      handleRequest(settings.api.endpoints.sketch, { imageUrl, userPrompt }),
    [handleRequest]
  );

  const createExplodedView = useCallback(
    (imageUrl: string) => handleRequest(settings.api.endpoints.explode, { imageUrl }),
    [handleRequest]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    loading,
    error,
    generate,
    createSketch,
    createExplodedView,
    clearError,
  };
}
