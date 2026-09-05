import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";
import { FAQS } from "@/config/content";
import { resolveBusiness, resolveFaqs } from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";
import type { SiteData } from "@/lib/content";

const TITLE = "Umrah FAQs — Visa, Costs, Documents & Booking | Rufaqa Al Umrah";
const DESCRIPTION =
  "Answers to common questions about Umrah visas, documents, package costs, group and family travel, payments and cancellations — from Rufaqa Al Umrah, Mumbai.";

export const Route = createFileRoute("/faq")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteDataQuery),
  head: ({ loaderData }) => {
    const faqs = resolveFaqs(loaderData as SiteData | undefined) ?? FAQS;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        },
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const faqs = resolveFaqs(data);
  const business = resolveBusiness(data);

  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow="Questions"
          title="Frequently asked questions"
          description="If your question is not answered here, call or message us — we would rather explain it properly than have you guess."
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 sm:p-6">
              <summary className="cursor-pointer list-none font-medium text-foreground marker:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span aria-hidden="true" className="mt-0.5 text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">Still unsure about something?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Speak to a companion on {business.phoneDisplay}, {business.hours}.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${business.phoneDial}`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Call now
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground"
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
