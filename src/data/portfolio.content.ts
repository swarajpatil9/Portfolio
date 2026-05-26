import type { PortfolioContent } from "../features/portfolio/model/types";

export const portfolio: PortfolioContent = {
  hero: {
    name: "Swaraj Patil",
    title: "Full Stack Developer",
    summary:
      "Experienced in TypeScript, React.js, Next.js, Node.js and PostgreSQL. Built internal enterprise tools at MIT-WPU and contributed to production client projects. Strong interest in backend engineering and scalable systems.",
    location: "Pune, India",
    phone: "+91 87665 57735",
    resumeHref:
      "https://drive.google.com/uc?export=download&id=1obpB9CUymOsApcGkN9e-HuroXri0fCTP",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/swarajpatil9",
        icon: "github",
        display: "github.com/Swaraj-Patil9",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/swarajpatil09/",
        icon: "linkedin",
        display: "linkedin.com/in/swarajpatil09",
      },
      {
        label: "Email",
        href: "mailto:swarajpatil2823@gmail.com",
        icon: "email",
        display: "swarajpatil2823@gmail.com",
      },
    ],
    statCard: [
      { label: "Current", value: "Developer Intern @ MIT-WPU" },
      { label: "Graduating", value: "2026" },
      { label: "Location", value: "Pune, India" },
      { label: "Focus", value: "Backend & Scalable Systems" },
    ],
  },
  experience: [
    {
      role: "React Intern",
      company: "Innover System Pvt Ltd",
      period: "May 2026 – Present",
      location: "Pune, India",
      points: [
        "Built reusable component libraries with compound component patterns, improving UI consistency across the application",
        "Implemented custom React hooks (useDebounce, useFetch, useLocalStorage) to encapsulate and share stateful logic across features",
        "Optimised rendering performance using React.memo, useMemo, and useCallback, reducing unnecessary re-renders by ~40%",
        "Managed complex client-side state with Context API and useReducer, structuring global state for predictable data flow",
        "Integrated React Router v7 with protected routes, lazy-loaded pages, and programmatic navigation for a seamless SPA experience",
      ],
      accent: "#6366F1",
    },
    {
      role: "Developer Intern",
      company: "MIT World Peace University",
      period: "Aug 2025 – May 2026",
      location: "Pune, India",
      points: [
        "Developed CampusBook, an internal full stack platform for faculty resource booking and workflow management",
        "Built role-based access systems and automated approval workflows improving operational efficiency",
        "Integrated frontend dashboards with backend APIs and approval workflows",
        "Designed REST APIs and backend services using Node.js and PostgreSQL",
        "Collaborated with administrative stakeholders to deploy production-ready features",
      ],
      accent: "#6366F1",
    },
    {
      role: "Web Developer Intern",
      company: "Infeanet Digital Solutions",
      period: "Jul 2022 – Jan 2023",
      location: "Pune, India",
      points: [
        "Developed backend modules using Django and MySQL for client applications",
        "Improved API response performance through query optimization",
        "Built reusable backend components reducing development effort",
        "Worked in agile sprint environments delivering tested production features",
      ],
      accent: "#10B981",
    },
  ],
  projects: [
    {
      name: "Courtside",
      tagline: "AI Sports Facility Booking Platform",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
        "Figma",
        "GitHub Actions",
        "Generative AI",
        "IoT",
      ],
      points: [
        "Designed a fully responsive, multi-role booking system supporting 7+ sports and 3 user types with real-time spot availability and adjustable slot capacities",
        "Integrated Supabase Auth, RLS, and PostgreSQL to securely manage over 10,000 user records with role-based access and optimised SQL queries",
        "Built an AI assistant that automated 500+ bookings/month, handled live queries, and recommended slots based on availability and usage trends",
      ],
      live: "https://sports.mitwpu.edu.in",
      accent: "#6366F1",
      tag: "Production",
    },
    {
      name: "CampusBook",
      tagline: "Resource Management Platform",
      stack: ["Next.js", "React", "Node.js", "PostgreSQL"],
      points: [
        "Built centralised faculty resource allocation system with booking workflows and approval pipelines",
        "Implemented role-based dashboards and designed backend APIs supporting scheduling and allocation",
        "Improved resource allocation visibility for 2000+ faculty through centralised tracking",
      ],
      live: "https://infra.mitwpu.edu.in",
      accent: "#3B82F6",
      tag: "Production",
    },
    {
      name: "RISE Enterprises",
      tagline: "Commercial Website",
      stack: ["Next.js", "TailwindCSS"],
      points: [
        "Developed responsive business website for a construction firm",
        "Implemented SEO-optimised pages and project showcase modules",
        "Built lead capture workflows through contact form integrations and deployed via Vercel",
      ],
      live: "https://www.rise-enterprises.co.in/",
      accent: "#F59E0B",
      tag: "Live",
    },
    {
      name: "SafeCheck",
      tagline: "AI Fraud Detection System",
      stack: ["Python", "Scikit-learn", "NLP"],
      points: [
        "Built multi-modal fraud detection system combining phishing detection and audio deepfake detection",
        "Developed ML models including Logistic Regression and Random Forest for classification tasks",
        "Designed risk fusion scoring algorithm combining multiple model outputs into a unified signal",
      ],
      github: "https://github.com/swarajpatil9/safecheck-mvp",
      accent: "#10B981",
      tag: "Open Source",
    },
  ],
  skills: [
    {
      title: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
      color: "#6366F1",
    },
    {
      title: "Frontend",
      items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
      color: "#3B82F6",
    },
    {
      title: "Backend",
      items: ["Node.js", "REST APIs", "Django"],
      color: "#10B981",
    },
    { title: "Databases", items: ["PostgreSQL", "MySQL"], color: "#F59E0B" },
    {
      title: "Tools",
      items: [
        "Git",
        "GitHub Actions",
        "Vercel",
        "Supabase",
        "Figma",
        "VS Code",
      ],
      color: "#8B5CF6",
    },
    {
      title: "Core Concepts",
      items: [
        "Full Stack Dev",
        "API Design",
        "Auth Systems",
        "Database Design",
        "Agile",
      ],
      color: "#EC4899",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "MIT World Peace University",
      period: "2023 – 2026",
      location: "Pune, India",
    },
    {
      degree: "Diploma in Computer Science — 82.5%",
      institution: "Sou Venutai Chavan Polytechnic",
      period: "2020 – 2023",
      location: "Pune, India",
    },
  ],
};
