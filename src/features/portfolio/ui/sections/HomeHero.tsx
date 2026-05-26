import { lazy, Suspense, useEffect, useState } from "react";
import SocialIconLink from "../SocialIconLink";
import { DownloadIcon, LocationIcon, PhoneIcon } from "./HomeIcons";
import type { HeroData } from "../../model/types";

// Lazy-loaded so OGL (WebGL) is excluded from the initial bundle and
// deferred until after the first paint, reducing TBT and LCP.
const SoftAurora = lazy(
  () => import("../../../../shared/ui/layout/SoftAurora"),
);

type CardRow = {
  label: string;
  value: string;
};

type HomeHeroProps = {
  hero: HeroData;
  displayName: string;
  photo?: string;
  cardRows: CardRow[];
  onViewProfile: () => void;
};

export default function HomeHero({
  hero,
  displayName,
  photo,
  cardRows,
  onViewProfile,
}: HomeHeroProps) {
  // Only load OGL/WebGL on desktop — prevents downloading ~50 kB of JS on mobile.
  // Starts false so the first paint is unblocked; set to true after mount on desktop.
  const [showAurora, setShowAurora] = useState(false);
  useEffect(() => {
    if (
      !window.matchMedia("(max-width: 767px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowAurora(true);
    }
  }, []);

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
          {/* Only rendered on desktop — prevents OGL (44 kB) from being
              downloaded on mobile devices where WebGL is skipped anyway */}
          {showAurora && (
            <Suspense fallback={null}>
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
            </Suspense>
          )}
        </div>
        <div className="absolute inset-0 bg-slate-950/55" />
        {/* Orbs hidden on mobile — blur-3xl + continuous animation is too
            expensive for low-powered GPU on small devices */}
        <div
          className="hidden md:block animate-float-orb absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full opacity-15 blur-3xl"
          style={{ background: "#6366F1", willChange: "transform" }}
        />
        <div
          className="hidden md:block animate-float-orb animation-delay-300 absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-10 blur-3xl"
          style={{ background: "#10B981", willChange: "transform" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="animate-fade-up flex-1">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
              <span className="text-sm font-medium text-emerald-400">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {displayName}
            </h1>
            <p
              className="mt-3 text-xl font-semibold"
              style={{ color: "#A5B4FC" }}
            >
              {hero.title}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              {hero.summary}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <LocationIcon />
                {hero.location}
              </span>
              <a
                href={`tel:${hero.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 transition hover:text-white"
              >
                <PhoneIcon />
                {hero.phone}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={hero.resumeHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                <DownloadIcon />
                Download Resume
              </a>
              <button
                type="button"
                onClick={onViewProfile}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                View Profile
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              {hero.socials.map((social) => (
                <SocialIconLink
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>

          <div className="animate-scale-in animation-delay-150 w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md lg:w-72 lg:shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-indigo-600/30 text-2xl font-bold text-white ring-1 ring-white/10">
                {photo ? (
                  <img
                    src={photo}
                    alt={displayName}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                ) : (
                  displayName.charAt(0)
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400">{hero.title}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {cardRows.map(({ label, value }) => (
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
        </div>
      </div>
    </section>
  );
}
