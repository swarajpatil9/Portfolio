import SectionLabel from "../SectionLabel";
import { ExpandIcon } from "./HomeIcons";
import type { ExperienceItem } from "../../model/types";

type ExperienceSectionProps = {
  experience: ExperienceItem[];
  expandedExperience: string | null;
  onToggle: (key: string) => void;
};

export default function ExperienceSection({
  experience,
  expandedExperience,
  onToggle,
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="mb-16 scroll-mt-24">
      <SectionLabel color="#6366F1">Experience</SectionLabel>
      <h2 className="mt-1 mb-7 text-2xl font-bold text-slate-900">
        Work History
      </h2>

      <div className="space-y-5">
        {experience.map((exp) => {
          const isExpanded = expandedExperience === exp.company;

          return (
            <article
              key={exp.company}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => onToggle(exp.company)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onToggle(exp.company);
                }
              }}
              className={`cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7 ${isExpanded ? "shadow-lg ring-slate-300/80" : ""}`}
              style={{ borderLeft: `4px solid ${exp.accent}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: exp.accent }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-slate-700">
                        {exp.period}
                      </p>
                      <p className="text-xs text-slate-400">{exp.location}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={
                    isExpanded ? `Collapse ${exp.role}` : `Expand ${exp.role}`
                  }
                  aria-expanded={isExpanded}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle(exp.company);
                  }}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <ExpandIcon expanded={isExpanded} />
                </button>
              </div>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                  isExpanded
                    ? "mt-5 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="animate-accordion-open border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Key Highlights
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-6 text-slate-600"
                        >
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: exp.accent }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
