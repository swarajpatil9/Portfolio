import SectionLabel from "../SectionLabel";
import { GithubIcon } from "../SocialIconLink";
import { ExpandIcon, ExternalLinkIcon } from "./HomeIcons";
import type { ProjectItem } from "../../model/types";

type ProjectsSectionProps = {
  projects: ProjectItem[];
  expandedProject: string | null;
  onToggle: (key: string) => void;
};

export default function ProjectsSection({
  projects,
  expandedProject,
  onToggle,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="mb-16 scroll-mt-24">
      <SectionLabel color="#8B5CF6">Projects</SectionLabel>
      <h2 className="mt-1 mb-7 text-2xl font-bold text-slate-900">
        What I&apos;ve Built
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((proj) => {
          const isExpanded = expandedProject === proj.name;

          return (
            <article
              key={proj.name}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onClick={() => onToggle(proj.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onToggle(proj.name);
                }
              }}
              className={`flex cursor-pointer flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7 ${isExpanded ? "shadow-lg ring-slate-300/80" : ""}`}
              style={{ borderTop: `3px solid ${proj.accent}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {proj.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {proj.tagline}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                    style={{ background: proj.accent }}
                  >
                    {proj.tag}
                  </span>
                  <button
                    type="button"
                    aria-label={
                      isExpanded
                        ? `Collapse ${proj.name}`
                        : `Expand ${proj.name}`
                    }
                    aria-expanded={isExpanded}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggle(proj.name);
                    }}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <ExpandIcon expanded={isExpanded} />
                  </button>
                </div>
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
                    <div className="mb-4 flex flex-wrap gap-2">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Project Details
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {proj.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-sm leading-6 text-slate-600"
                        >
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: proj.accent }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                          style={{ background: proj.accent }}
                        >
                          <ExternalLinkIcon />
                          Live Site
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          <GithubIcon />
                          GitHub
                        </a>
                      )}
                    </div>
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
