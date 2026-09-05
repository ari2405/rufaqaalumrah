import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";

import { PackageCard } from "@/components/site/PackageCard";
import { QuickEnquiryBar } from "@/components/site/QuickEnquiryBar";
import { Section, SectionHeading, ImageFrame } from "@/components/site/Section";
import { serviceIcon } from "@/routes/services";
import { PROCESS_STEPS, WHY_US } from "@/config/content";
import {
  imageSrc,
  resolveBusiness,
  resolveFaqs,
  resolveImages,
  resolvePackages,
  resolveServices,
  resolveTestimonials,
  whatsappHref,
} from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";

const TITLE = "Umrah Packages from India — Rufaqa Al Umrah | رفقاء العمرة";
const DESCRIPTION =
  "Rufaqa Al Umrah arranges guided Umrah journeys from India: visa assistance, flights, hotels near the Haramain, transfers and ziyarat — with written quotations before you book.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const business = resolveBusiness(data);
  const images = resolveImages(data);
  const packages = resolvePackages(data);
  const services = resolveServices(data);
  const faqs = resolveFaqs(data).slice(0, 5);
  const testimonials = resolveTestimonials(data);

  const cities = [...new Set(packages.flatMap((p) => p.departureCities))].sort();
  const categories = [...new Set(packages.map((p) => p.category))];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={imageSrc(images, "hero")}
          alt={images.hero.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/80" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl text-primary-foreground">
            <p className="font-arabic text-2xl text-accent" lang="ar" dir="rtl">
              {business.brandArabic}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {business.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
              Guided Umrah journeys from India — visas, flights, hotels within walking distance of the
              Haramain, transfers and ziyarat. Planned honestly, quoted in writing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/packages"
            search={{ city: "", duration: "", type: "" }}
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-background/90"
              >
                See Umrah packages
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${business.phoneDial}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-12">
            <QuickEnquiryBar cities={cities} categories={categories} />
          </div>
        </div>
      </section>

      {/* Why us */}
      <Section>
        <SectionHeading
          eyebrow="Why travel with us"
          title="Companions, not just a booking desk"
          description="Rufaqa means companions. The promise is simple: one contact, stated facts and no surprises."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <Check className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Makkah & Madinah split */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="The two cities"
          title="Makkah and Madinah, planned differently"
          description="Each city asks for something different from your itinerary. We plan them separately, then join them."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-border bg-card">
            <ImageFrame
              src={imageSrc(images, "makkah")}
              alt={images.makkah.alt}
              ratio="aspect-[16/10]"
              className="rounded-none"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold text-foreground">Makkah</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your Umrah begins here. We prioritise the shortest safe walk to Masjid al-Haram, quiet
                rooms for rest between prayers, and a companion who walks the tawaf and sa'i with first-time
                pilgrims.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Hotels quoted with their real walking distance",
                  "Ihram and rites explained before arrival",
                  "Ziyarat around crowd-free hours where possible",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-border bg-card">
            <ImageFrame
              src={imageSrc(images, "madinah")}
              alt={images.madinah.alt}
              ratio="aspect-[16/10]"
              className="rounded-none"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold text-foreground">Madinah</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Madinah is the gentler half of the journey. Stays are chosen near the Haram gates, with
                unhurried days for salaam, Riyadul Jannah guidance and the historic sites around the city.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Stays near the Masjid an-Nabawi gates",
                  "Help with Riyadul Jannah permits",
                  "Ziyarat to Uhud, Quba and Qiblatain",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </Section>

      {/* Packages */}
      <Section>
        <SectionHeading
          eyebrow="Umrah packages"
          title="Journeys for every budget and family"
          description="Starting points you can adjust. Final hotels, flights and costs are confirmed in writing before booking."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/packages"
            search={{ city: "", duration: "", type: "" }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Compare all packages
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* Services */}
      <Section tone="muted">
        <SectionHeading eyebrow="Our services" title="What we take care of" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                {serviceIcon(service.icon)}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="How it works" title="From intention to return" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Testimonials */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="In their words"
          title="Feedback from travellers"
          description="We publish only messages travellers have given us permission to share. Placeholder entries stay unpublished until real feedback replaces them."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={`${t.name}-${t.quote.slice(0, 12)}`} className="rounded-2xl border border-border bg-card p-6">
              <blockquote className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-foreground">
                {t.name}
                <span className="block text-xs font-normal text-muted-foreground">{t.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ preview */}
      <Section>
        <SectionHeading eyebrow="Questions" title="Answers before you ask" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 sm:p-6">
              <summary className="cursor-pointer list-none font-medium text-foreground">
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
        <div className="mt-8 text-center">
          <Link to="/faq" className="text-sm font-semibold text-primary underline underline-offset-4">
            Read all FAQs
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="deep">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-arabic text-2xl text-accent" lang="ar" dir="rtl">
            {business.brandArabic}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Begin your Umrah with companions</h2>
          <p className="mt-3 text-primary-foreground/80">
            Share your dates and we will send options the same working day, {business.hours.toLowerCase()}.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary">
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
