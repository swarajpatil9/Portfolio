import { apiClient } from "../../../shared/lib/api/client";
import type { ApiResponse } from "../../../shared/lib/api/types";
import type { UserProfile } from "../../../entities/user/model/types";
import { getToken } from "../../../entities/user/lib/tokenStorage";

// ── Auth header helper ────────────────────────────────────────────────────────

function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Profile API ───────────────────────────────────────────────────────────────

export const profileApi = {
  /**
   * GET /profile
   * Fetches the current user's full profile.
   */
  get: () => apiClient.get<ApiResponse<UserProfile>>("/profile", authHeader()),

  /**
   * PUT /profile
   * Full replacement of the user's profile.
   * Send all fields even if unchanged.
   */
  update: (profile: UserProfile) =>
    apiClient.put<ApiResponse<UserProfile>>("/profile", profile, authHeader()),

  /**
   * PATCH /profile
   * Partial update — only the supplied fields are changed.
   */
  patch: (partial: Partial<UserProfile>) =>
    apiClient.patch<ApiResponse<UserProfile>>(
      "/profile",
      partial,
      authHeader(),
    ),

  /**
   * DELETE /profile
   * Deletes / deactivates the authenticated user's account.
   */
  delete: () => apiClient.delete<void>("/profile", authHeader()),
};
