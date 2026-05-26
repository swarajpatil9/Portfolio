import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  color: string;
}

export default function SectionLabel({ children, color }: SectionLabelProps) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-[0.3em]"
      style={{ color }}
    >
      {children}
    </p>
  );
}
