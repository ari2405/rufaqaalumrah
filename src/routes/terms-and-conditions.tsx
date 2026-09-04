import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: 'Terms & Conditions — Rufaqa Al Umrah' },
      { name: "description", content: 'The terms that apply when you book Umrah travel arrangements through Rufaqa Al Umrah.' },
      { property: "og:title", content: 'Terms & Conditions — Rufaqa Al Umrah' },
      { property: "og:description", content: 'The terms that apply when you book Umrah travel arrangements through Rufaqa Al Umrah.' },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Terms & Conditions" description="Please read these terms before making a booking." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Our role</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Rufaqa Al Umrah arranges travel services — flights, accommodation, transport, ziyarat and visa processing assistance. Services are delivered by airlines, hotels and transport operators under their own terms.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Quotations and prices</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Prices shown on this website are indicative starting points and are not confirmed offers. Your final price is issued in writing and is valid only for the period stated in that quotation.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Bookings and payments</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A booking is confirmed only once the agreed payment has been received against a written quotation or invoice and confirmations have been issued.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Visas</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Umrah visas are issued solely at the discretion of the authorities of the Kingdom of Saudi Arabia. We assist with the application; we cannot guarantee the outcome or the processing time.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Changes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Airlines, hotels and authorities may change schedules, allocations and rules. Where a change is required we will inform you promptly and offer the closest available alternative.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Traveller responsibilities</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">You are responsible for valid travel documents, accurate personal details, meeting health requirements, and arriving on time for departures and transfers.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Liability</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We are not liable for losses caused by events outside our reasonable control, including flight disruption, weather, crowd management measures and decisions by government authorities.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Governing law</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These terms are governed by the laws of India, with jurisdiction in Mumbai, Maharashtra.</p>
        </section>
      </div>
    </Section>
  );
}
