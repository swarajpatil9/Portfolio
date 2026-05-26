import type { UserProfile } from "./types";

const emptyUserProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  dateOfBirth: "",
  role: "",
  company: "",
  location: "",
  bio: "",
  photo: "",
  photoSize: "medium",
};

export const createEmptyUserProfile = (): UserProfile => ({
  ...emptyUserProfile,
});