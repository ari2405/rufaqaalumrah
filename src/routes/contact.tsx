import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Section, SectionHeading } from "@/components/site/Section";
import { resolveBusiness, whatsappHref } from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";

const TITLE = "Contact Rufaqa Al Umrah — Umrah Enquiries from Mumbai";
const DESCRIPTION =
  "Call, WhatsApp or email Rufaqa Al Umrah for Umrah package enquiries, custom itineraries and group departures from Indian cities. We reply during working hours.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const business = resolveBusiness(data);

  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Talk to a companion, not a call centre"
        description="Send the details below and we will reply with options that fit. If it is urgent, calling is fastest."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-4">
          <ContactRow
            icon={<Phone className="size-5" />}
            label="Phone"
            value={business.phoneDisplay}
            href={`tel:${business.phoneDial}`}
          />
          <ContactRow
            icon={<MessageCircle className="size-5" />}
            label="WhatsApp"
            value="Message us with your dates"
            href={whatsappHref(business.whatsapp, business.whatsappDefaultMessage)}
            external
          />
          <ContactRow
            icon={<Mail className="size-5" />}
            label="Email"
            value={business.email}
            href={`mailto:${business.email}`}
          />
          <ContactRow icon={<MapPin className="size-5" />} label="Where we are" value={business.addressLine} />
          <ContactRow icon={<Clock className="size-5" />} label="Working hours" value={business.hours} />

          <p className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
            We only use your details to answer your enquiry. Automated WhatsApp follow-ups are sent
            solely to people who tick the opt-in box on the form.
          </p>
        </div>

        <EnquiryForm sourceForm="contact" heading="Send your enquiry" />
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm font-medium text-foreground">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">{body}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
    >
      {body}
    </a>
  );
}
