import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { PackageCard } from "@/components/site/PackageCard";
import { Section, SectionHeading } from "@/components/site/Section";
import { DURATION_BANDS, matchesDuration, resolveBusiness, resolvePackages } from "@/lib/content";
import { siteDataQuery } from "@/lib/public.functions";

type Search = { city: string; duration: string; type: string };

const TITLE = "Umrah Packages from India — Rufaqa Al Umrah";
const DESCRIPTION =
  "Compare Economy, Standard, Premium, Ramadan, Family and Group Umrah packages by departure city, duration and package type. Indicative starting prices, confirmed in writing before booking.";

export const Route = createFileRoute("/packages/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    city: typeof search['city'] === "string" ? search['city'] : "",
    duration: typeof search['duration'] === "string" ? search['duration'] : "",
    type: typeof search['type'] === "string" ? search['type'] : "",
  }),
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
  component: PackagesPage,
});

const field =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function PackagesPage() {
  const { data } = useSuspenseQuery(siteDataQuery);
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/packages" });

  const packages = resolvePackages(data);
  const business = resolveBusiness(data);
  const cities = [...new Set(packages.flatMap((p) => p.departureCities))].sort();
  const categories = [...new Set(packages.map((p) => p.category))];

  const results = packages.filter(
    (p) =>
      (search.city === "" || p.departureCities.includes(search.city)) &&
      (search.duration === "" || matchesDuration(p.nights, search.duration)) &&
      (search.type === "" || p.category === search.type),
  );

  const update = (patch: Partial<Search>) =>
    void navigate({ search: (prev: Search) => ({ ...prev, ...patch }) });

  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          as="h1"
          eyebrow="Umrah Packages"
          title="Choose the journey that fits your family"
          description="Every itinerary below is a starting point. Tell us your dates and we will confirm hotels, flights and the final cost in writing before anything is booked."
        />

        <div className="mt-10 grid gap-3 rounded-2xl border border-border bg-secondary/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            <span className="mb-1.5 block font-medium text-foreground">Departure city</span>
            <select className={field} value={search.city} onChange={(e) => update({ city: e.target.value })}>
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium text-foreground">Duration</span>
            <select
              className={field}
              value={search.duration}
              onChange={(e) => update({ duration: e.target.value })}
            >
              <option value="">Any duration</option>
              {DURATION_BANDS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1.5 block font-medium text-foreground">Package type</span>
            <select className={field} value={search.type} onChange={(e) => update({ type: e.target.value })}>
              <option value="">Any type</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => void navigate({ search: { city: "", duration: "", type: "" } })}
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Clear filters
            </button>
          </div>
        </div>

        <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
          Showing {results.length} of {packages.length} packages
          {search.city ? ` from ${search.city}` : ""}
          {search.duration ? ` · ${search.duration}` : ""}
          {search.type ? ` · ${search.type}` : ""}.
        </p>
      </Section>

      <Section className="pt-0">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">
              No package matches those filters yet
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              We arrange custom departures too. Clear the filters to see everything, or send us your
              requirement and we will build an itinerary around it.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => void navigate({ search: { city: "", duration: "", type: "" } })}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Clear filters
              </button>
              <a
                href={`tel:${business.phoneDial}`}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
              >
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
