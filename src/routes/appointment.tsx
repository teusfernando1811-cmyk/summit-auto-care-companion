import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/site/PageHeader";
import { btnClass } from "@/components/site/Button";
import { BUSINESS, SERVICE_OPTIONS } from "@/components/site/business";
import { Field, aria, DemoNote } from "@/components/site/form";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Summit Auto Repair, Des Moines" },
      { name: "description", content: "Request a service appointment at Summit Auto Repair in Des Moines, Iowa. Demo booking form." },
      { property: "og:title", content: "Book an Appointment — Summit Auto Repair" },
      { property: "og:description", content: "Tell us about your car and pick a preferred date." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/appointment" },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: Appointment,
});

const today = () => new Date().toISOString().slice(0, 10);

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().refine((v) => v.replace(/\D/g, "").length === 10 || (v.replace(/\D/g, "").length === 11 && v.replace(/\D/g, "")[0] === "1"), "Please enter a 10-digit US phone number."),
  vehicle: z.string().trim().min(3, "Please add year, make and model (e.g. 2016 Honda Civic).").max(120),
  service: z.string().min(1, "Please choose a service."),
  date: z.string().min(1, "Please choose a preferred date.").refine((d) => d >= today(), "Please choose today or a future date.").refine((d) => !d || new Date(d + "T12:00").getDay() !== 0, "We're closed on Sundays — please pick another day."),
  notes: z.string().trim().max(1000, "Please keep notes under 1,000 characters.").optional(),
});
type Data = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Data, string>>;

function Appointment() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Data | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] ??= i.message));
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({});
    setDone(r.data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    const date = new Date(done.date + "T12:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return (
      <section className="bg-paper">
        <div role="status" className="container-site fade-up max-w-3xl py-24 md:py-32">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-accent">Demo only — no appointment was booked</p>
          <h1 className="mt-6 text-5xl text-navy md:text-6xl">Request received, {done.name.split(" ")[0]}.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            This is a demonstration. Your details were checked in your browser but were not sent, stored, or scheduled. A real shop would confirm by phone or email.
          </p>
          <dl className="mt-10 divide-y divide-border border-y border-border bg-background px-6">
            {[["Vehicle", done.vehicle], ["Service", done.service], ["Preferred date", date], ["Contact", `${done.email} · ${done.phone}`]].map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-3"><dt className="font-display text-sm uppercase tracking-[0.14em] text-navy">{k}</dt><dd className="text-muted-foreground sm:col-span-2">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" onClick={() => setDone(null)} className={btnClass({ variant: "navy" })}>Start over</button>
            <Link to="/" className={btnClass({ variant: "outline" })}>Back to home</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Book Appointment" title={<>Tell us about<br />your car.</>}>
        Pick a preferred day and we'll confirm a time. Prefer to talk? Call <a href={BUSINESS.phoneHref} className="text-navy underline decoration-accent underline-offset-4">{BUSINESS.phoneDisplay}</a>.
      </PageHeader>

      <section className="container-site grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <form noValidate onSubmit={onSubmit} className="space-y-10 md:col-span-8">
          <fieldset className="space-y-7">
            <legend className="mb-6 text-2xl font-display font-semibold uppercase text-navy">01 · You</legend>
            <Field id="name" label="Full name" error={errors.name}><input {...aria("name", errors.name)} autoComplete="name" className="field" /></Field>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="email" label="Email" error={errors.email}><input {...aria("email", errors.email)} type="email" autoComplete="email" className="field" /></Field>
              <Field id="phone" label="Phone" error={errors.phone}><input {...aria("phone", errors.phone)} type="tel" autoComplete="tel" placeholder="(515) 555-0123" className="field" /></Field>
            </div>
          </fieldset>
          <fieldset className="space-y-7 border-t border-border pt-10">
            <legend className="mb-6 text-2xl font-display font-semibold uppercase text-navy">02 · Your car</legend>
            <Field id="vehicle" label="Vehicle" error={errors.vehicle}><input {...aria("vehicle", errors.vehicle)} placeholder="Year, make and model" className="field" /></Field>
            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="service" label="Service" error={errors.service}>
                <select {...aria("service", errors.service)} defaultValue="" className="field">
                  <option value="" disabled>Choose a service</option>
                  {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field id="date" label="Preferred date" error={errors.date}><input {...aria("date", errors.date)} type="date" min={today()} className="field" /></Field>
            </div>
            <Field id="notes" label="Notes" optional error={errors.notes}><textarea {...aria("notes", errors.notes)} rows={4} maxLength={1000} placeholder="Noises, warning lights, when it started…" className="field resize-y" /></Field>
          </fieldset>
          <div className="space-y-6 border-t border-border pt-10">
            <button type="submit" className={btnClass({ size: "lg" })}>Request appointment</button>
            <DemoNote>Demo only: this form validates your entries but does not book, send, or store anything.</DemoNote>
          </div>
        </form>

        <aside className="md:col-span-3 md:col-start-10">
          <div className="sticky top-28 space-y-8">
            <div>
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li><span className="text-navy">1.</span> We confirm a drop-off time.</li>
                <li><span className="text-navy">2.</span> We inspect and call with an estimate.</li>
                <li><span className="text-navy">3.</span> Work starts only after your OK.</li>
              </ol>
            </div>
            <div>
              <h2 className="eyebrow">Hours</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {BUSINESS.hours.map((h) => <li key={h.days}><span className="text-navy">{h.days}</span><br />{h.time}</li>)}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
