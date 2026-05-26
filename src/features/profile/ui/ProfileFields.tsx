import { getInputClassName } from "../../../shared/utils/getInputClassName";
import type { UserProfile } from "../../../entities/user/model/types";
import { profileFields } from "../model/config";
import type { ProfileErrors } from "../model/config";

type ProfileFieldsProps = {
  profile: UserProfile;
  errors: ProfileErrors;
  onUpdateField: (field: keyof UserProfile, value: string) => void;
};

export default function ProfileFields({
  profile,
  errors,
  onUpdateField,
}: ProfileFieldsProps) {
  return (
    <>
      {profileFields.map(
        ({ key, label, type = "text", placeholder, fullWidth, multiline }) => {
          const className = `${getInputClassName(Boolean(errors[key]))}${multiline ? " min-h-32 resize-y" : ""}`;

          return (
            <div key={key} className={fullWidth ? "md:col-span-2" : undefined}>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                {label}
              </label>
              {multiline ? (
                <textarea
                  value={profile[key]}
                  onChange={(event) => onUpdateField(key, event.target.value)}
                  className={className}
                  placeholder={placeholder}
                />
              ) : (
                <input
                  type={type}
                  value={profile[key]}
                  onChange={(event) => onUpdateField(key, event.target.value)}
                  className={className}
                  placeholder={placeholder}
                />
              )}
              {errors[key] && (
                <p className="mt-1.5 text-xs text-red-600">{errors[key]}</p>
              )}
            </div>
          );
        },
      )}
    </>
  );
}
