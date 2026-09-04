import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/refund-and-cancellation-policy")({
  head: () => ({
    meta: [
      { title: 'Refund & Cancellation Policy — Rufaqa Al Umrah' },
      { name: "description", content: 'How cancellations, changes and refunds are handled for Umrah bookings with Rufaqa Al Umrah.' },
      { property: "og:title", content: 'Refund & Cancellation Policy — Rufaqa Al Umrah' },
      { property: "og:description", content: 'How cancellations, changes and refunds are handled for Umrah bookings with Rufaqa Al Umrah.' },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/refund-and-cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-and-cancellation-policy" }],
  }),
  component: RefundAndCancellationPolicyPage,
});

function RefundAndCancellationPolicyPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Refund & Cancellation Policy" description="What happens if plans change, explained plainly." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">How cancellations work</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cancellation requests must be sent to us in writing. The date we receive your written request is the date used to calculate any charges.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Supplier terms decide the outcome</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Airfare, hotel and visa charges follow the terms of the airline, hotel and processing channel involved. Some components are non-refundable once issued or confirmed.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Service fee</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Our service fee covers work already done — planning, documentation and coordination — and is not refundable once a booking has been processed.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Refund timelines</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Once suppliers confirm what is recoverable, we pass on the refundable amount to the original payment method. Supplier processing times are outside our control and we will keep you updated.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Visa refusal</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">If a visa is refused, we will show you exactly what has been spent, what is recoverable and what is not, and refund the recoverable portion.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Changes instead of cancellation</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Where possible we will try to move your travel dates rather than cancel. Any fare or rate difference and supplier change fees will apply.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Your written quotation prevails</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">The cancellation schedule stated in your written quotation or invoice applies to your specific booking.</p>
        </section>
      </div>
    </Section>
  );
}
