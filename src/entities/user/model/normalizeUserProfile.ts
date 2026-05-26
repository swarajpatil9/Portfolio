import { createEmptyUserProfile } from "./createEmptyUserProfile";
import type { UserProfile } from "./types";

export const normalizeUserProfile = (value: unknown): UserProfile => {
  if (!value || typeof value !== "object") {
    return createEmptyUserProfile();
  }

  const profile = value as Partial<UserProfile>;

  return {
    ...createEmptyUserProfile(),
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    email: profile.email ?? "",
    password: profile.password ?? "",
    phone: profile.phone ?? "",
    dateOfBirth: profile.dateOfBirth ?? "",
    role: profile.role ?? "",
    company: profile.company ?? "",
    location: profile.location ?? "",
    bio: profile.bio ?? "",
    photo: profile.photo ?? "",
    photoSize: profile.photoSize ?? "medium",
  };
};