import { useEffect, useState } from "react";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// Floating navbar height (pt-3 wrapper + nav content) + breathing room
const NAV_OFFSET = 88;

export default function PortfolioSidebar() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="hidden w-36 shrink-0 lg:block">
      <div className="sticky top-24">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          On this page
        </p>
        <ul className="space-y-0.5">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex w-full items-center border-l-2 px-3 py-1.5 text-left text-sm transition-all duration-150 ${
                  activeId === id
                    ? "border-indigo-500 font-semibold text-indigo-600"
                    : "border-transparent font-medium text-slate-400 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
