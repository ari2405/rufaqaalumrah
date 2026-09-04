import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/umrah-guide")({
  head: () => ({
    meta: [
      { title: 'Umrah Guide — Preparing for Your Journey | Rufaqa Al Umrah' },
      { name: "description", content: "A practical guide to performing Umrah: ihram, tawaf, sa'i, halq or taqsir, what to pack, and etiquette in Makkah and Madinah." },
      { property: "og:title", content: 'Umrah Guide — Preparing for Your Journey | Rufaqa Al Umrah' },
      { property: "og:description", content: "A practical guide to performing Umrah: ihram, tawaf, sa'i, halq or taqsir, what to pack, and etiquette in Makkah and Madinah." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/umrah-guide" },
    ],
    links: [{ rel: "canonical", href: "/umrah-guide" }],
  }),
  component: UmrahGuidePage,
});

function UmrahGuidePage() {
  return (
    <Section>
      <SectionHeading eyebrow="Guidance" title="Umrah Guide" description="A practical summary for first-time pilgrims. For religious rulings, please consult a qualified scholar." as="h1" />
      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Before you travel</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Settle your intention and any outstanding obligations, learn the rites in advance, arrange your documents early, and prepare for the weather and the walking involved.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Ihram</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Enter ihram at or before the appointed miqat, in the prescribed clothing, and observe its restrictions from that moment until you leave the state of ihram.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Tawaf</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Seven circuits of the Kaaba beginning and ending at the Black Stone corner, followed by two rak'ah of prayer where possible near Maqam Ibrahim.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Sa'i</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Seven trips between Safa and Marwah, beginning at Safa. Take your time; wheelchairs and the upper level are available for those who need them.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Halq or taqsir</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Men shave or shorten the hair, women trim a small length. With this the Umrah is complete and the state of ihram ends.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">In Madinah</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Visiting Masjid an-Nabawi is a highly valued part of the journey. Observe the etiquette of the mosque, be gentle in crowds, and plan ziyarat around prayer times.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">What to pack</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Comfortable footwear you can carry, an unscented toiletry set, a light bag for the mosque, prescription medicines with documentation, and a copy of your travel papers.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">Health and crowds</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Hydrate constantly, keep group members informed of your movements, and agree a meeting point before entering the mosque.</p>
        </section>
      </div>
    </Section>
  );
}
