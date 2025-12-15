/**
 * API Types
 * Type definitions for API requests and responses
 */

// Request types
export interface GenerateRequest {
  prompt: string;
}

export interface SketchRequest {
  imageUrl: string;
  userPrompt: string;
}

export interface ExplodeRequest {
  imageUrl: string;
}

// Response types
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: string;
  code?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ImageGenerationResult {
  imageUrl: string;
}

// n8n specific types
export interface N8nResponse {
  imageUrl?: string;
  error?: string;
  [key: string]: unknown;
}

export interface N8nWebhookPayload {
  prompt?: string;
  imageUrl?: string;
  stylePrompt?: string;
}
