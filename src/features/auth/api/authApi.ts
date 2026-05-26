import { apiClient } from "../../../shared/lib/api/client";
import type { ApiResponse } from "../../../shared/lib/api/types";
import type { UserProfile } from "../../../entities/user/model/types";

// ── Request / Response shapes ─────────────────────────────────────────────────

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthTokenResponse = {
  /** Bearer token to attach to subsequent requests. */
  token: string;
  user: UserProfile;
};

// ── Auth API ──────────────────────────────────────────────────────────────────

export const authApi = {
  /**
   * POST /auth/login
   * Authenticates the user and returns a token + profile.
   */
  login: (body: LoginRequest) =>
    apiClient.post<ApiResponse<AuthTokenResponse>>("/auth/login", body),

  /**
   * POST /auth/register
   * Creates a new account and returns a token + profile.
   */
  register: (body: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthTokenResponse>>("/auth/register", body),

  /**
   * GET /auth/me
   * Returns the authenticated user's profile.
   * Requires a valid Bearer token.
   */
  me: (token: string) =>
    apiClient.get<ApiResponse<UserProfile>>("/auth/me", {
      Authorization: `Bearer ${token}`,
    }),

  /**
   * POST /auth/logout
   * Invalidates the server-side session / token.
   */
  logout: (token: string) =>
    apiClient.post<void>("/auth/logout", undefined, {
      Authorization: `Bearer ${token}`,
    }),

  /**
   * DELETE /auth/account
   * Permanently deletes the authenticated user's account.
   */
  deleteAccount: (token: string) =>
    apiClient.delete<void>("/auth/account", {
      Authorization: `Bearer ${token}`,
    }),
};
