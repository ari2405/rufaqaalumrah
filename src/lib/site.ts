/**
 * Central site configuration — edit these values to rebrand or change contacts.
 */
export const SITE = {
  name: "NoorSafar Umrah",
  tagline: "Guided Umrah journeys, arranged with care",
  description:
    "NoorSafar Umrah arranges premium Umrah packages from India with 4 & 5 star hotels near the Haram, visa assistance, flights, ziyarat and 24x7 on-ground support.",
  phoneDisplay: "+91 86550 89608",
  phoneDial: "+918655089608",
  whatsapp: "918655089608",
  email: "salam@noorsafarumrah.com",
  address: "Mumbai, Maharashtra, India",
  hours: "Mon – Sun, 9:00 AM – 9:00 PM IST",
} as const;

/** Builds a wa.me link with a prefilled enquiry message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${SITE.phoneDial}`;
