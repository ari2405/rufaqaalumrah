import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: 'Disclaimer — Rufaqa Al Umrah' },
      { name: "description", content: 'Important notes about the information published on the Rufaqa Al Umrah website.' },
      { property: "og:title", content: 'Disclaimer — Rufaqa Al Umrah' },
      { property: "og:description", content: 'Important notes about the information published on the Rufaqa Al Umrah website.' },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Disclaimer" description="What the information on this website does and does not represent." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Indicative information</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Package contents, hotel names, distances and prices published here are indicative and subject to availability. They are confirmed only in your written quotation.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Placeholder content</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Some package details, imagery and testimonials on this site are clearly marked placeholders while the operator finalises verified content. They should not be relied upon as confirmed offers.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">No religious ruling</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Guidance on this site about the rites of Umrah is a practical summary. For religious rulings, please consult a qualified scholar.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Third parties</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Airlines, hotels, transport operators and authorities are independent parties. Their decisions, schedules and rules are outside our control.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">External links</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We are not responsible for the content or accuracy of any website we link to.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">No guarantees of outcome</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We do not guarantee visa approval, specific hotel rooms or seat allocations, or a particular travel schedule.</p>
        </section>
      </div>
    </Section>
  );
}
