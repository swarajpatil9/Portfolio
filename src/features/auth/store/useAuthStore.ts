import { create } from "zustand";
import {
  getStoredUser,
  isLoggedIn as getStoredLoginState,
  saveUser,
  setLoggedIn,
} from "../../../entities/user/lib/storage";
import {
  getToken,
  setToken,
  removeToken,
} from "../../../entities/user/lib/tokenStorage";
import { normalizeUserProfile } from "../../../entities/user/model/normalizeUserProfile";
import { authApi } from "../api/authApi";
import { profileApi } from "../../profile/api/profileApi";
import { isApiEnabled } from "../../../shared/lib/api/client";
import type { UserProfile } from "../../../entities/user/model/types";

type AuthStore = {
  user: UserProfile | null;
  isLoggedIn: boolean;
  /** True while an async API call is in-flight. */
  isLoading: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: UserProfile) => Promise<void>;
  updateProfile: (user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
};

const readPersistedAuth = () => ({
  user: getStoredUser(),
  isLoggedIn: getStoredLoginState(),
});

const initialAuthState =
  typeof window === "undefined"
    ? { user: null, isLoggedIn: false }
    : readPersistedAuth();

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialAuthState,
  isLoading: false,

  hydrate: () => {
    set(readPersistedAuth());
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      if (isApiEnabled()) {
        // ── API mode ──────────────────────────────────────────────────────────
        const { data } = await authApi.login({ email, password });
        setToken(data.token);
        const user = normalizeUserProfile(data.user);
        saveUser(user);
        setLoggedIn(true);
        set({ user, isLoggedIn: true });
        return true;
      }

      // ── localStorage fallback (no API key yet) ────────────────────────────
      const persistedUser = get().user ?? getStoredUser();
      if (
        !persistedUser ||
        persistedUser.email !== email ||
        persistedUser.password !== password
      ) {
        return false;
      }
      setLoggedIn(true);
      set({ user: persistedUser, isLoggedIn: true });
      return true;
    } catch {
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (user) => {
    set({ isLoading: true });
    try {
      if (isApiEnabled()) {
        // ── API mode ──────────────────────────────────────────────────────────
        const { data } = await authApi.register({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });
        setToken(data.token);
        const normalizedUser = normalizeUserProfile(data.user);
        saveUser(normalizedUser);
        setLoggedIn(true);
        set({ user: normalizedUser, isLoggedIn: true });
        return;
      }

      // ── localStorage fallback ─────────────────────────────────────────────
      const normalizedUser = normalizeUserProfile(user);
      saveUser(normalizedUser);
      setLoggedIn(true);
      set({ user: normalizedUser, isLoggedIn: true });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (user) => {
    set({ isLoading: true });
    try {
      if (isApiEnabled()) {
        // ── API mode ──────────────────────────────────────────────────────────
        const { data } = await profileApi.update(user);
        const normalizedUser = normalizeUserProfile(data);
        saveUser(normalizedUser);
        set({ user: normalizedUser });
        return;
      }

      // ── localStorage fallback ─────────────────────────────────────────────
      const normalizedUser = normalizeUserProfile(user);
      saveUser(normalizedUser);
      set({ user: normalizedUser });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      if (isApiEnabled()) {
        const token = getToken();
        if (token) await authApi.logout(token);
      }
    } finally {
      removeToken();
      setLoggedIn(false);
      set({ user: null, isLoggedIn: false });
    }
  },
}));
