import { PACKAGES } from "/dev-server/src/data/packages";
import { SERVICES, FAQS, TESTIMONIALS } from "/dev-server/src/config/content";
const q = (s: any) => "'" + String(s).replace(/'/g, "''") + "'";
const arr = (a: string[]) => "ARRAY[" + a.map(q).join(",") + "]::text[]";
const out: string[] = [];
PACKAGES.forEach((p, i) => {
  out.push(`INSERT INTO public.packages (slug,title,category,nights,makkah_nights,madinah_nights,hotel_stars,price_from,departure_cities,months,image_url,image_alt,summary,highlights,inclusions,exclusions,itinerary,hotels,sort_order,published) VALUES (${q(p.slug)},${q(p.title)},${q(p.category)},${p.nights},${p.makkahNights},${p.madinahNights},${p.hotelStars},${p.priceFrom},${arr(p.departureCities)},${arr(p.months)},'','',${q(p.summary)},${arr(p.highlights)},${arr(p.inclusions)},${arr(p.exclusions)},${q(JSON.stringify(p.itinerary))}::jsonb,${q(JSON.stringify(p.hotels))}::jsonb,${i},true);`);
});
SERVICES.forEach((s, i) => out.push(`INSERT INTO public.services (title,description,icon,sort_order,published) VALUES (${q(s.title)},${q(s.description)},${q(s.icon)},${i},true);`));
FAQS.forEach((f, i) => out.push(`INSERT INTO public.faqs (question,answer,sort_order,published) VALUES (${q(f.question)},${q(f.answer)},${i},true);`));
TESTIMONIALS.forEach((t, i) => out.push(`INSERT INTO public.testimonials (name,city,quote,sort_order,published) VALUES (${q(t.name)},${q(t.city)},${q(t.quote)},${i},false);`));
console.log(out.join("\n"));
