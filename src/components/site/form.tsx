import type { ReactNode } from "react";

export function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-display text-sm font-semibold uppercase tracking-[0.14em] text-navy">
        {label}
        {optional && <span className="font-sans text-xs normal-case tracking-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-accent">{error}</p>}
    </div>
  );
}

export function aria(id: string, error?: string) {
  return { id, name: id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined } as const;
}

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-accent pl-4 text-sm text-muted-foreground">{children}</p>;
}
