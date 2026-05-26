import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import LightRays from "./LightRays";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthLayoutProps) {
  return (
    <div
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
      style={{
        background:
          "linear-gradient(135deg, #334155 0%, #6366F1 60%, #8B5CF6 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="h-full w-full"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/25" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-fade-up mb-6 flex flex-col items-center">
          <div
            className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            }}
          >
            R
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            {title}
          </h2>
          <p className="mt-1 text-sm text-white/75">{subtitle}</p>
        </div>
        <div className="max-h-[calc(100svh-8rem)] overflow-y-auto">
          <div className="animate-scale-in animation-delay-150 rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-sm sm:p-9">
            {children}

            <p
              className="mt-5 text-center text-sm"
              style={{ color: "#64748B" }}
            >
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-semibold transition hover:opacity-80"
                style={{ color: "#6366F1" }}
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
