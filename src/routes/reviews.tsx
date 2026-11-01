import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { btnClass } from "@/components/site/Button";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Summit Auto Repair, Des Moines" },
      { name: "description", content: "Where customer reviews of Summit Auto Repair will appear. Current entries are clearly marked sample placeholders." },
      { property: "og:title", content: "Reviews — Summit Auto Repair" },
      { property: "og:description", content: "Customer feedback for a Des Moines repair shop." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const samples = [
  { quote: "They called before doing anything extra and explained why it could wait until spring.", topic: "Brakes" },
  { quote: "The check engine light turned out to be a simple sensor. They told me that honestly instead of guessing.", topic: "Diagnostics" },
  { quote: "In and out for an oil change, and they mentioned my tire tread without pushing new tires.", topic: "Maintenance" },
  { quote: "The estimate was clear, the car was ready when promised, and the bill matched.", topic: "Suspension" },
];

function Reviews() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title={<>In our customers'<br />words — soon.</>}>
        We don't publish made-up praise. The quotes below are sample placeholders showing how real reviews will be presented once collected.
      </PageHeader>

      <section className="container-site py-20 md:py-28">
        <div className="grid gap-x-16 md:grid-cols-2">
          {samples.map((s, i) => (
            <figure key={i} className={`border-t border-border py-12 ${i % 2 === 1 ? "md:mt-24" : ""}`}>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent">Sample · placeholder · {s.topic}</p>
              <blockquote className="editorial mt-6 text-2xl leading-snug text-navy md:text-3xl">“{s.quote}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">Not a real review.</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-site grid gap-8 py-20 md:grid-cols-12 md:items-center">
          <h2 className="text-4xl text-navy md:col-span-6 md:text-5xl">Been in recently?</h2>
          <div className="md:col-span-5 md:col-start-8">
            <p className="leading-relaxed text-muted-foreground">We'd value hearing how it went — good or bad. Let us know and we'll follow up.</p>
            <Link to="/contact" className={btnClass({ variant: "navy", className: "mt-6" })}>Share feedback</Link>
          </div>
        </div>
      </section>
    </>
  );
}
