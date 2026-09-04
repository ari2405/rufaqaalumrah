import { useState } from "react";
import { z } from "zod";

import { CONSENT, SITE, whatsappLink } from "@/lib/site";
import { DEPARTURE_CITIES, CATEGORIES } from "@/data/packages";
import { submitLead } from "@/lib/leads.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+0-9 ()-]+$/, "Only digits, spaces and + ( ) - are allowed"),
  email: z.string().trim().email("Please enter a valid email").max(160).or(z.literal("")),
  departureCity: z.string().trim().max(60),
  travelDate: z.string().trim().max(40),
  pilgrims: z.string().trim().max(4),
  duration: z.string().trim().max(40),
  packageType: z.string().trim().max(40),
  message: z.string().trim().max(1000),
  consent: z.boolean(),
});

type Values = z.infer<typeof schema>;

const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  departureCity: "",
  travelDate: "",
  pilgrims: "",
  duration: "",
  packageType: "",
  message: "",
  consent: false,
};

const field =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function EnquiryForm({
  sourceForm = "contact",
  packageSlug,
  heading = "Send your enquiry",
}: {
  sourceForm?: string;
  packageSlug?: string;
  heading?: string;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (key: keyof Values, value: string | boolean) =>
    setValues((v) => ({ ...v, [key]: value }));

  const summary = `Assalamu alaikum ${SITE.brandShort}, I would like to enquire about Umrah.
Name: ${values.name || "-"}
Departure city: ${values.departureCity || "-"}
Travel date: ${values.travelDate || "-"}
Pilgrims: ${values.pilgrims || "-"}
Duration: ${values.duration || "-"}
Package type: ${values.packageType || "-"}${values.message ? `\nMessage: ${values.message}` : ""}`;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setState("error");
      setErrorMessage("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setState("loading");
    setErrorMessage("");
    try {
      await submitLead({
        data: {
          ...parsed.data,
          sourceForm,
          packageSlug: packageSlug ?? "",
          consentText: parsed.data.consent ? CONSENT.wording : "",
          consentVersion: parsed.data.consent ? CONSENT.version : "",
        },
      });
      setState("success");
    } catch (error) {
      console.error(error);
      setState("error");
      setErrorMessage("We could not send your enquiry just now. Please call or WhatsApp us instead.");
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-primary/25 bg-secondary/50 p-6 text-center"
      >
        <h3 className="font-display text-xl font-semibold text-foreground">
          JazakAllah khair — your enquiry has reached us
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A companion from our team will reply on {SITE.phoneDisplay}. You can also continue the
          conversation on WhatsApp right away.
        </p>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-5 sm:p-7">
      <h3 className="font-display text-xl font-semibold text-foreground">{heading}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us the essentials and we will reply with options that genuinely fit.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input
            id="name"
            className={field}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field id="phone" label="Phone / WhatsApp number" required error={errors.phone}>
          <input
            id="phone"
            className={field}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field id="email" label="Email (optional)" error={errors.email}>
          <input
            id="email"
            className={field}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field id="departureCity" label="Departure city">
          <select
            id="departureCity"
            className={field}
            value={values.departureCity}
            onChange={(e) => set("departureCity", e.target.value)}
          >
            <option value="">Select a city</option>
            {DEPARTURE_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field id="travelDate" label="Preferred travel date or month">
          <input
            id="travelDate"
            className={field}
            placeholder="e.g. November 2026"
            value={values.travelDate}
            onChange={(e) => set("travelDate", e.target.value)}
          />
        </Field>
        <Field id="pilgrims" label="Number of pilgrims">
          <input
            id="pilgrims"
            className={field}
            inputMode="numeric"
            value={values.pilgrims}
            onChange={(e) => set("pilgrims", e.target.value.replace(/\D/g, "").slice(0, 3))}
          />
        </Field>
        <Field id="duration" label="Duration">
          <select
            id="duration"
            className={field}
            value={values.duration}
            onChange={(e) => set("duration", e.target.value)}
          >
            <option value="">No preference</option>
            <option value="Up to 10 nights">Up to 10 nights</option>
            <option value="11–14 nights">11–14 nights</option>
            <option value="15 nights or more">15 nights or more</option>
          </select>
        </Field>
        <Field id="packageType" label="Package type">
          <select
            id="packageType"
            className={field}
            value={values.packageType}
            onChange={(e) => set("packageType", e.target.value)}
          >
            <option value="">No preference</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field id="message" label="Anything else we should know?">
          <textarea
            id="message"
            rows={4}
            className={field}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            maxLength={1000}
          />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-0.5 size-4 rounded border-input accent-[var(--color-primary)]"
        />
        <span className="text-muted-foreground">{CONSENT.wording}</span>
      </label>
      <p className="mt-2 text-xs text-muted-foreground">
        Optional. We only use your details to answer your enquiry — see our{" "}
        <a href="/privacy-policy" className="underline">
          privacy policy
        </a>
        .
      </p>

      {state === "error" && errorMessage ? (
        <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {state === "loading" ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Send on WhatsApp instead
        </a>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
