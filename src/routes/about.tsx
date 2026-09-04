import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: 'About Us — Rufaqa Al Umrah' },
      { name: "description", content: 'Rufaqa Al Umrah means companions of Umrah — an India-based team arranging guided Umrah journeys with clear costs and steady support.' },
      { property: "og:title", content: 'About Us — Rufaqa Al Umrah' },
      { property: "og:description", content: 'Rufaqa Al Umrah means companions of Umrah — an India-based team arranging guided Umrah journeys with clear costs and steady support.' },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Section>
      <SectionHeading eyebrow="About Us" title="About Rufaqa Al Umrah" description="Rufaqa means companions. That is exactly the role we take for the length of your journey." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Our name</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">رفقاء العمرة — Rufaqa Al Umrah — means the companions of Umrah. It describes how we work: alongside you, from the first question to your return home.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">What we do</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We plan complete Umrah journeys from India — visa assistance, flights, hotels near the Haramain, transfers, ziyarat and pre-departure guidance on the rites.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">How we work</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">One point of contact answers your enquiry, sends your written quotation and stays reachable while you travel. Hotel names and actual walking distances are stated before you book, never described vaguely.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">What we will not do</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">We do not advertise prices we cannot honour, publish invented reviews, or promise visa outcomes that are not ours to give. If something is uncertain, we say so.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Who we serve</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">First-time pilgrims, families travelling with elders and children, and community or masjid groups planning a departure together.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Talk to us</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Call or message us on WhatsApp and tell us your intention. We will tell you honestly whether we can serve it well.</p>
        </section>
      </div>
    </Section>
  );
}
