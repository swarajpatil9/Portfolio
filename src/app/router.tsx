import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const PortfolioPage = lazy(
  () => import("../features/portfolio/pages/PortfolioPage"),
);
const ProfilePage = lazy(() => import("../features/profile/pages/ProfilePage"));

function PageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<PortfolioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}
