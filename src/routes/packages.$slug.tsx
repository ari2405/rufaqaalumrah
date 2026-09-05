import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, MapPin, Moon, Star, XCircle } from "lucide-react";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Section, SectionHeading } from "@/components/site/Section";
import { formatINR, resolveBusiness, resolvePackages, whatsappHref, type SiteData } from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";

function findPkg(data: SiteData | undefined, slug: string) {
  return resolvePackages(data).find((p) => p.slug === slug);
}

export const Route = createFileRoute("/packages/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(siteDataQuery);
    if (!findPkg(data, params.slug)) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const pkg = findPkg(loaderData as SiteData | undefined, params.slug);
    if (!pkg) {
      return {
        meta: [{ title: "Package unavailable — Rufaqa Al Umrah" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${pkg.title} — Rufaqa Al Umrah`;
    const description = pkg.summary.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: pkg.title,
            description: pkg.summary,
            touristType: "Umrah pilgrims travelling from India",
            itinerary: {
              "@type": "ItemList",
              itemListElement: pkg.itinerary.map((step, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${step.day} — ${step.title}`,
                description: step.detail,
              })),
            },
            provider: { "@type": "TravelAgency", name: "Rufaqa Al Umrah" },
          }),
        },
      ],
    };
  },
  component: PackageDetail,
  notFoundComponent: PackageNotFound,
});

function PackageNotFound() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        title="That package is not available"
        description="It may have been renamed or withdrawn. Browse the current Umrah packages instead."
      />
      <div className="mt-6 text-center">
        <Link to="/packages"
            search={{ city: "", duration: "", type: "" }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          See all packages
        </Link>
      </div>
    </Section>
  );
}

function PackageDetail() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const { slug } = Route.useParams();
  const pkg = findPkg(data, slug);
  const business = resolveBusiness(data);

  if (!pkg) return <PackageNotFound />;

  const enquiry = `Assalamu alaikum ${business.brandEnglish}, I would like details about the ${pkg.title} package.`;

  return (
    <>
      <Section className="pb-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <Link to="/packages"
            search={{ city: "", duration: "", type: "" }} className="hover:text-primary">
            Umrah Packages
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{pkg.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {pkg.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {pkg.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pkg.summary}</p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <Fact icon={<Moon className="size-4" />} label="Duration" value={`${pkg.nights} nights`} />
              <Fact
                icon={<MapPin className="size-4" />}
                label="Split"
                value={`${pkg.makkahNights} Makkah · ${pkg.madinahNights} Madinah`}
              />
              <Fact icon={<Star className="size-4" />} label="Hotels" value={`${pkg.hotelStars}-star category`} />
            </dl>

            <div className="mt-6 rounded-2xl border border-border bg-secondary/40 p-5">
              {pkg.priceFrom ? (
                <p className="font-display text-2xl font-semibold text-foreground">
                  From {formatINR(pkg.priceFrom)}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">per person</span>
                </p>
              ) : (
                <p className="font-display text-2xl font-semibold text-foreground">Price on enquiry</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.priceNote}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${business.phoneDial}`}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Call {business.phoneDisplay}
                </a>
                <a
                  href={whatsappHref(business.whatsapp, enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-secondary/60">
            <img
              src={pkg.imageUrl}
              alt={pkg.imageAlt}
              loading="eager"
              decoding="async"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] size-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="muted" className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <ListBlock title="Highlights" items={pkg.highlights} tone="neutral" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <ListBlock title="What is included" items={pkg.inclusions} tone="yes" />
            <ListBlock title="What is not included" items={pkg.exclusions} tone="no" />
          </div>
        </div>
      </Section>

      <Section className="py-12">
        <h2 className="font-display text-2xl font-semibold text-foreground">Day-by-day outline</h2>
        <ol className="mt-6 space-y-4 border-l border-border pl-6">
          {pkg.itinerary.map((step) => (
            <li key={`${step.day}-${step.title}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
              />
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{step.day}</p>
              <p className="font-medium text-foreground">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-display text-2xl font-semibold text-foreground">Hotels</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {pkg.hotels.map((hotel) => (
            <div key={`${hotel.city}-${hotel.name}`} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{hotel.city}</p>
              <p className="mt-1 font-medium text-foreground">{hotel.name}</p>
              <p className="text-sm text-muted-foreground">{hotel.distance}</p>
              <p className="mt-1 text-sm text-muted-foreground">{hotel.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Hotel names shown here are placeholders until your dates are confirmed. The exact hotel and its
          walking distance are stated in your written quotation.
        </p>
      </Section>

      <Section tone="muted" id="enquire" className="py-12">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={`Enquire about ${pkg.title}`}
            description="Share your dates and we will reply with availability and the current cost."
          />
          <div className="mt-8">
            <EnquiryForm
              sourceForm="package"
              packageSlug={pkg.slug}
              heading="Package enquiry"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "neutral" | "yes" | "no";
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            {tone === "no" ? (
              <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
