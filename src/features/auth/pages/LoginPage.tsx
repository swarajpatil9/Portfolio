import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { validateLoginFields } from "../model/validation";
import AuthField from "../ui/AuthField";
import AuthLayout from "../ui/AuthLayout";
import type { LoginErrors } from "../model/types";

function LoginPage() {
  const navigate = useNavigate();

  // Prefetch the PortfolioPage chunk while the user is on the login screen
  // so it's already cached when they navigate to /home after signing in.
  useEffect(() => {
    const prefetch = () => import("../../portfolio/pages/PortfolioPage");
    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 200);
    }
  }, []);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateLoginFields(email, password);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const success = await login(email, password);
    if (success) {
      setErrors({});
      navigate("/home");
    } else {
      setErrors({ form: "Invalid Email or Password" });
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkLabel="Register here"
      footerLinkTo="/register"
    >
      {errors.form && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mt-0.5 shrink-0">⚠</span>
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <AuthField
            label="Email"
            type="email"
            value={email}
            placeholder="you@example.com"
            error={errors.email}
            onChange={(value) => {
              setEmail(value);
              setErrors((prev) => ({
                ...prev,
                email: undefined,
                form: undefined,
              }));
            }}
          />
        </div>

        <div className="mb-6">
          <AuthField
            label="Password"
            type="password"
            value={password}
            placeholder="••••••••"
            error={errors.password}
            onChange={(value) => {
              setPassword(value);
              setErrors((prev) => ({
                ...prev,
                password: undefined,
                form: undefined,
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
          {isLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
