/**
 * CENTRAL BUSINESS CONFIGURATION
 * ------------------------------
 * Everything here is safe to edit without touching components.
 * Once the admin dashboard is connected, these values act as defaults/fallbacks.
 */
export const SITE = {
  brandArabic: "رفقاء العمرة",
  brandEnglish: "RUFAQA AL UMRAH",
  brandShort: "Rufaqa Al Umrah",
  tagline: "Your Trusted Companions for a Blessed Journey",
  description:
    "Rufaqa Al Umrah arranges guided Umrah journeys from India — hotels near the Haramain, visa assistance, flights, ziyarat and companions who stay with you from departure to return.",
  phoneDisplay: "+91 86550 89608",
  phoneDial: "+918655089608",
  whatsapp: "918655089608",
  email: "salam@rufaqaalumrah.com",
  addressLine: "Mumbai, Maharashtra, India",
  hours: "Every day, 9:00 AM – 9:00 PM IST",
  /** Public URL of the packages page used in WhatsApp follow-ups (admin editable). */
  packagesUrl: "/packages",
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export const telLink = `tel:${SITE.phoneDial}`;

/** Builds a wa.me link with a prefilled, URL-encoded enquiry message. */
export function whatsappLink(message: string): string {
  const safe = message.slice(0, 1000);
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(safe)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Assalamu alaikum ${SITE.brandShort}, I would like to know more about your Umrah packages.`;

/** Consent wording shown next to the WhatsApp opt-in checkbox. Versioned for audit. */
export const CONSENT = {
  version: "v1-2026-09",
  wording:
    "I agree to receive WhatsApp messages from Rufaqa Al Umrah about my enquiry, package availability and occasional follow-ups. I can ask to stop at any time.",
} as const;
