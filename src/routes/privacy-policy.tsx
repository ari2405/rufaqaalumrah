import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Rufaqa Al Umrah' },
      { name: "description", content: 'How Rufaqa Al Umrah collects, uses and protects the personal information you share when enquiring about an Umrah package.' },
      { property: "og:title", content: 'Privacy Policy — Rufaqa Al Umrah' },
      { property: "og:description", content: 'How Rufaqa Al Umrah collects, uses and protects the personal information you share when enquiring about an Umrah package.' },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Legal" title="Privacy Policy" description="Last updated on the date this page was published. This policy explains what we collect and why." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">What we collect</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">When you submit an enquiry we collect your name, phone number, and optionally your email, departure city, preferred travel dates, number of pilgrims and any message you write. If you tick the WhatsApp opt-in box we also record that consent, its wording and the time it was given.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Why we collect it</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Only to respond to your enquiry, prepare a quotation, process bookings and travel documentation, and — where you have opted in — to follow up on WhatsApp about your enquiry.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Sharing</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Details are shared only with the airlines, hotels, transport providers and visa processing channels needed to fulfil your booking, and where required by law. We do not sell your data.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">WhatsApp messages</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Automated WhatsApp follow-ups are sent only to people who ticked the opt-in box, through an approved WhatsApp Business API provider. You can ask us to stop at any time and we will stop.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Retention</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Enquiry records are kept only as long as needed to serve you and to meet legal or accounting obligations.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Your choices</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Write to us at the contact address on this website to ask for a copy of your data, to correct it, or to have it deleted.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Cookies</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">This website uses only what is needed to serve pages. If analytics are added later, this section will be updated before they are enabled.</p>
        </section>
      </div>
    </Section>
  );
}
