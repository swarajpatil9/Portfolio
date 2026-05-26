import type {
  ProfilePhotoSize,
  UserProfile,
} from "../../../entities/user/model/types";
import { photoSizes } from "../model/config";
import type { ProfileErrors } from "../model/config";

type ProfilePhotoSectionProps = {
  profile: UserProfile;
  errors: ProfileErrors;
  selectedPhotoSizeClassName: string;
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  onPhotoSizeChange: (value: ProfilePhotoSize) => void;
};

export default function ProfilePhotoSection({
  profile,
  errors,
  selectedPhotoSizeClassName,
  onPhotoUpload,
  onRemovePhoto,
  onPhotoSizeChange,
}: ProfilePhotoSectionProps) {
  const selectedLabel =
    photoSizes.find(({ value }) => value === profile.photoSize)?.label ??
    "Medium";

  return (
    <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Profile Photo
          </label>
          <p className="text-sm leading-6 text-slate-500">
            Upload an image and choose how large it should appear in the profile
            preview.
          </p>
          <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onPhotoUpload}
            />
          </label>
          {profile.photo && (
            <button
              type="button"
              onClick={onRemovePhoto}
              className="mt-3 block text-sm font-semibold text-red-600 transition hover:text-red-700"
            >
              Remove image
            </button>
          )}
          {errors.photo && (
            <p className="mt-3 text-xs text-red-600">{errors.photo}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-5 ring-1 ring-slate-200">
          <div
            className={`overflow-hidden rounded-2xl ${selectedPhotoSizeClassName} flex items-center justify-center bg-slate-200 text-2xl font-bold text-slate-600`}
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              (profile.firstName || "?").charAt(0).toUpperCase()
            )}
          </div>
          <p className="text-sm font-medium text-slate-500">
            {selectedLabel} preview
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {photoSizes.map(({ value, label, description }) => (
          <label
            key={value}
            className={`cursor-pointer rounded-2xl border px-4 py-3 transition ${
              profile.photoSize === value
                ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="photoSize"
              value={value}
              checked={profile.photoSize === value}
              onChange={() => onPhotoSizeChange(value)}
              className="sr-only"
            />
            <p className="text-sm font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          </label>
        ))}
      </div>
    </div>
  );
}
