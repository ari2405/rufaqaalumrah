import { Link } from "@tanstack/react-router";
import { MapPin, Moon, Star } from "lucide-react";

import { formatINR, type Pkg } from "@/lib/content";

export function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden bg-secondary/60">
        <img
          src={pkg.imageUrl}
          alt={pkg.imageAlt}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {pkg.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 text-accent" aria-hidden="true" />
            {pkg.hotelStars}-star stays
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
          <Link to="/packages/$slug" params={{ slug: pkg.slug }} className="hover:text-primary">
            {pkg.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Moon className="size-4 text-primary" aria-hidden="true" />
            {pkg.nights} nights — {pkg.makkahNights} in Makkah, {pkg.madinahNights} in Madinah
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Departures from {pkg.departureCities.join(", ")}</span>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          {pkg.priceFrom ? (
            <p className="font-display text-lg font-semibold text-foreground">
              From {formatINR(pkg.priceFrom)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">per person</span>
            </p>
          ) : (
            <p className="text-sm font-medium text-foreground">Price on enquiry</p>
          )}
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pkg.priceNote}</p>

          <Link
            to="/packages/$slug"
            params={{ slug: pkg.slug }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
