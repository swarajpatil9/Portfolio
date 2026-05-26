import { normalizeUserProfile } from "../model/normalizeUserProfile";
import type { UserProfile } from "../model/types";

const USER_STORAGE_KEY = "user";
const LOGIN_STORAGE_KEY = "isLoggedIn";

export const getStoredUser = () => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);
  return savedUser ? normalizeUserProfile(JSON.parse(savedUser)) : null;
};

export const saveUser = (user: UserProfile) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const setLoggedIn = (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    localStorage.setItem(LOGIN_STORAGE_KEY, "true");
    return;
  }

  localStorage.removeItem(LOGIN_STORAGE_KEY);
};

export const isLoggedIn = () =>
  Boolean(localStorage.getItem(LOGIN_STORAGE_KEY));