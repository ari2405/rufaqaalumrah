/**
 * CENTRAL CONTENT CONFIGURATION — services, FAQs, testimonials, imagery.
 * Placeholder copy is marked where it must be replaced with the operator's
 * own verified information. Nothing here claims licences, awards or ratings.
 */
import hero from "@/assets/hero-kaaba.jpg";
import madinah from "@/assets/madinah.jpg";
import hotel from "@/assets/hotel.jpg";

/** Swap any src with your own file in src/assets, keep alt text descriptive. */
export const IMAGES = {
  hero: { src: hero, alt: "Pilgrims in ihram circling the Kaaba at blue hour", width: 1920, height: 1088 },
  makkah: { src: hero, alt: "The Kaaba lit by lanterns inside Masjid al-Haram", width: 1920, height: 1088 },
  madinah: { src: madinah, alt: "The green dome of Masjid an-Nabawi in Madinah at sunrise", width: 1280, height: 854 },
  hotel: { src: hotel, alt: "Hotel room near the Haram with a view of the mosque plaza", width: 1280, height: 854 },
} as const;

export type Service = { title: string; description: string; icon: string };

export const SERVICES: Service[] = [
  {
    title: "Umrah Visa Assistance",
    description:
      "We prepare and submit your Umrah visa application, check every document in advance and keep you updated at each stage.",
    icon: "stamp",
  },
  {
    title: "Flights & Ticketing",
    description:
      "Return airfare options from your preferred departure city, with baggage guidance and group check-in support.",
    icon: "plane",
  },
  {
    title: "Hotels Near the Haramain",
    description:
      "Stays selected for walking distance, cleanliness and lift access — with the exact distance stated before you book.",
    icon: "building",
  },
  {
    title: "Transport & Transfers",
    description:
      "Airport pickups and Makkah–Madinah transfers in air-conditioned vehicles, coordinated around your flight times.",
    icon: "bus",
  },
  {
    title: "Ziyarat Tours",
    description:
      "Guided visits to the historic sites of Makkah and Madinah, paced so elders and children stay comfortable.",
    icon: "map",
  },
  {
    title: "Guidance & Companionship",
    description:
      "Rites explained before departure and a companion available on the ground — the meaning behind Rufaqa, companions.",
    icon: "users",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "How do I start planning my Umrah with Rufaqa Al Umrah?",
    answer:
      "Send us an enquiry with your departure city, preferred travel month, number of pilgrims and the kind of package you have in mind. We reply on WhatsApp or by phone with the options that genuinely fit, along with the current costs.",
  },
  {
    question: "Are the prices shown on this website final?",
    answer:
      "No. The figures shown are indicative starting points that change with airfare, hotel availability and the season. Your final quotation is confirmed in writing before any payment is made.",
  },
  {
    question: "What documents are needed for an Umrah visa?",
    answer:
      "Typically a passport with sufficient validity, recent photographs as per specification, and vaccination records where required. Requirements are set by the authorities of the Kingdom of Saudi Arabia and can change, so we confirm the current list with you at the time of booking.",
  },
  {
    question: "How long does the Umrah journey usually take?",
    answer:
      "Most itineraries run between 9 and 15 nights, split between Makkah and Madinah. Shorter and longer durations can be arranged for groups and families.",
  },
  {
    question: "Can you arrange packages for families and elders?",
    answer:
      "Yes. We plan family and connecting rooms, slower ziyarat schedules, and wheelchair or elder assistance on request. Please mention these needs in your enquiry so we can build them into the plan.",
  },
  {
    question: "Do you handle group bookings for a masjid or community?",
    answer:
      "Yes. Group departures can be arranged with custom dates and group pricing. Share your approximate group size and preferred dates and we will prepare a proposal.",
  },
  {
    question: "How are payments made?",
    answer:
      "Payments are made against a written quotation and invoice. We will explain the schedule, what each instalment covers and the cancellation terms before you commit.",
  },
  {
    question: "What if my visa is not granted?",
    answer:
      "Umrah visas are issued solely at the discretion of the Saudi authorities. If a visa is refused, we explain what has been spent, what is refundable and what is not, in line with our refund and cancellation policy.",
  },
];

/**
 * PLACEHOLDER TESTIMONIALS — replace with real, permission-given feedback.
 * We do not publish invented ratings or review counts anywhere on the site.
 */
export type Testimonial = { name: string; city: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Placeholder — pilgrim name",
    city: "Placeholder — city",
    quote:
      "Placeholder testimonial. Replace this with a genuine message from a traveller who has given permission for it to be published.",
  },
  {
    name: "Placeholder — pilgrim name",
    city: "Placeholder — city",
    quote:
      "Placeholder testimonial. Keep the wording exactly as the traveller wrote it; do not embellish or invent feedback.",
  },
  {
    name: "Placeholder — pilgrim name",
    city: "Placeholder — city",
    quote:
      "Placeholder testimonial. Remove this section entirely until real feedback is available to publish.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Share your intention",
    detail: "Tell us your departure city, travel month, number of pilgrims and budget range.",
  },
  {
    title: "Receive a written plan",
    detail: "We send matching options with hotel names, distances, inclusions and the current cost.",
  },
  {
    title: "Documents and visa",
    detail: "We collect your documents, check them and process the Umrah visa application.",
  },
  {
    title: "Travel with companions",
    detail: "Transfers, guidance and on-ground support until you are safely home.",
  },
];

export const WHY_US = [
  {
    title: "One point of contact",
    detail: "The same person answers your enquiry, sends your quotation and stays reachable while you travel.",
  },
  {
    title: "Stated distances, not vague claims",
    detail: "Every hotel is quoted with its name and its actual walking distance from the Haram.",
  },
  {
    title: "Written quotations",
    detail: "Costs, inclusions and exclusions are confirmed in writing before any payment.",
  },
  {
    title: "Guidance on the rites",
    detail: "A clear pre-departure briefing on ihram, tawaf, sa'i and the etiquette of both cities.",
  },
];
