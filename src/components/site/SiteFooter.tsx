import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { NAV } from "./SiteHeader";
import { BUSINESS } from "./business";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-on-navy">
      <div className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="editorial mt-6 max-w-sm text-xl text-on-navy-muted">An independent repair shop for the everyday cars of Des Moines.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow mb-5">Pages</h2>
          <ul className="space-y-3">
            {[{ to: "/", label: "Home" }, ...NAV, { to: "/appointment", label: "Book Appointment" }].map((n) => (
              <li key={n.to}><Link to={n.to} className="text-on-navy-muted hover:text-on-navy">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <h2 className="eyebrow mb-5">Hours</h2>
          <ul className="space-y-3 text-sm text-on-navy-muted">
            {BUSINESS.hours.map((h) => <li key={h.days}><span className="block text-on-navy">{h.days}</span>{h.time}</li>)}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow mb-5">Reach us</h2>
          <a href={BUSINESS.phoneHref} className="block font-display text-2xl font-semibold tracking-wide hover:text-accent">{BUSINESS.phoneDisplay}</a>
          <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className="mt-3 block text-on-navy-muted underline-offset-4 hover:underline">{BUSINESS.city} — open map</a>
        </div>
      </div>
      <div className="border-t border-on-navy/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-on-navy-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Summit Auto Repair. A fictional business.</p>
          <p>Demo site — phone, email and hours are placeholders. Forms do not send or book anything.</p>
        </div>
      </div>
    </footer>
  );
}
