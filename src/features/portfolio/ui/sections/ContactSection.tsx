import SectionLabel from "../SectionLabel";
import { GithubIcon, LinkedinIcon, MailIcon } from "../SocialIconLink";
import { DownloadIcon } from "./HomeIcons";
import type { HeroData } from "../../model/types";

const contactIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
} as const;

type ContactSectionProps = {
  hero: HeroData;
};

export default function ContactSection({ hero }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="mb-20 scroll-mt-24 rounded-3xl p-6 text-white shadow-sm sm:p-10 lg:p-12"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)",
      }}
    >
      <SectionLabel color="#6EE7B7">Contact</SectionLabel>
      <h2 className="mt-2 mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
        Let&apos;s connect
      </h2>
      <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
        I&apos;m open to full stack roles, backend engineering positions, and
        collaborative product work where I can contribute, learn, and build
        scalable systems.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-5">
        {hero.socials.map((social) => {
          const Icon = contactIcons[social.icon];
          return (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10 sm:w-auto sm:justify-start"
            >
              <Icon />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                {social.display}
              </span>
            </a>
          );
        })}
        <a
          href={hero.resumeHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white transition hover:opacity-90 sm:w-auto sm:justify-start"
          style={{
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          }}
        >
          <DownloadIcon />
          Download Resume
        </a>
      </div>
    </section>
  );
}
