import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { portfolio } from "../../../data/portfolio.content";
import AppNavbar from "../../../shared/ui/navigation/AppNavbar";
import PortfolioSidebar from "../ui/PortfolioSidebar";
import HomeHero from "../ui/sections/HomeHero";

// Below-the-fold sections — lazy loaded to unblock FCP/LCP
const ContactSection = lazy(() => import("../ui/sections/ContactSection"));
const EducationSection = lazy(() => import("../ui/sections/EducationSection"));
const ExperienceSection = lazy(
  () => import("../ui/sections/ExperienceSection"),
);
const ProjectsSection = lazy(() => import("../ui/sections/ProjectsSection"));
const SkillsSection = lazy(() => import("../ui/sections/SkillsSection"));

// ── Data ─────────────────────────────────────────────────────────────────────

const { hero, experience, projects, skills, education } = portfolio;

// ── Component ─────────────────────────────────────────────────────────────────

function PortfolioPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isUserLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    null,
  );
  const [expandedProjects, setExpandedProjects] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState("");

  const mobileSections = [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // navbar (~60px) + mobile section nav (~44px) + buffer
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 110,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    mobileSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSectionId(id);
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayName =
    user && `${user.firstName} ${user.lastName}`.trim()
      ? `${user.firstName} ${user.lastName}`.trim()
      : hero.name;

  const cardRows = [
    {
      label: "Current",
      value:
        user?.role || user?.company
          ? [user?.role, user?.company].filter(Boolean).join(" @ ")
          : hero.statCard[0].value,
    },
    { label: "Location", value: user?.location || hero.statCard[2].value },
    { label: "Email", value: user?.email || "—" },
    { label: "Phone", value: user?.phone || "—" },
  ];

  const toggleExpandedItem = (
    key: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    setter((current) => (current === key ? null : key));
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNavbar />

      <HomeHero
        hero={hero}
        displayName={displayName}
        photo={user?.photo}
        cardRows={cardRows}
        onViewProfile={() => navigate("/profile")}
      />

      {/* Sticky section nav — mobile/tablet only */}
      <div className="sticky top-[60px] z-20 border-b border-slate-200/60 bg-slate-50/90 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-0.5 overflow-x-auto px-4 py-2 sm:px-6">
          {mobileSections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeSectionId === id
                  ? "bg-indigo-600 text-white"
                  : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex gap-10">
          <PortfolioSidebar />
          <div className="min-w-0 flex-1">
            <Suspense fallback={null}>
              <ExperienceSection
                experience={experience}
                expandedExperience={expandedExperience}
                onToggle={(key) =>
                  toggleExpandedItem(key, setExpandedExperience)
                }
              />
              <ProjectsSection
                projects={projects}
                expandedProject={expandedProjects}
                onToggle={(key) => toggleExpandedItem(key, setExpandedProjects)}
              />
              <SkillsSection skills={skills} />
              <EducationSection education={education} />
              <ContactSection hero={hero} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
