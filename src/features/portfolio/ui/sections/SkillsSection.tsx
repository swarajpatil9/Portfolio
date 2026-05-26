import SectionLabel from "../SectionLabel";
import type { SkillGroup } from "../../model/types";

type SkillsSectionProps = {
  skills: SkillGroup[];
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="mb-16 scroll-mt-24">
      <SectionLabel color="#10B981">Skills</SectionLabel>
      <h2 className="mt-1 mb-7 text-2xl font-bold text-slate-900">
        Technical Stack
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map(({ title, items, color }) => (
          <div
            key={title}
            className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-slate-300/80"
            style={{ borderTop: `3px solid ${color}` }}
          >
            <h3
              className="mb-3 text-xs font-bold uppercase tracking-[0.22em] transition duration-300 group-hover:tracking-[0.28em]"
              style={{ color }}
            >
              {title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1 text-xs font-medium text-white transition duration-300 group-hover:scale-[1.03]"
                  style={{ background: `${color}CC` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
