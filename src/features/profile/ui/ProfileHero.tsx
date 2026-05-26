import { useState } from "react";
import type { UserProfile } from "../../../entities/user/model/types";
import SoftAurora from "../../../shared/ui/layout/SoftAurora";

type ProfileHeroProps = {
  profile: UserProfile;
  profileHighlights: Array<{ label: string; value: string }>;
};

export default function ProfileHero({
  profile,
  profileHighlights,
}: ProfileHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Your profile";

  const subtitle =
    profile.role || profile.company
      ? [profile.role, profile.company].filter(Boolean).join(" @ ")
      : "Profile workspace";

  const summary =
    profile.bio ||
    "This page stores your profile data locally, including additional fields for contact details, role information, and a personal bio.";

  const heroRows = profileHighlights.slice(0, 4);

  const statsCard = (
    <div className="animate-scale-in animation-delay-150 w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md lg:w-72 lg:shrink-0">
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl text-2xl font-bold text-white ring-1 ring-white/10"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {displayName}
          </p>
          <p className="truncate text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {heroRows.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 border-t border-white/5 pt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {label}
            </span>
            <span className="min-w-0 break-words text-left text-xs font-semibold text-slate-200 [overflow-wrap:anywhere] sm:max-w-[9rem] sm:text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0D1117 0%, #0F172A 50%, #1E1B4B 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-90">
          <SoftAurora
            speed={1.2}
            scale={1.8}
            brightness={1.3}
            color1="#d04040"
            color2="#b010c5"
            noiseFrequency={3.5}
            noiseAmplitude={2}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.16}
            layerOffset={0.15}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/55" />
        <div
          className="animate-float-orb absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full opacity-15 blur-3xl"
          style={{ background: "#6366F1" }}
        />
        <div
          className="animate-float-orb animation-delay-300 absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-10 blur-3xl"
          style={{ background: "#10B981" }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 sm:py-28 lg:min-h-[640px] lg:px-8 ${
          isExpanded ? "py-8" : "py-5"
        }`}
      >
        {/* ── Mobile: collapsible header ─────────────────────────────── */}
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 sm:hidden"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <div className="text-left">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
              <span className="text-xs font-medium text-emerald-400">
                Profile workspace
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              {displayName}
            </h1>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: "#A5B4FC" }}
            >
              {subtitle}
            </p>
          </div>
          <span
            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {/* ── Mobile: expanded content ────────────────────────────────── */}
        {isExpanded && (
          <div className="mt-6 flex flex-col gap-6 sm:hidden animate-fade-up">
            <p className="text-sm leading-7 text-slate-300">{summary}</p>
            {statsCard}
          </div>
        )}

        {/* ── Desktop: full two-column layout ────────────────────────── */}
        <div className="hidden min-h-full flex-col justify-center gap-12 sm:flex lg:flex-row lg:items-center lg:gap-16">
          <div className="animate-fade-up flex-1">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
              <span className="text-sm font-medium text-emerald-400">
                Profile workspace
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {displayName}
            </h1>
            <p
              className="mt-3 text-xl font-semibold"
              style={{ color: "#A5B4FC" }}
            >
              {subtitle}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              {summary}
            </p>
          </div>
          {statsCard}
        </div>
      </div>
    </section>
  );
}
