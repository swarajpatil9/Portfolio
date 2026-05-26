const TOKEN_KEY = "auth_token";

/** Retrieve the stored JWT / Bearer token, or null if absent. */
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

/** Persist a JWT / Bearer token. */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/** Remove the stored token (on logout). */
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
