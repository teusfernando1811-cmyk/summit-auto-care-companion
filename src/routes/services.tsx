import { createFileRoute, Link } from "@tanstack/react-router";
import brakes from "@/assets/brakes.jpg";
import diagnostics from "@/assets/diagnostics.jpg";
import tires from "@/assets/tires.jpg";
import hero from "@/assets/hero-mechanic.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { btnClass } from "@/components/site/Button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Auto Repair Services — Summit Auto Repair, Des Moines" },
      { name: "description", content: "Oil changes, brakes, diagnostics, tires and alignment, engine repair and suspension work at an independent Des Moines repair shop." },
      { property: "og:title", content: "Services — Summit Auto Repair" },
      { property: "og:description", content: "Everyday maintenance and repair, explained clearly." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const services = [
  { title: "Oil Changes", text: "Conventional and synthetic oil to your manufacturer's spec, a new filter, and a quick look at fluids, belts and tires while the car is up.", note: "Usually same-day" },
  { title: "Brakes", text: "Squealing, grinding or a soft pedal. We measure pads and rotors, check lines and fluid, and only replace what's actually worn.", note: "Inspection first" },
  { title: "Diagnostics", text: "Warning lights, rough idle, odd noises. We scan, test and trace the problem to its cause, then explain it in plain language.", note: "Check engine light" },
  { title: "Tires & Alignment", text: "Mounting, balancing, rotation, flat repair and wheel alignment to keep the car straight and your tires lasting.", note: "Even wear" },
  { title: "Engine Repair", text: "From gaskets and sensors to timing components and cooling systems — repairs quoted up front, with your approval before we start.", note: "Quoted up front" },
  { title: "Suspension & Steering", text: "Shocks, struts, ball joints, tie rods and control arms for a car that rides smoothly and steers the way it should.", note: "Ride & handling" },
];

function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title={<>Everyday repairs,<br />done properly.</>}>
        Most cars that come through our doors need one of six things. Here's what each involves — no package deals, no upsells.
      </PageHeader>

      <section className="container-site py-20 md:py-28">
        <ol className="border-t border-border">
          {services.map((s, i) => (
            <li key={s.title} className="grid gap-4 border-b border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
              <span className="font-display text-sm font-semibold text-accent md:col-span-1">0{i + 1}</span>
              <h2 className="text-3xl text-navy md:col-span-4 md:text-4xl">{s.title}</h2>
              <p className="max-w-xl leading-relaxed text-muted-foreground md:col-span-5">{s.text}</p>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-navy/60 md:col-span-2 md:text-right">{s.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site grid grid-cols-2 gap-4 pb-24 md:grid-cols-12 md:gap-6">
        <img src={brakes} alt="Replacing a brake caliper" loading="lazy" width={1200} height={912} className="col-span-2 aspect-[16/10] w-full object-cover md:col-span-7" />
        <div className="col-span-2 grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1 md:gap-6">
          <img src={diagnostics} alt="A scan tool connected under the dashboard" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full object-cover" />
          <img src={tires} alt="Alignment equipment on a front wheel" loading="lazy" width={1200} height={912} className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy text-on-navy">
        <img src={hero} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="container-site flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <h2 className="max-w-xl text-4xl md:text-5xl">Not sure what your car needs?</h2>
          <Link to="/appointment" className={btnClass({ size: "lg" })}>Book an inspection</Link>
        </div>
      </section>
    </>
  );
}
