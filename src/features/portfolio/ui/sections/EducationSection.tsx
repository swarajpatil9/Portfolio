import SectionLabel from "../SectionLabel";
import type { EducationItem } from "../../model/types";

type EducationSectionProps = {
  education: EducationItem[];
};

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="mb-16 scroll-mt-24">
      <SectionLabel color="#F59E0B">Education</SectionLabel>
      <h2 className="mt-1 mb-7 text-2xl font-bold text-slate-900">
        Academic Background
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((edu) => (
          <div
            key={edu.institution}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition duration-300 hover:translate-x-1 hover:shadow-lg hover:ring-slate-300/80"
            style={{ borderLeft: "4px solid #F59E0B" }}
          >
            <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-amber-100/70 transition-all duration-300 group-hover:w-3" />
            <h3 className="relative font-bold text-slate-900 transition duration-300 group-hover:translate-x-1">
              {edu.institution}
            </h3>
            <p className="relative mt-1 text-sm text-slate-600 transition duration-300 group-hover:translate-x-1">
              {edu.degree}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span className="relative transition duration-300 group-hover:translate-x-1">
                {edu.period}
              </span>
              <span className="relative transition duration-300 group-hover:translate-x-1">
                {edu.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
