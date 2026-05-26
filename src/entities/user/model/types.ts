export type ProfilePhotoSize = "small" | "medium" | "large";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  role: string;
  company: string;
  location: string;
  bio: string;
  photo: string;
  photoSize: ProfilePhotoSize;
};