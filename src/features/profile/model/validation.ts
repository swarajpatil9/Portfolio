import { createEmptyUserProfile } from "../../../entities/user/model/createEmptyUserProfile";
import { isValidEmail } from "../../../shared/utils/isValidEmail";
import type { UserProfile } from "../../../entities/user/model/types";
import type { ProfileErrors } from "./config";

export const validateProfile = (profile: UserProfile) => {
  const nextErrors: ProfileErrors = {};

  if (!profile.firstName.trim()) {
    nextErrors.firstName = "First name is required";
  }

  if (!profile.lastName.trim()) {
    nextErrors.lastName = "Last name is required";
  }

  if (!profile.email.trim()) {
    nextErrors.email = "Email is required";
  } else if (!isValidEmail(profile.email)) {
    nextErrors.email = "Please enter a valid email";
  }

  if (!profile.phone.trim()) {
    nextErrors.phone = "Phone number is required";
  } else if (!/^[0-9+\-()\s]{7,}$/.test(profile.phone.trim())) {
    nextErrors.phone = "Please enter a valid phone number";
  }

  if (!profile.dateOfBirth) {
    nextErrors.dateOfBirth = "Date of birth is required";
  }

  if (!profile.role.trim()) {
    nextErrors.role = "Role is required";
  }

  if (!profile.location.trim()) {
    nextErrors.location = "Location is required";
  }

  if (!profile.bio.trim()) {
    nextErrors.bio = "Bio is required";
  } else if (profile.bio.trim().length < 20) {
    nextErrors.bio = "Bio should be at least 20 characters";
  }

  return nextErrors;
};

export const getProfileSnapshot = (user: UserProfile | null) =>
  user ?? createEmptyUserProfile();
