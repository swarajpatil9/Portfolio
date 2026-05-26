export type SocialIconType = "github" | "linkedin" | "email";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconType;
  display: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type HeroData = {
  name: string;
  title: string;
  summary: string;
  location: string;
  phone: string;
  resumeHref: string;
  socials: SocialLink[];
  statCard: StatItem[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  accent: string;
};

export type ProjectItem = {
  name: string;
  tagline: string;
  tag: string;
  accent: string;
  stack: string[];
  points: string[];
  live?: string;
  github?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
  color: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};

export type PortfolioContent = {
  hero: HeroData;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: EducationItem[];
};
