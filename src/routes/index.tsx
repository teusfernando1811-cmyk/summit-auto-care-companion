import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import hero from "@/assets/hero-mechanic.jpg";
import brakes from "@/assets/brakes.jpg";
import diagnostics from "@/assets/diagnostics.jpg";
import tires from "@/assets/tires.jpg";
import shop from "@/assets/shop.jpg";
import { btnClass } from "@/components/site/Button";
import { BUSINESS } from "@/components/site/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit Auto Repair — Honest Car Repair in Des Moines, Iowa" },
      { name: "description", content: "Straightforward repairs from an independent Des Moines shop. Brakes, diagnostics, oil changes, tires and more — explained clearly before any work begins." },
      { property: "og:title", content: "Summit Auto Repair — Des Moines, Iowa" },
      { property: "og:description", content: "Straightforward repairs. A shop you can trust." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const featured = [
  { img: brakes, title: "Brakes", text: "Pads, rotors, calipers and fluid — inspected and measured, with photos when something needs replacing." },
  { img: diagnostics, title: "Diagnostics", text: "Check engine light on? We find the cause, not just the code, and walk you through what we found." },
  { img: tires, title: "Tires & Alignment", text: "Mounting, balancing, rotation and alignment so your car tracks straight and tires wear evenly." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-navy text-on-navy">
        <img src={hero} alt="A mechanic working under the hood of a car in a bright repair bay" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]" />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        <div className="container-site flex min-h-[88vh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-24">
          <div className="fade-up max-w-2xl">
            <p className="eyebrow text-on-navy">Independent auto repair · Des Moines, Iowa</p>
            <h1 className="mt-6 text-[3.25rem] leading-[0.92] md:text-[5.75rem]">
              Straightforward repairs.<br /><span className="text-on-navy-muted">A shop you can trust.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-on-navy-muted">
              We look at your car, tell you plainly what it needs, and do the work only after you say yes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/appointment" className={btnClass({ size: "lg" })}>Book Appointment</Link>
              <a href={BUSINESS.phoneHref} className={btnClass({ variant: "ghostLight", size: "lg" })}>
                <Phone className="h-4 w-4" aria-hidden /> Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="container-site grid gap-10 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-3"><span className="rule-accent" /><p className="eyebrow mt-4">How we work</p></div>
        <p className="editorial text-3xl leading-snug text-navy md:col-span-8 md:text-[2.6rem] md:leading-[1.25]">
          A clear estimate before the wrench comes out. A call before anything changes. Old parts kept for you to see. That's the whole approach.
        </p>
      </section>

      {/* Featured services */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl text-navy md:text-6xl">What we do<br />most days.</h2>
            <Link to="/services" className={btnClass({ variant: "link", className: "self-start md:self-auto" })}>All services <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-12">
            {featured.map((s, i) => (
              <article key={s.title} className={i === 0 ? "md:col-span-6 md:row-span-2" : "md:col-span-6 lg:col-span-5 lg:col-start-8"}>
                <div className="overflow-hidden">
                  <img src={s.img} alt="" loading="lazy" width={1200} height={912} className={`w-full object-cover transition-transform duration-700 hover:scale-[1.03] ${i === 0 ? "aspect-[4/5]" : "aspect-[16/10]"}`} />
                </div>
                <div className="mt-6 flex gap-5">
                  <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-3xl text-navy">{s.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="container-site grid items-center gap-12 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-6">
          <img src={shop} alt="A mechanic standing in the shop with a car on the lift behind him" loading="lazy" width={1408} height={1008} className="photo aspect-[4/3] w-full object-cover" />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="eyebrow">The shop</p>
          <h2 className="mt-5 text-4xl text-navy md:text-5xl">Small enough to know your car by name.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Summit is a neighborhood shop, not a chain. The person who answers the phone can tell you where your car is and what's next. We'd rather earn a customer for years than sell one extra repair today.
          </p>
          <Link to="/about" className={btnClass({ variant: "link", className: "mt-8" })}>About the shop <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="bg-navy text-on-navy">
        <div className="container-site py-24 md:py-32">
          <figure className="mx-auto max-w-3xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-on-navy-muted">Sample testimonial · placeholder</p>
            <blockquote className="editorial mt-8 text-3xl leading-snug md:text-4xl">
              “They showed me the worn part, explained my options, and the final bill matched the estimate.”
            </blockquote>
            <figcaption className="mt-8 text-sm text-on-navy-muted">— Placeholder text. Real customer reviews will appear here once collected.</figcaption>
          </figure>
        </div>
      </section>

      {/* Location CTA */}
      <section className="container-site grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <h2 className="text-4xl text-navy md:text-6xl">Serving Des Moines drivers.</h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <dl className="divide-y divide-border border-y border-border">
            {BUSINESS.hours.map((h) => (
              <div key={h.days} className="flex justify-between py-4"><dt className="text-navy">{h.days}</dt><dd className="text-muted-foreground">{h.time}</dd></div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className={btnClass({ variant: "navy" })}>Contact & directions</Link>
            <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className={btnClass({ variant: "outline" })}>Open map</a>
          </div>
        </div>
      </section>
    </>
  );
}
