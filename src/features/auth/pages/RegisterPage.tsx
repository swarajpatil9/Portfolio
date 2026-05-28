import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmptyUserProfile } from "../../../entities/user/model/createEmptyUserProfile";
import { HttpError } from "../../../shared/lib/api/types";
import { useAuthStore } from "../store/useAuthStore";
import { validateRegisterFields } from "../model/validation";
import AuthField from "../ui/AuthField";
import AuthLayout from "../ui/AuthLayout";
import type { RegisterErrors } from "../model/types";

function RegisterPage() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateRegisterFields(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    );

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    const userData = {
      ...createEmptyUserProfile(),
      firstName,
      lastName,
      email,
      password,
    };

    try {
      await registerUser(userData);
      navigate("/home");
    } catch (error) {
      setErrors({
        form:
          error instanceof HttpError
            ? error.message
            : "Registration failed. Please try again.",
      });
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Get started today, it's free"
      footerText="Already have an account?"
      footerLinkLabel="Login here"
      footerLinkTo="/login"
    >
      {errors.form && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5 shrink-0">⚠</span>
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <AuthField
            label="First Name"
            type="text"
            value={firstName}
            placeholder="John"
            error={errors.firstName}
            onChange={(value) => {
              setFirstName(value);
              setErrors((prev) => ({ ...prev, firstName: undefined }));
            }}
          />
          <AuthField
            label="Last Name"
            type="text"
            value={lastName}
            placeholder="Doe"
            error={errors.lastName}
            onChange={(value) => {
              setLastName(value);
              setErrors((prev) => ({ ...prev, lastName: undefined }));
            }}
          />
        </div>

        <div className="mb-4">
          <AuthField
            label="Email"
            type="email"
            value={email}
            placeholder="you@example.com"
            error={errors.email}
            onChange={(value) => {
              setEmail(value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
        </div>

        <div className="mb-4">
          <AuthField
            label="Password"
            type="password"
            value={password}
            placeholder="Min. 6 characters"
            error={errors.password}
            onChange={(value) => {
              setPassword(value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
        </div>

        <div className="mb-6">
          <AuthField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            placeholder="Repeat password"
            error={errors.confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              setErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "#6366F1" }}
        >
          {isLoading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
