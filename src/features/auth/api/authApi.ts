import { apiClient } from "../../../shared/lib/api/client";
import { HttpError } from "../../../shared/lib/api/types";
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
  /** MockAPI resource id stored as the auth token for profile operations. */
  token: string;
  user: UserProfile;
};

type MockApiUser = UserProfile & {
  id: string;
};

function createAuthEnvelope(user: MockApiUser, message?: string) {
  return {
    success: true,
    message,
    data: {
      token: user.id,
      user,
    },
  } satisfies ApiResponse<AuthTokenResponse>;
}

async function findUsersByEmail(email: string) {
  return apiClient.get<MockApiUser[]>(`?email=${encodeURIComponent(email)}`);
}

// ── Auth API ──────────────────────────────────────────────────────────────────

export const authApi = {
  /**
   * MockAPI login flow.
   * Queries the collection by email and validates the password client-side.
   */
  login: async (body: LoginRequest) => {
    const users = await findUsersByEmail(body.email);
    const matchedUser = users.find(
      (user) => user.email === body.email && user.password === body.password,
    );

    if (!matchedUser) {
      throw new HttpError("Invalid email or password.", 401, {
        form: ["Invalid email or password."],
      });
    }

    return createAuthEnvelope(matchedUser, "Login successful.");
  },

  /**
   * MockAPI register flow.
   * Creates a user record in the configured collection.
   */
  register: async (body: RegisterRequest) => {
    const existingUsers = await findUsersByEmail(body.email);

    if (existingUsers.some((user) => user.email === body.email)) {
      throw new HttpError("An account with this email already exists.", 400, {
        email: ["An account with this email already exists."],
      });
    }

    const createdUser = await apiClient.post<MockApiUser>("", body);
    return createAuthEnvelope(createdUser, "Registration successful.");
  },

  /**
   * MockAPI current-user flow.
   * Reads the current user's record by resource id.
   */
  me: async (token: string) => {
    const user = await apiClient.get<MockApiUser>(
      `/${encodeURIComponent(token)}`,
    );
    return {
      success: true,
      data: user,
    } satisfies ApiResponse<UserProfile>;
  },

  /**
   * MockAPI has no server-side session endpoint.
   * Logout is handled locally in the auth store.
   */
  logout: async (_token: string) => undefined,

  /**
   * Deletes the current user's record from the configured collection.
   */
  deleteAccount: (token: string) =>
    apiClient.delete<void>(`/${encodeURIComponent(token)}`),
};
