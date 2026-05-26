/** Standard envelope returned by every successful API response. */
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

/** Shape of error bodies returned by the API. */
export type ApiErrorBody = {
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Thrown by the API client whenever the server responds with a non-2xx status.
 * Carries the HTTP status code and optional field-level validation errors.
 */
export class HttpError extends Error {
  readonly status: number;
  readonly errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.errors = errors;
  }
}
