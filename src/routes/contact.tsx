import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { btnClass } from "@/components/site/Button";
import { BUSINESS } from "@/components/site/business";
import { Field, aria, DemoNote } from "@/components/site/form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Hours — Summit Auto Repair, Des Moines" },
      { name: "description", content: "Call, send a message or get directions to Summit Auto Repair in Des Moines, Iowa. Business hours and contact details." },
      { property: "og:title", content: "Contact — Summit Auto Repair" },
      { property: "og:description", content: "Hours, phone and directions for our Des Moines shop." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(1000, "Please keep it under 1,000 characters."),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] ??= i.message));
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({});
    setSent(r.data.name.split(" ")[0]);
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Call, write,<br />or stop by.</>}>
        The fastest way to reach us is by phone during shop hours.
      </PageHeader>

      <section className="container-site grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <aside className="space-y-12 md:col-span-4">
          <div>
            <h2 className="eyebrow">Phone</h2>
            <a href={BUSINESS.phoneHref} className="mt-3 inline-flex items-center gap-3 font-display text-3xl font-semibold text-navy hover:text-accent">
              <Phone className="h-5 w-5" aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
            <p className="mt-2 text-xs text-muted-foreground">Placeholder number — replace before launch.</p>
          </div>
          <div>
            <h2 className="eyebrow">Hours</h2>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {BUSINESS.hours.map((h) => (
                <div key={h.days} className="flex justify-between py-3"><dt className="text-navy">{h.days}</dt><dd className="text-muted-foreground">{h.time}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="eyebrow">Location</h2>
            <p className="mt-3 text-navy">{BUSINESS.city}</p>
            <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className={btnClass({ variant: "outline", size: "sm", className: "mt-4" })}>
              <MapPin className="h-4 w-4" aria-hidden /> Open in Google Maps
            </a>
          </div>
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          {sent ? (
            <div role="status" className="fade-up bg-paper p-10 md:p-14">
              <span className="rule-accent" />
              <h2 className="mt-6 text-4xl text-navy">Thanks, {sent}.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Your message passed validation — but this is a demo site, so nothing was sent and no one will receive it. For a real shop, this is where a confirmation would appear.</p>
              <button type="button" onClick={() => setSent(null)} className={btnClass({ variant: "navy", className: "mt-8" })}>Write another message</button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-7">
              <h2 className="text-4xl text-navy">Send a message</h2>
              <div className="grid gap-7 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}><input {...aria("name", errors.name)} autoComplete="name" className="field" /></Field>
                <Field id="email" label="Email" error={errors.email}><input {...aria("email", errors.email)} type="email" autoComplete="email" className="field" /></Field>
              </div>
              <Field id="message" label="Message" error={errors.message}><textarea {...aria("message", errors.message)} rows={6} maxLength={1000} className="field resize-y" /></Field>
              <button type="submit" className={btnClass({ size: "lg" })}>Send message</button>
              <DemoNote>Demo form: messages are validated in your browser but not sent anywhere.</DemoNote>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
