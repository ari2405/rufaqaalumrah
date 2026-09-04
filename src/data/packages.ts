/**
 * PLACEHOLDER PACKAGE DATA — edit freely.
 * Prices are indicative starting prices per person on quad sharing.
 * Swap `image` with any file in src/assets and update the import map below.
 */
import hotelImg from "@/assets/hotel.jpg";
import madinahImg from "@/assets/madinah.jpg";
import heroImg from "@/assets/hero-kaaba.jpg";

export type PackageCategory = "Economy" | "Standard" | "Premium" | "Ramadan" | "Family" | "Group";

export type UmrahPackage = {
  slug: string;
  title: string;
  category: PackageCategory;
  nights: number;
  makkahNights: number;
  madinahNights: number;
  hotelStars: 3 | 4 | 5;
  priceFrom: number; // INR per person
  departureCities: string[];
  months: string[];
  image: string;
  summary: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: string; title: string; detail: string }[];
  hotels: { city: string; name: string; distance: string; note: string }[];
};

export const PACKAGES: UmrahPackage[] = [
  {
    slug: "economy-umrah-10-nights",
    title: "Economy Umrah — 10 Nights",
    category: "Economy",
    nights: 10,
    makkahNights: 6,
    madinahNights: 4,
    hotelStars: 3,
    priceFrom: 82000,
    departureCities: ["Mumbai", "Delhi", "Hyderabad"],
    months: ["Sep", "Oct", "Nov"],
    image: madinahImg,
    summary:
      "A carefully budgeted first Umrah with clean 3-star stays, shared transfers and a scholar-led group so nothing feels unfamiliar.",
    highlights: [
      "Direct or one-stop economy flights",
      "Walking-distance hotels in both cities",
      "Group leader with every batch",
      "Shared AC transfers Jeddah–Makkah–Madinah",
    ],
    inclusions: [
      "Return economy airfare",
      "Umrah visa processing",
      "Hotel stay on quad sharing",
      "Daily breakfast and dinner",
      "Intercity and airport transfers",
      "Ziyarat in Makkah and Madinah",
    ],
    exclusions: [
      "Passport and personal documentation fees",
      "Travel insurance for age 70+",
      "Laundry, calls and personal expenses",
      "Meals not mentioned in inclusions",
    ],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Assemble at the airport, ihram guidance and departure to Jeddah." },
      { day: "Day 2 – 7", title: "Makkah", detail: "Umrah performed with the group leader, followed by free worship days and local ziyarat." },
      { day: "Day 8 – 10", title: "Madinah", detail: "Transfer to Madinah, Riyadul Jannah guidance and ziyarat of historic sites." },
      { day: "Day 11", title: "Return", detail: "Transfer to the airport for the return flight home." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder Hotel Makkah", distance: "900 m from Haram", note: "Free shuttle every 20 minutes" },
      { city: "Madinah", name: "Placeholder Hotel Madinah", distance: "400 m from Masjid an-Nabawi", note: "Walking distance via Gate 21" },
    ],
  },
  {
    slug: "standard-umrah-14-nights",
    title: "Standard Umrah — 14 Nights",
    category: "Standard",
    nights: 14,
    makkahNights: 8,
    madinahNights: 6,
    hotelStars: 4,
    priceFrom: 118000,
    departureCities: ["Mumbai", "Delhi", "Bengaluru", "Lucknow"],
    months: ["Oct", "Nov", "Dec", "Jan"],
    image: hotelImg,
    summary:
      "Our most chosen itinerary — 4-star hotels within a short walk of both Harams, triple sharing and a relaxed worship-first schedule.",
    highlights: [
      "4-star hotels close to both Harams",
      "Triple sharing as standard",
      "Private AC coach transfers",
      "Dedicated India helpline throughout",
    ],
    inclusions: [
      "Return airfare with 30 kg baggage",
      "Umrah visa and processing",
      "Hotel stay on triple sharing",
      "Breakfast and dinner daily",
      "All transfers in private coaches",
      "Ziyarat tours with a guide",
      "Zamzam guidance and ihram kit",
    ],
    exclusions: [
      "Lunch and personal shopping",
      "Any service not listed under inclusions",
      "Fees for schedule changes made after ticketing",
    ],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Airport assembly, briefing and flight to Jeddah or Madinah." },
      { day: "Day 2 – 9", title: "Makkah", detail: "Umrah rites, guided ziyarat and open days for personal ibadah." },
      { day: "Day 10 – 15", title: "Madinah", detail: "Stay near Masjid an-Nabawi with guided ziyarat to Uhud, Quba and Qiblatain." },
      { day: "Day 15", title: "Return", detail: "Transfer to the airport and return flight." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder 4★ Makkah", distance: "500 m from Haram", note: "Haram view rooms on request" },
      { city: "Madinah", name: "Placeholder 4★ Madinah", distance: "250 m from Masjid an-Nabawi", note: "Central Haram area" },
    ],
  },
  {
    slug: "premium-umrah-12-nights",
    title: "Premium Umrah — 12 Nights",
    category: "Premium",
    nights: 12,
    makkahNights: 7,
    madinahNights: 5,
    hotelStars: 5,
    priceFrom: 189000,
    departureCities: ["Mumbai", "Delhi"],
    months: ["Nov", "Dec", "Feb", "Mar"],
    image: heroImg,
    summary:
      "Five-star stays inside the Haram precinct, double sharing, private cars and a dedicated coordinator with your family at all times.",
    highlights: [
      "5-star Haram-facing hotels",
      "Double sharing rooms",
      "Private sedan or SUV transfers",
      "Personal coordinator on ground",
    ],
    inclusions: [
      "Return airfare on full-service airlines",
      "Umrah visa and processing",
      "5-star stay on double sharing",
      "Buffet breakfast and dinner",
      "Private transfers throughout",
      "Guided ziyarat in both cities",
      "Priority check-in assistance",
    ],
    exclusions: [
      "Personal expenses and gifts",
      "Optional Taif or Jeddah day tour",
      "Anything not explicitly listed",
    ],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Meet and greet at the airport, premium check-in assistance." },
      { day: "Day 2 – 8", title: "Makkah", detail: "Umrah with a personal guide, unhurried worship days, optional Taif excursion." },
      { day: "Day 9 – 13", title: "Madinah", detail: "Haram-facing stay, Riyadul Jannah permit help and full ziyarat circuit." },
      { day: "Day 13", title: "Return", detail: "Private transfer to the airport and return flight." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder 5★ Makkah", distance: "Haram precinct", note: "Kaaba view category available" },
      { city: "Madinah", name: "Placeholder 5★ Madinah", distance: "Facing the Haram plaza", note: "Central area, direct access" },
    ],
  },
  {
    slug: "ramadan-umrah-last-ashra",
    title: "Ramadan Umrah — Last Ashra",
    category: "Ramadan",
    nights: 12,
    makkahNights: 9,
    madinahNights: 3,
    hotelStars: 4,
    priceFrom: 235000,
    departureCities: ["Mumbai", "Delhi", "Hyderabad"],
    months: ["Ramadan"],
    image: heroImg,
    summary:
      "The last ten nights of Ramadan in Makkah with iftar and suhoor arranged, and hotels chosen for the shortest possible walk in peak crowds.",
    highlights: [
      "Laylatul Qadr nights in Makkah",
      "Iftar and suhoor included daily",
      "Hotels selected for peak-season access",
      "Limited seats, early booking advised",
    ],
    inclusions: [
      "Return airfare",
      "Umrah visa and processing",
      "Hotel on quad sharing",
      "Daily iftar and suhoor",
      "All ground transfers",
      "Ziyarat where crowd conditions permit",
    ],
    exclusions: ["Personal expenses", "Additional nights beyond the itinerary"],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Departure to Jeddah with the Ramadan batch." },
      { day: "Day 2 – 10", title: "Makkah", detail: "Last ashra in Makkah with iftar, taraweeh and qiyam schedules shared daily." },
      { day: "Day 11 – 13", title: "Madinah", detail: "Eid and ziyarat days in Madinah." },
      { day: "Day 13", title: "Return", detail: "Return flight to India." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder Ramadan Hotel", distance: "700 m from Haram", note: "Peak-season allocation" },
      { city: "Madinah", name: "Placeholder Madinah Hotel", distance: "350 m from Masjid an-Nabawi", note: "Eid week stay" },
    ],
  },
  {
    slug: "family-umrah-15-nights",
    title: "Family Umrah — 15 Nights",
    category: "Family",
    nights: 15,
    makkahNights: 9,
    madinahNights: 6,
    hotelStars: 4,
    priceFrom: 132000,
    departureCities: ["Mumbai", "Delhi", "Ahmedabad"],
    months: ["Oct", "Dec", "Apr", "May"],
    image: hotelImg,
    summary:
      "Connecting family rooms, a slower pace for elders and children, wheelchair support on request and meals that suit Indian palates.",
    highlights: [
      "Family and connecting rooms",
      "Wheelchair and elder assistance",
      "Indian meal arrangements",
      "Child-friendly ziyarat pacing",
    ],
    inclusions: [
      "Return airfare for all members",
      "Umrah visa for the full family",
      "Family rooms with breakfast and dinner",
      "All transfers in private vehicles",
      "Ziyarat with rest breaks",
    ],
    exclusions: ["Infant seats where airline charges apply", "Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Family assembly, ihram help for men and briefing for all." },
      { day: "Day 2 – 10", title: "Makkah", detail: "Umrah at a comfortable pace with rest days planned in." },
      { day: "Day 11 – 16", title: "Madinah", detail: "Extended Madinah stay with easy ziyarat and free evenings." },
      { day: "Day 16", title: "Return", detail: "Airport transfer and return home." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder Family Hotel Makkah", distance: "650 m from Haram", note: "Connecting rooms available" },
      { city: "Madinah", name: "Placeholder Family Hotel Madinah", distance: "300 m from Masjid an-Nabawi", note: "Lift access, family floors" },
    ],
  },
  {
    slug: "group-umrah-9-nights",
    title: "Group Umrah — 9 Nights",
    category: "Group",
    nights: 9,
    makkahNights: 5,
    madinahNights: 4,
    hotelStars: 3,
    priceFrom: 76000,
    departureCities: ["Mumbai", "Hyderabad", "Kolkata"],
    months: ["Sep", "Oct", "Jan", "Jun"],
    image: madinahImg,
    summary:
      "Designed for masjid jamaats, colleagues and community groups of 15 or more, with group pricing and a scholar accompanying the batch.",
    highlights: [
      "Special pricing from 15 travellers",
      "Accompanying scholar for the group",
      "Coordinated documentation support",
      "Custom departure dates possible",
    ],
    inclusions: [
      "Return group airfare",
      "Umrah visas for the full group",
      "Hotel on quad or sextuple sharing",
      "Breakfast and dinner",
      "Coach transfers throughout",
      "Group ziyarat programme",
    ],
    exclusions: ["Individual room upgrades", "Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Departure", detail: "Group check-in and departure together." },
      { day: "Day 2 – 6", title: "Makkah", detail: "Umrah performed as one batch with talks after fajr." },
      { day: "Day 7 – 10", title: "Madinah", detail: "Madinah stay with group ziyarat and reflection sessions." },
      { day: "Day 10", title: "Return", detail: "Return flight with the group." },
    ],
    hotels: [
      { city: "Makkah", name: "Placeholder Group Hotel Makkah", distance: "1.1 km from Haram", note: "Dedicated shuttle for the batch" },
      { city: "Madinah", name: "Placeholder Group Hotel Madinah", distance: "500 m from Masjid an-Nabawi", note: "Group dining hall" },
    ],
  },
];

export const CATEGORIES: PackageCategory[] = [
  "Economy",
  "Standard",
  "Premium",
  "Ramadan",
  "Family",
  "Group",
];

export const DEPARTURE_CITIES = [
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Bengaluru",
  "Ahmedabad",
  "Lucknow",
  "Kolkata",
];

export function getPackage(slug: string): UmrahPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
