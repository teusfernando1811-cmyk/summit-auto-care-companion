import { createFileRoute, Link } from "@tanstack/react-router";
import shop from "@/assets/shop.jpg";
import brakes from "@/assets/brakes.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { btnClass } from "@/components/site/Button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Shop — Summit Auto Repair, Des Moines" },
      { name: "description", content: "An independent, local repair shop in Des Moines built on careful work, clear communication and fair estimates." },
      { property: "og:title", content: "About — Summit Auto Repair" },
      { property: "og:description", content: "Craftsmanship, local service and transparency." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { title: "Craftsmanship", text: "We take the time to diagnose properly and fix things the right way, the first time. Torque specs, clean work, a test drive before you get the keys back." },
  { title: "Local service", text: "We're your neighbors. You'll talk to the people who work on your car — not a call center — and we'll remember you next time." },
  { title: "Transparency", text: "Written estimates before work starts. A phone call if anything changes. Your old parts, if you'd like to see them." },
];

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title={<>A neighborhood<br />shop, run carefully.</>}>
        Summit Auto Repair is an independent shop in Des Moines, Iowa, focused on the cars people drive every day.
      </PageHeader>

      <section className="container-site -mt-4 pb-24 md:pb-32">
        <img src={shop} alt="A mechanic in the shop, with a car on a lift and the bay door open" loading="lazy" width={1408} height={1008} className="photo aspect-[16/9] w-full object-cover" />
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <p className="editorial text-3xl leading-snug text-navy md:col-span-6 md:text-4xl">
            Good repair work is mostly patience: listening to the driver, testing before guessing, and explaining before charging.
          </p>
          <div className="space-y-5 leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
            <p>We're not trying to be the biggest shop in town. We want to be the one you call when something sounds wrong — and the one you trust to tell you when it can wait.</p>
            <p>That means honest priorities: what needs attention now, what to watch, and what's fine. You decide what gets done.</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="rule-accent" />
            <h2 className="mt-6 text-4xl text-navy md:text-5xl">What we hold ourselves to.</h2>
            <img src={brakes} alt="Hands in work gloves fitting a brake caliper" loading="lazy" width={1200} height={912} className="mt-10 hidden aspect-[4/5] w-full object-cover md:block" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border py-10 first:border-t-0 first:pt-0">
                <h3 className="text-3xl text-navy">{v.title}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
            <Link to="/contact" className={btnClass({ variant: "navy", className: "mt-6" })}>Come by the shop</Link>
          </div>
        </div>
      </section>
    </>
  );
}
