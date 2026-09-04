# RUFAQA AL UMRAH — Roadmap

Brand: رفقاء العمرة / RUFAQA AL UMRAH — "Your Trusted Companions for a Blessed Journey"
Palette: cream / matcha / deep green / gold. Phone + WhatsApp: +91 86550 89608.
The earlier NoorSafar brief is superseded.

## Phase 1 — Public site
- [x] Image assets
- [ ] Design tokens (cream/matcha/deep green/gold) + fonts
- [ ] Centralized editable config: business, images, packages, FAQs, testimonials, services
- [ ] Header / Footer / sticky mobile Call–WhatsApp–Enquire bar
- [ ] Home: hero, quick enquiry bar, why us, Makkah & Madinah split, packages, services, process, testimonials, FAQ, CTA
- [ ] Packages listing with filters (departure city, duration, type) via URL search params, fed by the quick enquiry bar
- [ ] Package detail pages
- [ ] About Us, Umrah Guide, Services, Contact, FAQ
- [ ] Legal: privacy, terms, refund & cancellation, disclaimer
- [ ] Forms: validation + loading/success/error, WhatsApp prefilled enquiry, consent checkbox
- [ ] SEO: per-route metadata + OG, JSON-LD (Organization/LocalBusiness, Offers without invented prices, FAQPage), robots.txt, sitemap (deferred until a public URL exists)
- [ ] Lazy responsive images, accessibility pass

## Phase 2 — Lovable Cloud backend
- [ ] Auth + `user_roles` admin role with RLS
- [ ] Content tables: site_settings, packages, faqs, testimonials, services
- [ ] Leads table (CRM: status, full submission details, WhatsApp delivery status)
- [ ] Admin dashboard: edit business details/links/images/FAQs/services/testimonials/packages
- [ ] Admin leads dashboard with status workflow

## Phase 3 — Notifications
- [ ] Automated WhatsApp follow-up per new lead (personalised summary + packages URL)
- [ ] Three editable provider-ready templates in admin: enquiry confirmation, package availability follow-up, gentle reminder
  - Placeholders: lead name, departure city, duration, package type, package URL
  - Labelled "requires provider approval"; never shown as approved without it
- [ ] Unchecked WhatsApp follow-up opt-in checkbox on every lead form; persist consent bool, timestamp, wording version, source form
- [ ] Server-side enforcement: only opted-in leads queue/send; consent + delivery/template status visible in admin
  - Compliant WhatsApp Business Cloud API / Twilio only; no consumer WhatsApp automation
  - Reusable configurable message template + admin-configurable packages URL
  - Consent checkbox on all lead forms
  - Log delivery status (pending/sent/delivered/failed) against each lead
  - Requires user-supplied provider credentials + approved template
- [ ] Email lead notifications (needs verified custom domain — explain step to user)

## Content rules
- No fabricated licences, awards, review counts, confirmed prices, or partner claims.
- All placeholder data must stay clearly editable.
