import { Link } from "@tanstack/react-router";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" aria-label="Summit Auto Repair — home" className="group inline-flex items-center gap-3">
      <svg viewBox="0 0 48 30" className="h-8 w-auto" aria-hidden="true">
        <path d="M2 28 L17 6 L24 16 L30 9 L46 28 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" className={inverted ? "text-on-navy" : "text-navy"} />
        <path d="M13 12 L17 6 L21 12" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent" />
      </svg>
      <span className={`flex flex-col leading-none font-display uppercase ${inverted ? "text-on-navy" : "text-navy"}`}>
        <span className="text-[1.35rem] font-bold tracking-[0.14em]">Summit</span>
        <span className="mt-0.5 text-[0.62rem] font-semibold tracking-[0.42em] opacity-80">Auto Repair</span>
      </span>
    </Link>
  );
}
