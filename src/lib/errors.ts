/**
 * Custom Error Classes and Error Handling Utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode: number = 500, details?: unknown) {
    super(message, 'API_ERROR', statusCode, details);
    this.name = 'ApiError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class N8nError extends AppError {
  constructor(message: string, statusCode: number = 502, details?: unknown) {
    super(message, 'N8N_ERROR', statusCode, details);
    this.name = 'N8nError';
  }
}

export const ERROR_MESSAGES = {
  PROMPT_REQUIRED: 'Prompt is required and must be a non-empty string.',
  IMAGE_URL_REQUIRED: 'Image URL is required.',
  N8N_REQUEST_FAILED: 'n8n request failed.',
  N8N_INVALID_RESPONSE: 'Invalid response from n8n: imageUrl is missing.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  GENERATE_FAILED: 'Failed to generate image.',
  SKETCH_FAILED: 'Failed to create sketch.',
  EXPLODE_FAILED: 'Failed to create exploded view.',
} as const;

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return ERROR_MESSAGES.UNEXPECTED_ERROR;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
