import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { btnClass } from "./Button";
import { BUSINESS } from "./business";

export const NAV = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-navy focus:px-4 focus:py-2 focus:text-on-navy">Skip to content</a>
      <div className="container-site flex h-20 items-center justify-between">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="font-display text-[0.95rem] font-medium uppercase tracking-[0.16em] text-navy/80 transition-colors hover:text-navy data-[status=active]:text-navy data-[status=active]:underline data-[status=active]:decoration-accent data-[status=active]:decoration-2 data-[status=active]:underline-offset-[10px]">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.1em] text-navy hover:text-accent">
            <Phone className="h-4 w-4" aria-hidden /> {BUSINESS.phoneDisplay}
          </a>
          <Link to="/appointment" className={btnClass({ size: "sm" })}>Book Appointment</Link>
        </div>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center text-navy lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="fade-up fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-navy text-on-navy lg:hidden">
          <nav aria-label="Mobile" className="container-site flex flex-col py-10">
            {[{ to: "/", label: "Home" }, ...NAV, { to: "/appointment", label: "Book Appointment" }].map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="border-b border-on-navy/15 py-5 font-display text-3xl font-semibold uppercase tracking-wide data-[status=active]:text-accent">
                {n.label}
              </Link>
            ))}
            <a href={BUSINESS.phoneHref} className={btnClass({ variant: "accent", size: "lg", className: "mt-10" })}>
              <Phone className="h-4 w-4" aria-hidden /> Call {BUSINESS.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
