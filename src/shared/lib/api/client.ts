import { HttpError } from "./types";

/**
 * Base URL of your REST API.
 * Set VITE_API_BASE_URL in .env (or .env.local) before building.
 * When the variable is absent the client is in "offline / localStorage" mode.
 */
const BASE_URL = ((import.meta.env.VITE_API_BASE_URL as string) ?? "")
  .trim()
  .replace(/\/+$/, "");

/**
 * Static API key sent in every request via the `x-api-key` header.
 * Set VITE_API_KEY in your .env file.
 */
const API_KEY = ((import.meta.env.VITE_API_KEY as string) ?? "").trim();

// ── Header builder ────────────────────────────────────────────────────────────

function buildHeaders(extra?: Record<string, string>): Headers {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  if (API_KEY) headers.set("x-api-key", API_KEY);

  if (extra) {
    Object.entries(extra).forEach(([key, value]) => headers.set(key, value));
  }

  return headers;
}

// ── Core request ──────────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  extraHeaders?: Record<string, string>,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(extraHeaders),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    let errors: Record<string, string[]> | undefined;

    try {
      const json = await response.json();
      message = (json as { message?: string }).message ?? message;
      errors = (json as { errors?: Record<string, string[]> }).errors;
    } catch {
      // Server returned non-JSON body — keep default message
    }

    throw new HttpError(message, response.status, errors);
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── Public API client ─────────────────────────────────────────────────────────

export const apiClient = {
  /** HTTP GET */
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("GET", path, undefined, headers),

  /** HTTP POST */
  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>("POST", path, body, headers),

  /** HTTP PUT — full replacement */
  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>("PUT", path, body, headers),

  /** HTTP PATCH — partial update */
  patch: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>("PATCH", path, body, headers),

  /** HTTP DELETE */
  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>("DELETE", path, undefined, headers),
};

/** True when VITE_API_BASE_URL is configured — gates all API calls. */
export const isApiEnabled = () => Boolean(BASE_URL);
