import type {
  ProfilePhotoSize,
  UserProfile,
} from "../../../entities/user/model/types";

export type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

export const highlightFields = ["email", "phone", "role", "location"] as const;

export const photoSizes: Array<{
  value: ProfilePhotoSize;
  label: string;
  description: string;
  previewClassName: string;
}> = [
  {
    value: "small",
    label: "Small",
    description: "64 x 64 preview",
    previewClassName: "h-16 w-16",
  },
  {
    value: "medium",
    label: "Medium",
    description: "96 x 96 preview",
    previewClassName: "h-24 w-24",
  },
  {
    value: "large",
    label: "Large",
    description: "144 x 144 preview",
    previewClassName: "h-36 w-36",
  },
];

export const profileFields: Array<{
  key: keyof UserProfile;
  label: string;
  type?: "text" | "email" | "tel" | "date";
  placeholder?: string;
  fullWidth?: boolean;
  multiline?: boolean;
}> = [
  { key: "firstName", label: "First Name", placeholder: "John" },
  { key: "lastName", label: "Last Name", placeholder: "Doe" },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 555 123 4567",
  },
  { key: "dateOfBirth", label: "Date of Birth", type: "date" },
  { key: "role", label: "Role", placeholder: "Frontend Developer" },
  { key: "company", label: "Company", placeholder: "Acme Inc." },
  { key: "location", label: "Location", placeholder: "Mumbai, India" },
  {
    key: "bio",
    label: "Bio",
    placeholder:
      "Tell us a bit about yourself, your focus area, and what you are working on.",
    fullWidth: true,
    multiline: true,
  },
];
