import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { SITE, telLink } from "@/lib/site";

const PACKAGE_LINKS = [
  { to: "/packages", label: "All Umrah Packages" },
  { to: "/packages/economy-umrah-10-nights", label: "Economy Umrah" },
  { to: "/packages/premium-umrah-12-nights", label: "Premium Umrah" },
  { to: "/packages/ramadan-umrah-last-ashra", label: "Ramadan Umrah" },
] as const;

const COMPANY_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/refund-and-cancellation-policy", label: "Refund & Cancellation" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">NoorSafar Umrah</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}. We plan every detail so your journey stays focused on worship.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={telLink} className="hover:text-primary">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {SITE.address}
            </li>
          </ul>
        </div>

        <FooterColumn title="Packages" links={PACKAGE_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Legal" links={LEGAL_LINKS} />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} NoorSafar Umrah. All rights reserved. NoorSafar Umrah is a
            travel arrangement service; Umrah visas are issued at the sole discretion of the
            authorities of the Kingdom of Saudi Arabia.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
