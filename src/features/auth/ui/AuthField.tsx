import { useState } from "react";
import { getInputClassName } from "../../../shared/utils/getInputClassName";

type AuthFieldProps = {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function AuthField({
  label,
  type,
  value,
  placeholder,
  error,
  onChange,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div>
      <label
        className="mb-1.5 block text-sm font-semibold"
        style={{ color: "#334155" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${getInputClassName(Boolean(error))}${isPasswordField ? " pr-12" : ""}`}
        />
        {isPasswordField && value && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-700"
          >
            {showPassword ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l18 18" />
                <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                <path d="M9.88 5.09A9.77 9.77 0 0 1 12 4.8c5.05 0 9.27 3.11 10.5 7.2a10.88 10.88 0 0 1-3.04 4.68" />
                <path d="M6.61 6.61A10.88 10.88 0 0 0 1.5 12c.67 2.25 2.11 4.2 4.03 5.55" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.5 12S5.5 4.8 12 4.8 22.5 12 22.5 12 18.5 19.2 12 19.2 1.5 12 1.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
