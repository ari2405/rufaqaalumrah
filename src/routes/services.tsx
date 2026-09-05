import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Bus,
  Map as MapIcon,
  Plane,
  Stamp,
  Star,
  Users,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/site/Section";
import { PROCESS_STEPS } from "@/config/content";
import { resolveBusiness, resolveServices, whatsappHref } from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";

const TITLE = "Umrah Services — Visa, Flights, Hotels & Ziyarat | Rufaqa Al Umrah";
const DESCRIPTION =
  "Umrah visa assistance, flights from Indian cities, hotels near the Haramain, airport and intercity transfers, guided ziyarat and on-ground companionship from Rufaqa Al Umrah.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(siteDataQuery),
  component: ServicesPage,
});

export function serviceIcon(name: string) {
  const cls = "size-5";
  if (name === "stamp") return <Stamp className={cls} aria-hidden="true" />;
  if (name === "plane") return <Plane className={cls} aria-hidden="true" />;
  if (name === "building") return <Building2 className={cls} aria-hidden="true" />;
  if (name === "bus") return <Bus className={cls} aria-hidden="true" />;
  if (name === "map") return <MapIcon className={cls} aria-hidden="true" />;
  if (name === "users") return <Users className={cls} aria-hidden="true" />;
  return <Star className={cls} aria-hidden="true" />;
}

function ServicesPage() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const services = resolveServices(data);
  const business = resolveBusiness(data);

  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow="What we arrange"
          title="Everything the journey needs, handled by one team"
          description="From the first document to the flight home, the same companions stay with you. Nothing below is outsourced to a stranger you have never spoken to."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                {serviceIcon(service.icon)}
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-foreground">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="How the planning works" description="Four steps, with a written record at each one." />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-3xl font-semibold text-accent-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-medium text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold">Tell us what you need arranged</h2>
          <p className="mt-3 text-primary-foreground/80">
            Visa only, flights only, or the whole journey — we will tell you plainly what we can and cannot do.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary"
            >
              Send an enquiry
            </Link>
            <a
              href={whatsappHref(business.whatsapp, business.whatsappDefaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
