/**
 * Shared, client-safe content model.
 *
 * The website reads its content from Lovable Cloud (editable in the admin
 * dashboard). When a section has not been filled in yet, the editable
 * defaults in src/config and src/data are used instead, so the site always
 * renders something real and nothing is ever fabricated on the fly.
 */
import hotelImg from "@/assets/hotel.jpg";
import madinahImg from "@/assets/madinah.jpg";
import heroImg from "@/assets/hero-kaaba.jpg";

import { IMAGES, SERVICES, FAQS, TESTIMONIALS, type Service, type Faq, type Testimonial } from "@/config/content";
import { PACKAGES, type UmrahPackage } from "@/data/packages";
import { SITE } from "@/lib/site";

export type Business = {
  brandArabic: string;
  brandEnglish: string;
  tagline: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsapp: string;
  email: string;
  addressLine: string;
  hours: string;
  packagesUrl: string;
  whatsappDefaultMessage: string;
  instagram: string;
  facebook: string;
  youtube: string;
};

export type ImageSlot = { url: string; alt: string };
export type ImageConfig = Record<"hero" | "makkah" | "madinah" | "hotel", ImageSlot>;

export type Pkg = {
  id: string | null;
  slug: string;
  title: string;
  category: string;
  nights: number;
  makkahNights: number;
  madinahNights: number;
  hotelStars: number;
  priceFrom: number | null;
  priceNote: string;
  departureCities: string[];
  months: string[];
  imageUrl: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: string; title: string; detail: string }[];
  hotels: { city: string; name: string; distance: string; note: string }[];
};

export type SiteData = {
  settings: { key: string; value: unknown }[];
  packages: Record<string, unknown>[];
  services: Record<string, unknown>[];
  faqs: Record<string, unknown>[];
  testimonials: Record<string, unknown>[];
};

const FALLBACK_IMAGES = [madinahImg, hotelImg, heroImg];

const DEFAULT_PRICE_NOTE =
  "Indicative starting price per person; confirmed in writing before booking.";

const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback: number): number => (typeof v === "number" ? v : fallback);
const list = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

export const DEFAULT_BUSINESS: Business = {
  brandArabic: SITE.brandArabic,
  brandEnglish: SITE.brandEnglish,
  tagline: SITE.tagline,
  phoneDisplay: SITE.phoneDisplay,
  phoneDial: SITE.phoneDial,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  addressLine: SITE.addressLine,
  hours: SITE.hours,
  packagesUrl: SITE.packagesUrl,
  whatsappDefaultMessage: `Assalamu alaikum ${SITE.brandShort}, I would like to know more about your Umrah packages.`,
  instagram: "",
  facebook: "",
  youtube: "",
};

export const DEFAULT_IMAGES: ImageConfig = {
  hero: { url: "", alt: IMAGES.hero.alt },
  makkah: { url: "", alt: IMAGES.makkah.alt },
  madinah: { url: "", alt: IMAGES.madinah.alt },
  hotel: { url: "", alt: IMAGES.hotel.alt },
};

/** Bundled artwork used whenever no custom image URL has been set. */
export const BUNDLED_IMAGES: Record<keyof ImageConfig, string> = {
  hero: IMAGES.hero.src,
  makkah: IMAGES.makkah.src,
  madinah: IMAGES.madinah.src,
  hotel: IMAGES.hotel.src,
};

export function settingsValue(data: SiteData | undefined, key: string): Record<string, unknown> {
  const row = data?.settings.find((s) => s.key === key);
  return row && typeof row.value === "object" && row.value !== null
    ? (row.value as Record<string, unknown>)
    : {};
}

export function resolveBusiness(data: SiteData | undefined): Business {
  const v = settingsValue(data, "business");
  const out = { ...DEFAULT_BUSINESS };
  for (const key of Object.keys(DEFAULT_BUSINESS) as (keyof Business)[]) {
    const value = v[key];
    if (typeof value === "string" && value.trim() !== "") out[key] = value;
  }
  return out;
}

export function resolveImages(data: SiteData | undefined): ImageConfig {
  const v = settingsValue(data, "images");
  const out: ImageConfig = { ...DEFAULT_IMAGES };
  for (const key of Object.keys(DEFAULT_IMAGES) as (keyof ImageConfig)[]) {
    const slot = v[key];
    if (slot && typeof slot === "object") {
      const s = slot as Record<string, unknown>;
      out[key] = {
        url: str(s['url']),
        alt: str(s['alt'], DEFAULT_IMAGES[key].alt),
      };
    }
  }
  return out;
}

export function imageSrc(images: ImageConfig, key: keyof ImageConfig): string {
  return images[key].url.trim() !== "" ? images[key].url : BUNDLED_IMAGES[key];
}

function staticToPkg(p: UmrahPackage, index: number): Pkg {
  return {
    id: null,
    slug: p.slug,
    title: p.title,
    category: p.category,
    nights: p.nights,
    makkahNights: p.makkahNights,
    madinahNights: p.madinahNights,
    hotelStars: p.hotelStars,
    priceFrom: p.priceFrom,
    priceNote: DEFAULT_PRICE_NOTE,
    departureCities: [...p.departureCities],
    months: [...p.months],
    imageUrl: p.image,
    imageAlt: `${p.title} — illustrative image`,
    summary: p.summary,
    highlights: [...p.highlights],
    inclusions: [...p.inclusions],
    exclusions: [...p.exclusions],
    itinerary: p.itinerary.map((i) => ({ ...i })),
    hotels: p.hotels.map((h) => ({ ...h })),
    ...(index >= 0 ? {} : {}),
  };
}

function rowToPkg(row: Record<string, unknown>, index: number): Pkg {
  const itinerary = Array.isArray(row['itinerary']) ? (row['itinerary'] as Record<string, unknown>[]) : [];
  const hotels = Array.isArray(row['hotels']) ? (row['hotels'] as Record<string, unknown>[]) : [];
  const imageUrl = str(row['image_url']).trim();
  return {
    id: str(row['id']) || null,
    slug: str(row['slug']),
    title: str(row['title']),
    category: str(row['category'], "Standard"),
    nights: num(row['nights'], 0),
    makkahNights: num(row['makkah_nights'], 0),
    madinahNights: num(row['madinah_nights'], 0),
    hotelStars: num(row['hotel_stars'], 4),
    priceFrom: typeof row['price_from'] === "number" ? row['price_from'] : null,
    priceNote: str(row['price_note'], DEFAULT_PRICE_NOTE),
    departureCities: list(row['departure_cities']),
    months: list(row['months']),
    imageUrl: imageUrl || (FALLBACK_IMAGES[index % FALLBACK_IMAGES.length] as string),
    imageAlt: str(row['image_alt']) || `${str(row['title'])} — illustrative image`,
    summary: str(row['summary']),
    highlights: list(row['highlights']),
    inclusions: list(row['inclusions']),
    exclusions: list(row['exclusions']),
    itinerary: itinerary.map((i) => ({
      day: str(i['day']),
      title: str(i['title']),
      detail: str(i['detail']),
    })),
    hotels: hotels.map((h) => ({
      city: str(h['city']),
      name: str(h['name']),
      distance: str(h['distance']),
      note: str(h['note']),
    })),
  };
}

export function resolvePackages(data: SiteData | undefined): Pkg[] {
  const rows = data?.packages ?? [];
  if (rows.length > 0) return rows.map(rowToPkg);
  return PACKAGES.map(staticToPkg);
}

export function resolveServices(data: SiteData | undefined): Service[] {
  const rows = data?.services ?? [];
  if (rows.length === 0) return SERVICES;
  return rows.map((r) => ({
    title: str(r['title']),
    description: str(r['description']),
    icon: str(r['icon'], "star"),
  }));
}

export function resolveFaqs(data: SiteData | undefined): Faq[] {
  const rows = data?.faqs ?? [];
  if (rows.length === 0) return FAQS;
  return rows.map((r) => ({ question: str(r['question']), answer: str(r['answer']) }));
}

export function resolveTestimonials(data: SiteData | undefined): Testimonial[] {
  const rows = data?.testimonials ?? [];
  if (rows.length === 0) return TESTIMONIALS;
  return rows.map((r) => ({ name: str(r['name']), city: str(r['city']), quote: str(r['quote']) }));
}

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function whatsappHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message.slice(0, 1000))}`;
}

export const DURATION_BANDS = ["Up to 10 nights", "11–14 nights", "15 nights or more"] as const;

export function matchesDuration(nights: number, band: string): boolean {
  if (band === "Up to 10 nights") return nights <= 10;
  if (band === "11–14 nights") return nights >= 11 && nights <= 14;
  if (band === "15 nights or more") return nights >= 15;
  return true;
}
