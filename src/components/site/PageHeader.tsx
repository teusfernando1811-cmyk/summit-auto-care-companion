import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-paper">
      <div className="container-site grid gap-8 pt-20 pb-16 md:grid-cols-12 md:pt-28 md:pb-20">
        <div className="fade-up md:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-5xl text-navy md:text-7xl">{title}</h1>
        </div>
        {children && <div className="fade-up self-end text-lg leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return null;
}
