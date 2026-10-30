import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** "dark" para secciones sobre papel claro. */
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, children, tone = "light" }: Props) {
  const muted = tone === "light" ? "text-cream/65" : "text-ink/60";
  const accent = tone === "light" ? "text-gum-yellow" : "text-gum-red";
  return (
    <Reveal className="flex max-w-2xl flex-col gap-3">
      <span className={`text-sm font-semibold uppercase tracking-[0.16em] ${accent}`}>{eyebrow}</span>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight text-balance">
        {title}
      </h2>
      {children && <p className={`text-lg leading-relaxed text-pretty ${muted}`}>{children}</p>}
    </Reveal>
  );
}
