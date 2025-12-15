/**
 * API Client utilities for making HTTP requests
 */

import { settings, getN8nUrl } from '@/config/settings';
import { ApiError, N8nError, getErrorMessage } from './errors';
import type { N8nResponse } from '@/types';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = settings.api.timeoutMs, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function callN8nWebhook<T = N8nResponse>(
  webhookKey: 'generate' | 'sketch' | 'explode',
  payload: Record<string, unknown>
): Promise<T> {
  const url = getN8nUrl(webhookKey);

  if (settings.features.debugMode) {
    console.log(`[N8N] Calling webhook: ${url}`);
    console.log(`[N8N] Payload:`, JSON.stringify(payload, null, 2));
  }

  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const rawBody = await response.text();
  let data: T | null = null;

  if (rawBody) {
    try {
      data = JSON.parse(rawBody) as T;
    } catch {
      if (settings.features.debugMode) {
        console.error('[N8N] Failed to parse response:', rawBody);
      }
      throw new N8nError('Invalid JSON response from n8n');
    }
  }

  if (!response.ok) {
    const errorMessage =
      (data && typeof (data as N8nResponse).error === 'string' && (data as N8nResponse).error) ||
      rawBody ||
      'n8n request failed';
    throw new N8nError(errorMessage, response.status);
  }

  if (!data) {
    throw new N8nError('Empty response from n8n');
  }

  return data;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${settings.app.url}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(errorText || 'Request failed', response.status);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(getErrorMessage(error));
  }
}
