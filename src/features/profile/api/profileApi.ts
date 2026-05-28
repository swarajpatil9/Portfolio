import { apiClient } from "../../../shared/lib/api/client";
import { HttpError } from "../../../shared/lib/api/types";
import type { ApiResponse } from "../../../shared/lib/api/types";
import type { UserProfile } from "../../../entities/user/model/types";
import { getToken } from "../../../entities/user/lib/tokenStorage";

type MockApiUser = UserProfile & {
  id: string;
};

function getCurrentUserId(): string {
  const token = getToken();

  if (!token) {
    throw new HttpError("User is not authenticated.", 401);
  }

  return token;
}

function wrapUser(user: MockApiUser): ApiResponse<UserProfile> {
  return {
    success: true,
    data: user,
  };
}

// ── Profile API ───────────────────────────────────────────────────────────────

export const profileApi = {
  /**
   * Fetches the current user's full profile.
   */
  get: async () => {
    const userId = getCurrentUserId();
    const user = await apiClient.get<MockApiUser>(
      `/${encodeURIComponent(userId)}`,
    );
    return wrapUser(user);
  },

  /**
   * Full replacement of the user's profile.
   */
  update: async (profile: UserProfile) => {
    const userId = getCurrentUserId();
    const user = await apiClient.put<MockApiUser>(
      `/${encodeURIComponent(userId)}`,
      profile,
    );
    return wrapUser(user);
  },

  /**
   * Partial update — only the supplied fields are changed.
   */
  patch: async (partial: Partial<UserProfile>) => {
    const userId = getCurrentUserId();
    const user = await apiClient.patch<MockApiUser>(
      `/${encodeURIComponent(userId)}`,
      partial,
    );
    return wrapUser(user);
  },

  /**
   * Deletes the current user's account record.
   */
  delete: () => {
    const userId = getCurrentUserId();
    return apiClient.delete<void>(`/${encodeURIComponent(userId)}`);
  },
};
