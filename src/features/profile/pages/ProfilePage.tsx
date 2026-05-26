import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import AppNavbar from "../../../shared/ui/navigation/AppNavbar";
import { highlightFields, photoSizes } from "../model/config";
import { convertImageToWebP } from "../lib/imageUtils";
import { getProfileSnapshot, validateProfile } from "../model/validation";
import ProfileFields from "../ui/ProfileFields";
import ProfileHero from "../ui/ProfileHero";
import ProfilePhotoSection from "../ui/ProfilePhotoSection";
import type { ProfileErrors } from "../model/config";
type ProfileState = ReturnType<typeof getProfileSnapshot>;

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isUserLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const [profile, setProfile] = useState<ProfileState>(
    getProfileSnapshot(user),
  );
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  const updateField = (field: keyof ProfileState, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage("");
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const webpImage = await convertImageToWebP(file);
      updateField("photo", webpImage);
    } catch {
      setErrors((current) => ({
        ...current,
        photo: "Image conversion to WebP failed.",
      }));
      setSuccessMessage("");
    }

    event.target.value = "";
  };

  const removePhoto = () => {
    updateField("photo", "");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateProfile(profile);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    try {
      await updateProfile(profile);
      setErrors({});
      setSuccessMessage("Profile updated successfully.");
    } catch {
      setErrors({
        form: "Failed to save profile. Please try again.",
      } as ProfileErrors);
      setSuccessMessage("");
    }
  };

  const profileHighlights = highlightFields.map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: profile[key] || `Add your ${key}`,
  }));
  const selectedPhotoSize =
    photoSizes.find(({ value }) => value === profile.photoSize) ??
    photoSizes[1];

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <AppNavbar />

      <ProfileHero profile={profile} profileHighlights={profileHighlights} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl" noValidate>
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 sm:text-sm sm:tracking-[0.24em]">
                  Editable fields
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  Personal information
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:w-auto"
              >
                Back to Home
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <ProfilePhotoSection
                profile={profile}
                errors={errors}
                selectedPhotoSizeClassName={selectedPhotoSize.previewClassName}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={removePhoto}
                onPhotoSizeChange={(value) => updateField("photoSize", value)}
              />
              <ProfileFields
                profile={profile}
                errors={errors}
                onUpdateField={updateField}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {successMessage ? (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  <span aria-hidden="true">✓</span>
                  {successMessage}
                </div>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                Save Profile
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
